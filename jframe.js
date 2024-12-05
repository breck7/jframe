(function (global) {
  const frame = {
    _emitter: createEventEmitter(),
    _endpoint: createEndpoint(),
    _store: createRequestStore(),

    // Public API
    init() {
      if (typeof document !== "undefined") {
        this._setupEventListeners();
      }
      return this;
    },

    // Frame context and actions
    context: null, // Will be populated by host

    actions: {
      setPrimaryButton(options) {
        return frame._sendHostMessage("setPrimaryButton", options);
      },

      ready() {
        return frame._sendHostMessage("ready");
      },

      close() {
        return frame._sendHostMessage("close");
      },

      openUrl(url) {
        return frame._sendHostMessage("openUrl", url);
      },

      addFrame(options) {
        return frame._sendHostMessage("addFrame", options);
      },
    },

    // Event handling
    on(event, callback) {
      this._emitter.on(event, callback);
    },

    off(event, callback) {
      this._emitter.off(event, callback);
    },

    once(event, callback) {
      this._emitter.once(event, callback);
    },

    // Ethereum provider
    wallet: {
      ethProvider: {
        async request(args) {
          try {
            const request = frame._store.prepare(args);
            const response = await frame._sendHostMessage(
              "ethProviderRequestV2",
              request,
            );

            if (response.error) {
              throw frame._createProviderError(response.error);
            }

            return response.result;
          } catch (err) {
            if (
              err instanceof Error &&
              err.message.match(/cannot read property 'apply'/i)
            ) {
              return frame._sendHostMessage("ethProviderRequest", args);
            }
            throw err;
          }
        },
      },
    },

    // Internal methods
    _setupEventListeners() {
      document.addEventListener("FarcasterFrameEvent", (event) => {
        if (
          event instanceof MessageEvent &&
          event.data.type === "primaryButtonClicked"
        ) {
          this._emitter.emit("primaryButtonClicked");
        }
      });

      document.addEventListener("FarcasterFrameEthProviderEvent", (event) => {
        if (event instanceof MessageEvent) {
          const { event: evName, params } = event.data;
          this._emitter.emit(evName, ...params);
        }
      });
    },

    _sendHostMessage(method, ...args) {
      return new Promise((resolve, reject) => {
        try {
          const messageId = this._store.getId();
          const message = { id: messageId, method, args };

          const handler = (event) => {
            if (event.data?.id === messageId) {
              document.removeEventListener("FarcasterFrameCallback", handler);
              if (event.data.error) {
                reject(event.data.error);
              } else {
                resolve(event.data.result);
              }
            }
          };

          document.addEventListener("FarcasterFrameCallback", handler);

          if (window?.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify(message));
          } else if (window.parent !== window) {
            window.parent.postMessage(message, "*");
          } else {
            reject(new Error("No valid frame host found"));
          }
        } catch (err) {
          reject(err);
        }
      });
    },

    _createProviderError({ code, details }) {
      const errors = {
        4001: () => new Error("User rejected request"),
        4100: () => new Error("Unauthorized"),
        4200: () => new Error("Unsupported method"),
        4900: () => new Error("Provider disconnected"),
        4901: () => new Error("Chain disconnected"),
        default: () => new Error(details || "Unknown provider error"),
      };
      return (errors[code] || errors.default)();
    },
  };

  // Utility functions
  function createEventEmitter() {
    const listeners = new Map();

    return {
      on(event, callback) {
        if (!listeners.has(event)) {
          listeners.set(event, new Set());
        }
        listeners.get(event).add(callback);
      },

      off(event, callback) {
        if (listeners.has(event)) {
          listeners.get(event).delete(callback);
        }
      },

      once(event, callback) {
        const wrapper = (...args) => {
          callback(...args);
          this.off(event, wrapper);
        };
        this.on(event, wrapper);
      },

      emit(event, ...args) {
        if (listeners.has(event)) {
          listeners.get(event).forEach((callback) => {
            try {
              callback(...args);
            } catch (err) {
              console.error("Error in event listener:", err);
            }
          });
        }
      },
    };
  }

  function createEndpoint() {
    if (typeof window === "undefined") {
      return {
        postMessage() {},
        addEventListener() {},
        removeEventListener() {},
      };
    }

    if (window?.ReactNativeWebView) {
      return {
        postMessage: (data) => {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        },
        addEventListener: (_, listener, ...args) => {
          document.addEventListener(
            "FarcasterFrameCallback",
            listener,
            ...args,
          );
        },
        removeEventListener: (_, listener) => {
          document.removeEventListener("FarcasterFrameCallback", listener);
        },
      };
    }

    return {
      postMessage: (data) => window.parent.postMessage(data, "*"),
      addEventListener: (_, listener) =>
        window.addEventListener("message", listener),
      removeEventListener: (_, listener) =>
        window.removeEventListener("message", listener),
    };
  }

  function createRequestStore() {
    let nextId = 1;

    return {
      prepare(request) {
        return {
          jsonrpc: "2.0",
          id: nextId++,
          ...request,
        };
      },
      getId() {
        return nextId++;
      },
    };
  }

  // Export to global scope
  global.frame = frame.init();
})(typeof window !== "undefined" ? window : global);
