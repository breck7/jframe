"use strict";
var jframe = (() => {
  var rr = Object.create;
  var $e = Object.defineProperty;
  var nr = Object.getOwnPropertyDescriptor;
  var sr = Object.getOwnPropertyNames;
  var ar = Object.getPrototypeOf,
    ir = Object.prototype.hasOwnProperty;
  var or = (t, e) => () => (
      e || t((e = { exports: {} }).exports, e), e.exports
    ),
    at = (t, e) => {
      for (var r in e) $e(t, r, { get: e[r], enumerable: !0 });
    },
    yt = (t, e, r, n) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let s of sr(e))
          !ir.call(t, s) &&
            s !== r &&
            $e(t, s, {
              get: () => e[s],
              enumerable: !(n = nr(e, s)) || n.enumerable,
            });
      return t;
    };
  var cr = (t, e, r) => (
      (r = t != null ? rr(ar(t)) : {}),
      yt(
        e || !t || !t.__esModule
          ? $e(r, "default", { value: t, enumerable: !0 })
          : r,
        t,
      )
    ),
    ur = (t) => yt($e({}, "__esModule", { value: !0 }), t);
  var bt = or((Bn, it) => {
    "use strict";
    var dr = Object.prototype.hasOwnProperty,
      O = "~";
    function ye() {}
    Object.create &&
      ((ye.prototype = Object.create(null)), new ye().__proto__ || (O = !1));
    function lr(t, e, r) {
      (this.fn = t), (this.context = e), (this.once = r || !1);
    }
    function gt(t, e, r, n, s) {
      if (typeof r != "function")
        throw new TypeError("The listener must be a function");
      var a = new lr(r, n || t, s),
        i = O ? O + e : e;
      return (
        t._events[i]
          ? t._events[i].fn
            ? (t._events[i] = [t._events[i], a])
            : t._events[i].push(a)
          : ((t._events[i] = a), t._eventsCount++),
        t
      );
    }
    function Ve(t, e) {
      --t._eventsCount === 0 ? (t._events = new ye()) : delete t._events[e];
    }
    function k() {
      (this._events = new ye()), (this._eventsCount = 0);
    }
    k.prototype.eventNames = function () {
      var e = [],
        r,
        n;
      if (this._eventsCount === 0) return e;
      for (n in (r = this._events)) dr.call(r, n) && e.push(O ? n.slice(1) : n);
      return Object.getOwnPropertySymbols
        ? e.concat(Object.getOwnPropertySymbols(r))
        : e;
    };
    k.prototype.listeners = function (e) {
      var r = O ? O + e : e,
        n = this._events[r];
      if (!n) return [];
      if (n.fn) return [n.fn];
      for (var s = 0, a = n.length, i = new Array(a); s < a; s++)
        i[s] = n[s].fn;
      return i;
    };
    k.prototype.listenerCount = function (e) {
      var r = O ? O + e : e,
        n = this._events[r];
      return n ? (n.fn ? 1 : n.length) : 0;
    };
    k.prototype.emit = function (e, r, n, s, a, i) {
      var o = O ? O + e : e;
      if (!this._events[o]) return !1;
      var c = this._events[o],
        u = arguments.length,
        f,
        y;
      if (c.fn) {
        switch ((c.once && this.removeListener(e, c.fn, void 0, !0), u)) {
          case 1:
            return c.fn.call(c.context), !0;
          case 2:
            return c.fn.call(c.context, r), !0;
          case 3:
            return c.fn.call(c.context, r, n), !0;
          case 4:
            return c.fn.call(c.context, r, n, s), !0;
          case 5:
            return c.fn.call(c.context, r, n, s, a), !0;
          case 6:
            return c.fn.call(c.context, r, n, s, a, i), !0;
        }
        for (y = 1, f = new Array(u - 1); y < u; y++) f[y - 1] = arguments[y];
        c.fn.apply(c.context, f);
      } else {
        var w = c.length,
          E;
        for (y = 0; y < w; y++)
          switch (
            (c[y].once && this.removeListener(e, c[y].fn, void 0, !0), u)
          ) {
            case 1:
              c[y].fn.call(c[y].context);
              break;
            case 2:
              c[y].fn.call(c[y].context, r);
              break;
            case 3:
              c[y].fn.call(c[y].context, r, n);
              break;
            case 4:
              c[y].fn.call(c[y].context, r, n, s);
              break;
            default:
              if (!f)
                for (E = 1, f = new Array(u - 1); E < u; E++)
                  f[E - 1] = arguments[E];
              c[y].fn.apply(c[y].context, f);
          }
      }
      return !0;
    };
    k.prototype.on = function (e, r, n) {
      return gt(this, e, r, n, !1);
    };
    k.prototype.once = function (e, r, n) {
      return gt(this, e, r, n, !0);
    };
    k.prototype.removeListener = function (e, r, n, s) {
      var a = O ? O + e : e;
      if (!this._events[a]) return this;
      if (!r) return Ve(this, a), this;
      var i = this._events[a];
      if (i.fn)
        i.fn === r && (!s || i.once) && (!n || i.context === n) && Ve(this, a);
      else {
        for (var o = 0, c = [], u = i.length; o < u; o++)
          (i[o].fn !== r || (s && !i[o].once) || (n && i[o].context !== n)) &&
            c.push(i[o]);
        c.length ? (this._events[a] = c.length === 1 ? c[0] : c) : Ve(this, a);
      }
      return this;
    };
    k.prototype.removeAllListeners = function (e) {
      var r;
      return (
        e
          ? ((r = O ? O + e : e), this._events[r] && Ve(this, r))
          : ((this._events = new ye()), (this._eventsCount = 0)),
        this
      );
    };
    k.prototype.off = k.prototype.removeListener;
    k.prototype.addListener = k.prototype.on;
    k.prefixed = O;
    k.EventEmitter = k;
    typeof it < "u" && (it.exports = k);
  });
  var Dn = {};
  at(Dn, {
    createEmitter: () => $t,
    default: () => Vn,
    eventFrameAddedPayloadSchema: () => Xt,
    eventFrameRemovedPayloadSchema: () => Qt,
    eventHeaderSchema: () => Zn,
    eventNotificationsEnabledPayloadSchema: () => er,
    eventPayloadSchema: () => In,
    eventSchema: () => Mn,
    notificationDetailsSchema: () => vt,
    notificationsDisabledPayloadSchema: () => tr,
    sdk: () => dt,
    sendNotificationRequestSchema: () => Ln,
    sendNotificationResponseSchema: () => $n,
  });
  var ge = cr(bt(), 1);
  var xt = Symbol("Comlink.proxy"),
    fr = Symbol("Comlink.endpoint"),
    pr = Symbol("Comlink.releaseProxy"),
    ot = Symbol("Comlink.finalizer"),
    ze = Symbol("Comlink.thrown"),
    wt = (t) => (typeof t == "object" && t !== null) || typeof t == "function",
    hr = {
      canHandle: (t) => wt(t) && t[xt],
      serialize(t) {
        let { port1: e, port2: r } = new MessageChannel();
        return Tt(t, e), [r, [r]];
      },
      deserialize(t) {
        return t.start(), ut(t);
      },
    },
    mr = {
      canHandle: (t) => wt(t) && ze in t,
      serialize({ value: t }) {
        let e;
        return (
          t instanceof Error
            ? (e = {
                isError: !0,
                value: { message: t.message, name: t.name, stack: t.stack },
              })
            : (e = { isError: !1, value: t }),
          [e, []]
        );
      },
      deserialize(t) {
        throw t.isError
          ? Object.assign(new Error(t.value.message), t.value)
          : t.value;
      },
    },
    kt = new Map([
      ["proxy", hr],
      ["throw", mr],
    ]);
  function vr(t, e) {
    for (let r of t)
      if (e === r || r === "*" || (r instanceof RegExp && r.test(e))) return !0;
    return !1;
  }
  function Tt(t, e = globalThis, r = ["*"]) {
    e.addEventListener("message", function n(s) {
      if (!s || !s.data) return;
      if (!vr(r, s.origin)) {
        console.warn(`Invalid origin '${s.origin}' for comlink proxy`);
        return;
      }
      let { id: a, type: i, path: o } = Object.assign({ path: [] }, s.data),
        c = (s.data.argumentList || []).map(H),
        u;
      try {
        let f = o.slice(0, -1).reduce((w, E) => w[E], t),
          y = o.reduce((w, E) => w[E], t);
        switch (i) {
          case "GET":
            u = y;
            break;
          case "SET":
            (f[o.slice(-1)[0]] = H(s.data.value)), (u = !0);
            break;
          case "APPLY":
            u = y.apply(f, c);
            break;
          case "CONSTRUCT":
            {
              let w = new y(...c);
              u = wr(w);
            }
            break;
          case "ENDPOINT":
            {
              let { port1: w, port2: E } = new MessageChannel();
              Tt(t, E), (u = xr(w, [w]));
            }
            break;
          case "RELEASE":
            u = void 0;
            break;
          default:
            return;
        }
      } catch (f) {
        u = { value: f, [ze]: 0 };
      }
      Promise.resolve(u)
        .catch((f) => ({ value: f, [ze]: 0 }))
        .then((f) => {
          let [y, w] = qe(f);
          e.postMessage(Object.assign(Object.assign({}, y), { id: a }), w),
            i === "RELEASE" &&
              (e.removeEventListener("message", n),
              Et(e),
              ot in t && typeof t[ot] == "function" && t[ot]());
        })
        .catch((f) => {
          let [y, w] = qe({
            value: new TypeError("Unserializable return value"),
            [ze]: 0,
          });
          e.postMessage(Object.assign(Object.assign({}, y), { id: a }), w);
        });
    }),
      e.start && e.start();
  }
  function yr(t) {
    return t.constructor.name === "MessagePort";
  }
  function Et(t) {
    yr(t) && t.close();
  }
  function ut(t, e) {
    let r = new Map();
    return (
      t.addEventListener("message", function (s) {
        let { data: a } = s;
        if (!a || !a.id) return;
        let i = r.get(a.id);
        if (i)
          try {
            i(a);
          } finally {
            r.delete(a.id);
          }
      }),
      ct(t, r, [], e)
    );
  }
  function De(t) {
    if (t) throw new Error("Proxy has been released and is not useable");
  }
  function Ot(t) {
    return ce(t, new Map(), { type: "RELEASE" }).then(() => {
      Et(t);
    });
  }
  var Be = new WeakMap(),
    Ue =
      "FinalizationRegistry" in globalThis &&
      new FinalizationRegistry((t) => {
        let e = (Be.get(t) || 0) - 1;
        Be.set(t, e), e === 0 && Ot(t);
      });
  function gr(t, e) {
    let r = (Be.get(e) || 0) + 1;
    Be.set(e, r), Ue && Ue.register(t, e, t);
  }
  function br(t) {
    Ue && Ue.unregister(t);
  }
  function ct(t, e, r = [], n = function () {}) {
    let s = !1,
      a = new Proxy(n, {
        get(i, o) {
          if ((De(s), o === pr))
            return () => {
              br(a), Ot(t), e.clear(), (s = !0);
            };
          if (o === "then") {
            if (r.length === 0) return { then: () => a };
            let c = ce(t, e, {
              type: "GET",
              path: r.map((u) => u.toString()),
            }).then(H);
            return c.then.bind(c);
          }
          return ct(t, e, [...r, o]);
        },
        set(i, o, c) {
          De(s);
          let [u, f] = qe(c);
          return ce(
            t,
            e,
            { type: "SET", path: [...r, o].map((y) => y.toString()), value: u },
            f,
          ).then(H);
        },
        apply(i, o, c) {
          De(s);
          let u = r[r.length - 1];
          if (u === fr) return ce(t, e, { type: "ENDPOINT" }).then(H);
          if (u === "bind") return ct(t, e, r.slice(0, -1));
          let [f, y] = _t(c);
          return ce(
            t,
            e,
            {
              type: "APPLY",
              path: r.map((w) => w.toString()),
              argumentList: f,
            },
            y,
          ).then(H);
        },
        construct(i, o) {
          De(s);
          let [c, u] = _t(o);
          return ce(
            t,
            e,
            {
              type: "CONSTRUCT",
              path: r.map((f) => f.toString()),
              argumentList: c,
            },
            u,
          ).then(H);
        },
      });
    return gr(a, t), a;
  }
  function _r(t) {
    return Array.prototype.concat.apply([], t);
  }
  function _t(t) {
    let e = t.map(qe);
    return [e.map((r) => r[0]), _r(e.map((r) => r[1]))];
  }
  var jt = new WeakMap();
  function xr(t, e) {
    return jt.set(t, e), t;
  }
  function wr(t) {
    return Object.assign(t, { [xt]: !0 });
  }
  function Rt(t, e = globalThis, r = "*") {
    return {
      postMessage: (n, s) => t.postMessage(n, r, s),
      addEventListener: e.addEventListener.bind(e),
      removeEventListener: e.removeEventListener.bind(e),
    };
  }
  function qe(t) {
    for (let [e, r] of kt)
      if (r.canHandle(t)) {
        let [n, s] = r.serialize(t);
        return [{ type: "HANDLER", name: e, value: n }, s];
      }
    return [{ type: "RAW", value: t }, jt.get(t) || []];
  }
  function H(t) {
    switch (t.type) {
      case "HANDLER":
        return kt.get(t.name).deserialize(t.value);
      case "RAW":
        return t.value;
    }
  }
  function ce(t, e, r, n) {
    return new Promise((s) => {
      let a = kr();
      e.set(a, s),
        t.start && t.start(),
        t.postMessage(Object.assign({ id: a }, r), n);
    });
  }
  function kr() {
    return new Array(4)
      .fill(0)
      .map(() =>
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16),
      )
      .join("-");
  }
  var Tr = {
      postMessage() {},
      addEventListener: () => {},
      removeEventListener: () => {},
    },
    Er = {
      postMessage: (t) => {
        console.debug("[webview:req]", t),
          window.ReactNativeWebView.postMessage(JSON.stringify(t));
      },
      addEventListener: (t, e, ...r) => {
        document.addEventListener("FarcasterFrameCallback", e, ...r);
      },
      removeEventListener: (t, e) => {
        document.removeEventListener("FarcasterFrameCallback", e);
      },
    },
    St =
      typeof window > "u"
        ? Tr
        : window?.ReactNativeWebView
          ? Er
          : Rt(window?.parent ?? window);
  var S = ut(St);
  var Pt = "0.1.1";
  function Ct() {
    return Pt;
  }
  var We = class t extends Error {
    constructor(e, r = {}) {
      let n = (() => {
          if (r.cause instanceof t) {
            if (r.cause.details) return r.cause.details;
            if (r.cause.shortMessage) return r.cause.shortMessage;
          }
          return r.cause?.message ? r.cause.message : r.details;
        })(),
        s = (r.cause instanceof t && r.cause.docsPath) || r.docsPath,
        i = `https://oxlib.sh${s ?? ""}`,
        o = [
          e || "An error occurred.",
          ...(r.metaMessages ? ["", ...r.metaMessages] : []),
          ...(n || s
            ? ["", n ? `Details: ${n}` : void 0, s ? `See: ${i}` : void 0]
            : []),
        ].filter((c) => typeof c == "string").join(`
`);
      super(o, r.cause ? { cause: r.cause } : void 0),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError",
        }),
        Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: `ox@${Ct()}`,
        }),
        (this.cause = r.cause),
        (this.details = n),
        (this.docs = i),
        (this.docsPath = s),
        (this.shortMessage = e);
    }
    walk(e) {
      return Nt(this, e);
    }
  };
  function Nt(t, e) {
    return e?.(t)
      ? t
      : t && typeof t == "object" && "cause" in t && t.cause
        ? Nt(t.cause, e)
        : e
          ? null
          : t;
  }
  var Ce = {};
  at(Ce, {
    ChainDisconnectedError: () => Ge,
    DisconnectedError: () => Ye,
    IsUndefinedError: () => Ke,
    ProviderRpcError: () => z,
    UnauthorizedError: () => Fe,
    UnsupportedMethodError: () => Je,
    UserRejectedRequestError: () => He,
    createEmitter: () => Or,
    from: () => jr,
  });
  function Mt(t, e = {}) {
    let { raw: r = !1 } = e,
      n = t;
    if (r) return t;
    if (n.error) {
      let { code: s } = n.error,
        a =
          s === Se.code
            ? Se
            : s === be.code
              ? be
              : s === Re.code
                ? Re
                : s === Oe.code
                  ? Oe
                  : s === Te.code
                    ? Te
                    : s === je.code
                      ? je
                      : s === ke.code
                        ? ke
                        : s === Pe.code
                          ? Pe
                          : s === _e.code
                            ? _e
                            : s === xe.code
                              ? xe
                              : s === we.code
                                ? we
                                : s === Ee.code
                                  ? Ee
                                  : j;
      throw new a(n.error);
    }
    return n.result;
  }
  var j = class extends Error {
      constructor(e) {
        let { code: r, message: n, data: s } = e;
        super(n),
          Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "RpcResponse.BaseError",
          }),
          Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0,
          }),
          Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0,
          }),
          (this.code = r),
          (this.data = s);
      }
    },
    be = class t extends j {
      constructor(e = {}) {
        super({
          message: "Missing or invalid parameters.",
          ...e,
          code: t.code,
        }),
          Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: -32e3,
          }),
          Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "RpcResponse.InvalidInputError",
          });
      }
    };
  Object.defineProperty(be, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32e3,
  });
  var _e = class t extends j {
    constructor(e = {}) {
      super({ message: "Requested resource not found.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32001,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.ResourceNotFoundError",
        });
    }
  };
  Object.defineProperty(_e, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32001,
  });
  var xe = class t extends j {
    constructor(e = {}) {
      super({
        message: "Requested resource not available.",
        ...e,
        code: t.code,
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32002,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.ResourceUnavailableError",
        });
    }
  };
  Object.defineProperty(xe, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32002,
  });
  var we = class t extends j {
    constructor(e = {}) {
      super({ message: "Transaction creation failed.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32003,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.TransactionRejectedError",
        });
    }
  };
  Object.defineProperty(we, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32003,
  });
  var ke = class t extends j {
    constructor(e = {}) {
      super({ message: "Method is not implemented.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32004,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.MethodNotSupportedError",
        });
    }
  };
  Object.defineProperty(ke, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32004,
  });
  var Te = class t extends j {
    constructor(e = {}) {
      super({ message: "Rate limit exceeded.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32005,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.LimitExceededError",
        });
    }
  };
  Object.defineProperty(Te, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32005,
  });
  var Ee = class t extends j {
    constructor(e = {}) {
      super({ message: "JSON-RPC version not supported.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32006,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.VersionNotSupportedError",
        });
    }
  };
  Object.defineProperty(Ee, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32006,
  });
  var Oe = class t extends j {
    constructor(e = {}) {
      super({
        message: "Input is not a valid JSON-RPC request.",
        ...e,
        code: t.code,
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32600,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.InvalidRequestError",
        });
    }
  };
  Object.defineProperty(Oe, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32600,
  });
  var je = class t extends j {
    constructor(e = {}) {
      super({ message: "Method does not exist.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32601,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.MethodNotFoundError",
        });
    }
  };
  Object.defineProperty(je, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32601,
  });
  var Re = class t extends j {
    constructor(e = {}) {
      super({ message: "Invalid method parameters.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32602,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.InvalidParamsError",
        });
    }
  };
  Object.defineProperty(Re, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32602,
  });
  var Se = class t extends j {
    constructor(e = {}) {
      super({ message: "Internal JSON-RPC error.", ...e, code: t.code }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32603,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.InternalErrorError",
        });
    }
  };
  Object.defineProperty(Se, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32603,
  });
  var Pe = class t extends j {
    constructor(e = {}) {
      super({
        message: "Failed to parse JSON-RPC response.",
        ...e,
        code: t.code,
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: -32700,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "RpcResponse.ParseError",
        });
    }
  };
  Object.defineProperty(Pe, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32700,
  });
  var z = class extends Error {
      constructor(e, r) {
        super(r),
          Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "ProviderRpcError",
          }),
          Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0,
          }),
          Object.defineProperty(this, "details", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0,
          }),
          (this.code = e),
          (this.details = r);
      }
    },
    He = class extends z {
      constructor({ message: e = "The user rejected the request." } = {}) {
        super(4001, e),
          Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "Provider.UserRejectedRequestError",
          });
      }
    };
  Object.defineProperty(He, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4001,
  });
  var Fe = class extends z {
    constructor({
      message:
        e = "The requested method and/or account has not been authorized by the user.",
    } = {}) {
      super(4100, e),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Provider.UnauthorizedError",
        });
    }
  };
  Object.defineProperty(Fe, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4100,
  });
  var Je = class extends z {
    constructor({
      message: e = "The provider does not support the requested method.",
    } = {}) {
      super(4200, e),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Provider.UnsupportedMethodError",
        });
    }
  };
  Object.defineProperty(Je, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4200,
  });
  var Ye = class extends z {
    constructor({
      message: e = "The provider is disconnected from all chains.",
    } = {}) {
      super(4900, e),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Provider.DisconnectedError",
        });
    }
  };
  Object.defineProperty(Ye, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4900,
  });
  var Ge = class extends z {
    constructor({
      message: e = "The provider is not connected to the requested chain.",
    } = {}) {
      super(4901, e),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Provider.ChainDisconnectedError",
        });
    }
  };
  Object.defineProperty(Ge, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4901,
  });
  function Or() {
    let t = new ge.default();
    return {
      get eventNames() {
        return t.eventNames.bind(t);
      },
      get listenerCount() {
        return t.listenerCount.bind(t);
      },
      get listeners() {
        return t.listeners.bind(t);
      },
      addListener: t.addListener.bind(t),
      emit: t.emit.bind(t),
      off: t.off.bind(t),
      on: t.on.bind(t),
      once: t.once.bind(t),
      removeAllListeners: t.removeAllListeners.bind(t),
      removeListener: t.removeListener.bind(t),
    };
  }
  function jr(t, e = {}) {
    let { includeEvents: r = !0 } = e;
    if (!t) throw new Ke();
    return {
      ...(r
        ? { on: t.on?.bind(t), removeListener: t.removeListener?.bind(t) }
        : {}),
      async request(n) {
        let s = await t.request(n);
        return s && typeof s == "object" && "jsonrpc" in s ? Mt(s) : s;
      },
    };
  }
  var Ke = class extends We {
    constructor() {
      super("`provider` is undefined."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Provider.IsUndefinedError",
        });
    }
  };
  var Xe = {};
  at(Xe, { createStore: () => Rr, from: () => It });
  function Rr(t = {}) {
    let e = t.id ?? 0;
    return {
      prepare(r) {
        return It({ id: e++, ...r });
      },
      get id() {
        return e;
      },
    };
  }
  function It(t) {
    return { ...t, jsonrpc: "2.0" };
  }
  var Sr = Ce.createEmitter(),
    Pr = Xe.createStore(),
    Lt = Ce.from({
      ...Sr,
      async request(t) {
        return await S.ethProviderRequest(Pr.prepare(t));
      },
    });
  typeof document < "u" &&
    document.addEventListener("FarcasterFrameEvent", (t) => {
      t instanceof MessageEvent;
    });
  function $t() {
    let t = new ge.default();
    return {
      get eventNames() {
        return t.eventNames.bind(t);
      },
      get listenerCount() {
        return t.listenerCount.bind(t);
      },
      get listeners() {
        return t.listeners.bind(t);
      },
      addListener: t.addListener.bind(t),
      emit: t.emit.bind(t),
      off: t.off.bind(t),
      on: t.on.bind(t),
      once: t.once.bind(t),
      removeAllListeners: t.removeAllListeners.bind(t),
      removeListener: t.removeListener.bind(t),
    };
  }
  var Vt = $t(),
    dt = {
      ...Vt,
      context: S.context,
      actions: {
        setPrimaryButton: S.setPrimaryButton.bind(S),
        ready: S.ready.bind(S),
        close: S.close.bind(S),
        openUrl: S.openUrl.bind(S),
        addFrame: S.addFrame.bind(S),
      },
      wallet: { ethProvider: Lt },
    };
  typeof document < "u" &&
    document.addEventListener("FarcasterFrameEvent", (t) => {
      t instanceof MessageEvent &&
        t.data.type === "primaryButtonClicked" &&
        Vt.emit("primaryButtonClicked");
    });
  var x;
  (function (t) {
    t.assertEqual = (s) => s;
    function e(s) {}
    t.assertIs = e;
    function r(s) {
      throw new Error();
    }
    (t.assertNever = r),
      (t.arrayToEnum = (s) => {
        let a = {};
        for (let i of s) a[i] = i;
        return a;
      }),
      (t.getValidEnumValues = (s) => {
        let a = t.objectKeys(s).filter((o) => typeof s[s[o]] != "number"),
          i = {};
        for (let o of a) i[o] = s[o];
        return t.objectValues(i);
      }),
      (t.objectValues = (s) =>
        t.objectKeys(s).map(function (a) {
          return s[a];
        })),
      (t.objectKeys =
        typeof Object.keys == "function"
          ? (s) => Object.keys(s)
          : (s) => {
              let a = [];
              for (let i in s)
                Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
              return a;
            }),
      (t.find = (s, a) => {
        for (let i of s) if (a(i)) return i;
      }),
      (t.isInteger =
        typeof Number.isInteger == "function"
          ? (s) => Number.isInteger(s)
          : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s);
    function n(s, a = " | ") {
      return s.map((i) => (typeof i == "string" ? `'${i}'` : i)).join(a);
    }
    (t.joinValues = n),
      (t.jsonStringifyReplacer = (s, a) =>
        typeof a == "bigint" ? a.toString() : a);
  })(x || (x = {}));
  var ft;
  (function (t) {
    t.mergeShapes = (e, r) => ({ ...e, ...r });
  })(ft || (ft = {}));
  var p = x.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set",
    ]),
    B = (t) => {
      switch (typeof t) {
        case "undefined":
          return p.undefined;
        case "string":
          return p.string;
        case "number":
          return isNaN(t) ? p.nan : p.number;
        case "boolean":
          return p.boolean;
        case "function":
          return p.function;
        case "bigint":
          return p.bigint;
        case "symbol":
          return p.symbol;
        case "object":
          return Array.isArray(t)
            ? p.array
            : t === null
              ? p.null
              : t.then &&
                  typeof t.then == "function" &&
                  t.catch &&
                  typeof t.catch == "function"
                ? p.promise
                : typeof Map < "u" && t instanceof Map
                  ? p.map
                  : typeof Set < "u" && t instanceof Set
                    ? p.set
                    : typeof Date < "u" && t instanceof Date
                      ? p.date
                      : p.object;
        default:
          return p.unknown;
      }
    },
    d = x.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite",
    ]),
    Cr = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"),
    C = class t extends Error {
      constructor(e) {
        super(),
          (this.issues = []),
          (this.addIssue = (n) => {
            this.issues = [...this.issues, n];
          }),
          (this.addIssues = (n = []) => {
            this.issues = [...this.issues, ...n];
          });
        let r = new.target.prototype;
        Object.setPrototypeOf
          ? Object.setPrototypeOf(this, r)
          : (this.__proto__ = r),
          (this.name = "ZodError"),
          (this.issues = e);
      }
      get errors() {
        return this.issues;
      }
      format(e) {
        let r =
            e ||
            function (a) {
              return a.message;
            },
          n = { _errors: [] },
          s = (a) => {
            for (let i of a.issues)
              if (i.code === "invalid_union") i.unionErrors.map(s);
              else if (i.code === "invalid_return_type") s(i.returnTypeError);
              else if (i.code === "invalid_arguments") s(i.argumentsError);
              else if (i.path.length === 0) n._errors.push(r(i));
              else {
                let o = n,
                  c = 0;
                for (; c < i.path.length; ) {
                  let u = i.path[c];
                  c === i.path.length - 1
                    ? ((o[u] = o[u] || { _errors: [] }),
                      o[u]._errors.push(r(i)))
                    : (o[u] = o[u] || { _errors: [] }),
                    (o = o[u]),
                    c++;
                }
              }
          };
        return s(this), n;
      }
      static assert(e) {
        if (!(e instanceof t)) throw new Error(`Not a ZodError: ${e}`);
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, x.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(e = (r) => r.message) {
        let r = {},
          n = [];
        for (let s of this.issues)
          s.path.length > 0
            ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(e(s)))
            : n.push(e(s));
        return { formErrors: n, fieldErrors: r };
      }
      get formErrors() {
        return this.flatten();
      }
    };
  C.create = (t) => new C(t);
  var le = (t, e) => {
      let r;
      switch (t.code) {
        case d.invalid_type:
          t.received === p.undefined
            ? (r = "Required")
            : (r = `Expected ${t.expected}, received ${t.received}`);
          break;
        case d.invalid_literal:
          r = `Invalid literal value, expected ${JSON.stringify(t.expected, x.jsonStringifyReplacer)}`;
          break;
        case d.unrecognized_keys:
          r = `Unrecognized key(s) in object: ${x.joinValues(t.keys, ", ")}`;
          break;
        case d.invalid_union:
          r = "Invalid input";
          break;
        case d.invalid_union_discriminator:
          r = `Invalid discriminator value. Expected ${x.joinValues(t.options)}`;
          break;
        case d.invalid_enum_value:
          r = `Invalid enum value. Expected ${x.joinValues(t.options)}, received '${t.received}'`;
          break;
        case d.invalid_arguments:
          r = "Invalid function arguments";
          break;
        case d.invalid_return_type:
          r = "Invalid function return type";
          break;
        case d.invalid_date:
          r = "Invalid date";
          break;
        case d.invalid_string:
          typeof t.validation == "object"
            ? "includes" in t.validation
              ? ((r = `Invalid input: must include "${t.validation.includes}"`),
                typeof t.validation.position == "number" &&
                  (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`))
              : "startsWith" in t.validation
                ? (r = `Invalid input: must start with "${t.validation.startsWith}"`)
                : "endsWith" in t.validation
                  ? (r = `Invalid input: must end with "${t.validation.endsWith}"`)
                  : x.assertNever(t.validation)
            : t.validation !== "regex"
              ? (r = `Invalid ${t.validation}`)
              : (r = "Invalid");
          break;
        case d.too_small:
          t.type === "array"
            ? (r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)`)
            : t.type === "string"
              ? (r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)`)
              : t.type === "number"
                ? (r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}`)
                : t.type === "date"
                  ? (r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}`)
                  : (r = "Invalid input");
          break;
        case d.too_big:
          t.type === "array"
            ? (r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)`)
            : t.type === "string"
              ? (r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)`)
              : t.type === "number"
                ? (r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}`)
                : t.type === "bigint"
                  ? (r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}`)
                  : t.type === "date"
                    ? (r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}`)
                    : (r = "Invalid input");
          break;
        case d.custom:
          r = "Invalid input";
          break;
        case d.invalid_intersection_types:
          r = "Intersection results could not be merged";
          break;
        case d.not_multiple_of:
          r = `Number must be a multiple of ${t.multipleOf}`;
          break;
        case d.not_finite:
          r = "Number must be finite";
          break;
        default:
          (r = e.defaultError), x.assertNever(t);
      }
      return { message: r };
    },
    Bt = le;
  function Nr(t) {
    Bt = t;
  }
  function Qe() {
    return Bt;
  }
  var et = (t) => {
      let { data: e, path: r, errorMaps: n, issueData: s } = t,
        a = [...r, ...(s.path || [])],
        i = { ...s, path: a };
      if (s.message !== void 0) return { ...s, path: a, message: s.message };
      let o = "",
        c = n
          .filter((u) => !!u)
          .slice()
          .reverse();
      for (let u of c) o = u(i, { data: e, defaultError: o }).message;
      return { ...s, path: a, message: o };
    },
    Ar = [];
  function l(t, e) {
    let r = Qe(),
      n = et({
        issueData: e,
        data: t.data,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          r,
          r === le ? void 0 : le,
        ].filter((s) => !!s),
      });
    t.common.issues.push(n);
  }
  var T = class t {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        this.value === "valid" && (this.value = "dirty");
      }
      abort() {
        this.value !== "aborted" && (this.value = "aborted");
      }
      static mergeArray(e, r) {
        let n = [];
        for (let s of r) {
          if (s.status === "aborted") return v;
          s.status === "dirty" && e.dirty(), n.push(s.value);
        }
        return { status: e.value, value: n };
      }
      static async mergeObjectAsync(e, r) {
        let n = [];
        for (let s of r) {
          let a = await s.key,
            i = await s.value;
          n.push({ key: a, value: i });
        }
        return t.mergeObjectSync(e, n);
      }
      static mergeObjectSync(e, r) {
        let n = {};
        for (let s of r) {
          let { key: a, value: i } = s;
          if (a.status === "aborted" || i.status === "aborted") return v;
          a.status === "dirty" && e.dirty(),
            i.status === "dirty" && e.dirty(),
            a.value !== "__proto__" &&
              (typeof i.value < "u" || s.alwaysSet) &&
              (n[a.value] = i.value);
        }
        return { status: e.value, value: n };
      }
    },
    v = Object.freeze({ status: "aborted" }),
    de = (t) => ({ status: "dirty", value: t }),
    R = (t) => ({ status: "valid", value: t }),
    pt = (t) => t.status === "aborted",
    ht = (t) => t.status === "dirty",
    Me = (t) => t.status === "valid",
    Ze = (t) => typeof Promise < "u" && t instanceof Promise;
  function tt(t, e, r, n) {
    if (r === "a" && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  }
  function Ut(t, e, r, n, s) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !s)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !s : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return n === "a" ? s.call(t, r) : s ? (s.value = r) : e.set(t, r), r;
  }
  var h;
  (function (t) {
    (t.errToObj = (e) => (typeof e == "string" ? { message: e } : e || {})),
      (t.toString = (e) => (typeof e == "string" ? e : e?.message));
  })(h || (h = {}));
  var Ne,
    Ae,
    M = class {
      constructor(e, r, n, s) {
        (this._cachedPath = []),
          (this.parent = e),
          (this.data = r),
          (this._path = n),
          (this._key = s);
      }
      get path() {
        return (
          this._cachedPath.length ||
            (this._key instanceof Array
              ? this._cachedPath.push(...this._path, ...this._key)
              : this._cachedPath.push(...this._path, this._key)),
          this._cachedPath
        );
      }
    },
    Dt = (t, e) => {
      if (Me(e)) return { success: !0, data: e.value };
      if (!t.common.issues.length)
        throw new Error("Validation failed but no issues detected.");
      return {
        success: !1,
        get error() {
          if (this._error) return this._error;
          let r = new C(t.common.issues);
          return (this._error = r), this._error;
        },
      };
    };
  function g(t) {
    if (!t) return {};
    let {
      errorMap: e,
      invalid_type_error: r,
      required_error: n,
      description: s,
    } = t;
    if (e && (r || n))
      throw new Error(
        `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
      );
    return e
      ? { errorMap: e, description: s }
      : {
          errorMap: (i, o) => {
            var c, u;
            let { message: f } = t;
            return i.code === "invalid_enum_value"
              ? { message: f ?? o.defaultError }
              : typeof o.data > "u"
                ? {
                    message:
                      (c = f ?? n) !== null && c !== void 0
                        ? c
                        : o.defaultError,
                  }
                : i.code !== "invalid_type"
                  ? { message: o.defaultError }
                  : {
                      message:
                        (u = f ?? r) !== null && u !== void 0
                          ? u
                          : o.defaultError,
                    };
          },
          description: s,
        };
  }
  var b = class {
      constructor(e) {
        (this.spa = this.safeParseAsync),
          (this._def = e),
          (this.parse = this.parse.bind(this)),
          (this.safeParse = this.safeParse.bind(this)),
          (this.parseAsync = this.parseAsync.bind(this)),
          (this.safeParseAsync = this.safeParseAsync.bind(this)),
          (this.spa = this.spa.bind(this)),
          (this.refine = this.refine.bind(this)),
          (this.refinement = this.refinement.bind(this)),
          (this.superRefine = this.superRefine.bind(this)),
          (this.optional = this.optional.bind(this)),
          (this.nullable = this.nullable.bind(this)),
          (this.nullish = this.nullish.bind(this)),
          (this.array = this.array.bind(this)),
          (this.promise = this.promise.bind(this)),
          (this.or = this.or.bind(this)),
          (this.and = this.and.bind(this)),
          (this.transform = this.transform.bind(this)),
          (this.brand = this.brand.bind(this)),
          (this.default = this.default.bind(this)),
          (this.catch = this.catch.bind(this)),
          (this.describe = this.describe.bind(this)),
          (this.pipe = this.pipe.bind(this)),
          (this.readonly = this.readonly.bind(this)),
          (this.isNullable = this.isNullable.bind(this)),
          (this.isOptional = this.isOptional.bind(this));
      }
      get description() {
        return this._def.description;
      }
      _getType(e) {
        return B(e.data);
      }
      _getOrReturnCtx(e, r) {
        return (
          r || {
            common: e.parent.common,
            data: e.data,
            parsedType: B(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent,
          }
        );
      }
      _processInputParams(e) {
        return {
          status: new T(),
          ctx: {
            common: e.parent.common,
            data: e.data,
            parsedType: B(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent,
          },
        };
      }
      _parseSync(e) {
        let r = this._parse(e);
        if (Ze(r)) throw new Error("Synchronous parse encountered promise.");
        return r;
      }
      _parseAsync(e) {
        let r = this._parse(e);
        return Promise.resolve(r);
      }
      parse(e, r) {
        let n = this.safeParse(e, r);
        if (n.success) return n.data;
        throw n.error;
      }
      safeParse(e, r) {
        var n;
        let s = {
            common: {
              issues: [],
              async: (n = r?.async) !== null && n !== void 0 ? n : !1,
              contextualErrorMap: r?.errorMap,
            },
            path: r?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: B(e),
          },
          a = this._parseSync({ data: e, path: s.path, parent: s });
        return Dt(s, a);
      }
      async parseAsync(e, r) {
        let n = await this.safeParseAsync(e, r);
        if (n.success) return n.data;
        throw n.error;
      }
      async safeParseAsync(e, r) {
        let n = {
            common: { issues: [], contextualErrorMap: r?.errorMap, async: !0 },
            path: r?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: B(e),
          },
          s = this._parse({ data: e, path: n.path, parent: n }),
          a = await (Ze(s) ? s : Promise.resolve(s));
        return Dt(n, a);
      }
      refine(e, r) {
        let n = (s) =>
          typeof r == "string" || typeof r > "u"
            ? { message: r }
            : typeof r == "function"
              ? r(s)
              : r;
        return this._refinement((s, a) => {
          let i = e(s),
            o = () => a.addIssue({ code: d.custom, ...n(s) });
          return typeof Promise < "u" && i instanceof Promise
            ? i.then((c) => (c ? !0 : (o(), !1)))
            : i
              ? !0
              : (o(), !1);
        });
      }
      refinement(e, r) {
        return this._refinement((n, s) =>
          e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1),
        );
      }
      _refinement(e) {
        return new N({
          schema: this,
          typeName: m.ZodEffects,
          effect: { type: "refinement", refinement: e },
        });
      }
      superRefine(e) {
        return this._refinement(e);
      }
      optional() {
        return A.create(this, this._def);
      }
      nullable() {
        return L.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return D.create(this, this._def);
      }
      promise() {
        return W.create(this, this._def);
      }
      or(e) {
        return Q.create([this, e], this._def);
      }
      and(e) {
        return ee.create(this, e, this._def);
      }
      transform(e) {
        return new N({
          ...g(this._def),
          schema: this,
          typeName: m.ZodEffects,
          effect: { type: "transform", transform: e },
        });
      }
      default(e) {
        let r = typeof e == "function" ? e : () => e;
        return new ae({
          ...g(this._def),
          innerType: this,
          defaultValue: r,
          typeName: m.ZodDefault,
        });
      }
      brand() {
        return new Ie({ typeName: m.ZodBranded, type: this, ...g(this._def) });
      }
      catch(e) {
        let r = typeof e == "function" ? e : () => e;
        return new ie({
          ...g(this._def),
          innerType: this,
          catchValue: r,
          typeName: m.ZodCatch,
        });
      }
      describe(e) {
        let r = this.constructor;
        return new r({ ...this._def, description: e });
      }
      pipe(e) {
        return Le.create(this, e);
      }
      readonly() {
        return oe.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    },
    Mr = /^c[^\s-]{8,}$/i,
    Zr = /^[0-9a-z]+$/,
    Ir = /^[0-9A-HJKMNP-TV-Z]{26}$/,
    Lr =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    $r = /^[a-z0-9_-]{21}$/i,
    Vr =
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    Dr =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    zr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
    lt,
    Br =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    Ur =
      /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    qr = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    qt =
      "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    Wr = new RegExp(`^${qt}$`);
  function Wt(t) {
    let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return (
      t.precision
        ? (e = `${e}\\.\\d{${t.precision}}`)
        : t.precision == null && (e = `${e}(\\.\\d+)?`),
      e
    );
  }
  function Hr(t) {
    return new RegExp(`^${Wt(t)}$`);
  }
  function Ht(t) {
    let e = `${qt}T${Wt(t)}`,
      r = [];
    return (
      r.push(t.local ? "Z?" : "Z"),
      t.offset && r.push("([+-]\\d{2}:?\\d{2})"),
      (e = `${e}(${r.join("|")})`),
      new RegExp(`^${e}$`)
    );
  }
  function Fr(t, e) {
    return !!(
      ((e === "v4" || !e) && Br.test(t)) ||
      ((e === "v6" || !e) && Ur.test(t))
    );
  }
  var U = class t extends b {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = String(e.data)),
        this._getType(e) !== p.string)
      ) {
        let a = this._getOrReturnCtx(e);
        return (
          l(a, {
            code: d.invalid_type,
            expected: p.string,
            received: a.parsedType,
          }),
          v
        );
      }
      let n = new T(),
        s;
      for (let a of this._def.checks)
        if (a.kind === "min")
          e.data.length < a.value &&
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              code: d.too_small,
              minimum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "max")
          e.data.length > a.value &&
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              code: d.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "length") {
          let i = e.data.length > a.value,
            o = e.data.length < a.value;
          (i || o) &&
            ((s = this._getOrReturnCtx(e, s)),
            i
              ? l(s, {
                  code: d.too_big,
                  maximum: a.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: a.message,
                })
              : o &&
                l(s, {
                  code: d.too_small,
                  minimum: a.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: a.message,
                }),
            n.dirty());
        } else if (a.kind === "email")
          Dr.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "email",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "emoji")
          lt || (lt = new RegExp(zr, "u")),
            lt.test(e.data) ||
              ((s = this._getOrReturnCtx(e, s)),
              l(s, {
                validation: "emoji",
                code: d.invalid_string,
                message: a.message,
              }),
              n.dirty());
        else if (a.kind === "uuid")
          Lr.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "uuid",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "nanoid")
          $r.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "nanoid",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "cuid")
          Mr.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "cuid",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "cuid2")
          Zr.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "cuid2",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "ulid")
          Ir.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              validation: "ulid",
              code: d.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "url")
          try {
            new URL(e.data);
          } catch {
            (s = this._getOrReturnCtx(e, s)),
              l(s, {
                validation: "url",
                code: d.invalid_string,
                message: a.message,
              }),
              n.dirty();
          }
        else
          a.kind === "regex"
            ? ((a.regex.lastIndex = 0),
              a.regex.test(e.data) ||
                ((s = this._getOrReturnCtx(e, s)),
                l(s, {
                  validation: "regex",
                  code: d.invalid_string,
                  message: a.message,
                }),
                n.dirty()))
            : a.kind === "trim"
              ? (e.data = e.data.trim())
              : a.kind === "includes"
                ? e.data.includes(a.value, a.position) ||
                  ((s = this._getOrReturnCtx(e, s)),
                  l(s, {
                    code: d.invalid_string,
                    validation: { includes: a.value, position: a.position },
                    message: a.message,
                  }),
                  n.dirty())
                : a.kind === "toLowerCase"
                  ? (e.data = e.data.toLowerCase())
                  : a.kind === "toUpperCase"
                    ? (e.data = e.data.toUpperCase())
                    : a.kind === "startsWith"
                      ? e.data.startsWith(a.value) ||
                        ((s = this._getOrReturnCtx(e, s)),
                        l(s, {
                          code: d.invalid_string,
                          validation: { startsWith: a.value },
                          message: a.message,
                        }),
                        n.dirty())
                      : a.kind === "endsWith"
                        ? e.data.endsWith(a.value) ||
                          ((s = this._getOrReturnCtx(e, s)),
                          l(s, {
                            code: d.invalid_string,
                            validation: { endsWith: a.value },
                            message: a.message,
                          }),
                          n.dirty())
                        : a.kind === "datetime"
                          ? Ht(a).test(e.data) ||
                            ((s = this._getOrReturnCtx(e, s)),
                            l(s, {
                              code: d.invalid_string,
                              validation: "datetime",
                              message: a.message,
                            }),
                            n.dirty())
                          : a.kind === "date"
                            ? Wr.test(e.data) ||
                              ((s = this._getOrReturnCtx(e, s)),
                              l(s, {
                                code: d.invalid_string,
                                validation: "date",
                                message: a.message,
                              }),
                              n.dirty())
                            : a.kind === "time"
                              ? Hr(a).test(e.data) ||
                                ((s = this._getOrReturnCtx(e, s)),
                                l(s, {
                                  code: d.invalid_string,
                                  validation: "time",
                                  message: a.message,
                                }),
                                n.dirty())
                              : a.kind === "duration"
                                ? Vr.test(e.data) ||
                                  ((s = this._getOrReturnCtx(e, s)),
                                  l(s, {
                                    validation: "duration",
                                    code: d.invalid_string,
                                    message: a.message,
                                  }),
                                  n.dirty())
                                : a.kind === "ip"
                                  ? Fr(e.data, a.version) ||
                                    ((s = this._getOrReturnCtx(e, s)),
                                    l(s, {
                                      validation: "ip",
                                      code: d.invalid_string,
                                      message: a.message,
                                    }),
                                    n.dirty())
                                  : a.kind === "base64"
                                    ? qr.test(e.data) ||
                                      ((s = this._getOrReturnCtx(e, s)),
                                      l(s, {
                                        validation: "base64",
                                        code: d.invalid_string,
                                        message: a.message,
                                      }),
                                      n.dirty())
                                    : x.assertNever(a);
      return { status: n.value, value: e.data };
    }
    _regex(e, r, n) {
      return this.refinement((s) => e.test(s), {
        validation: r,
        code: d.invalid_string,
        ...h.errToObj(n),
      });
    }
    _addCheck(e) {
      return new t({ ...this._def, checks: [...this._def.checks, e] });
    }
    email(e) {
      return this._addCheck({ kind: "email", ...h.errToObj(e) });
    }
    url(e) {
      return this._addCheck({ kind: "url", ...h.errToObj(e) });
    }
    emoji(e) {
      return this._addCheck({ kind: "emoji", ...h.errToObj(e) });
    }
    uuid(e) {
      return this._addCheck({ kind: "uuid", ...h.errToObj(e) });
    }
    nanoid(e) {
      return this._addCheck({ kind: "nanoid", ...h.errToObj(e) });
    }
    cuid(e) {
      return this._addCheck({ kind: "cuid", ...h.errToObj(e) });
    }
    cuid2(e) {
      return this._addCheck({ kind: "cuid2", ...h.errToObj(e) });
    }
    ulid(e) {
      return this._addCheck({ kind: "ulid", ...h.errToObj(e) });
    }
    base64(e) {
      return this._addCheck({ kind: "base64", ...h.errToObj(e) });
    }
    ip(e) {
      return this._addCheck({ kind: "ip", ...h.errToObj(e) });
    }
    datetime(e) {
      var r, n;
      return typeof e == "string"
        ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            local: !1,
            message: e,
          })
        : this._addCheck({
            kind: "datetime",
            precision: typeof e?.precision > "u" ? null : e?.precision,
            offset: (r = e?.offset) !== null && r !== void 0 ? r : !1,
            local: (n = e?.local) !== null && n !== void 0 ? n : !1,
            ...h.errToObj(e?.message),
          });
    }
    date(e) {
      return this._addCheck({ kind: "date", message: e });
    }
    time(e) {
      return typeof e == "string"
        ? this._addCheck({ kind: "time", precision: null, message: e })
        : this._addCheck({
            kind: "time",
            precision: typeof e?.precision > "u" ? null : e?.precision,
            ...h.errToObj(e?.message),
          });
    }
    duration(e) {
      return this._addCheck({ kind: "duration", ...h.errToObj(e) });
    }
    regex(e, r) {
      return this._addCheck({ kind: "regex", regex: e, ...h.errToObj(r) });
    }
    includes(e, r) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: r?.position,
        ...h.errToObj(r?.message),
      });
    }
    startsWith(e, r) {
      return this._addCheck({ kind: "startsWith", value: e, ...h.errToObj(r) });
    }
    endsWith(e, r) {
      return this._addCheck({ kind: "endsWith", value: e, ...h.errToObj(r) });
    }
    min(e, r) {
      return this._addCheck({ kind: "min", value: e, ...h.errToObj(r) });
    }
    max(e, r) {
      return this._addCheck({ kind: "max", value: e, ...h.errToObj(r) });
    }
    length(e, r) {
      return this._addCheck({ kind: "length", value: e, ...h.errToObj(r) });
    }
    nonempty(e) {
      return this.min(1, h.errToObj(e));
    }
    trim() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }],
      });
    }
    toLowerCase() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }],
      });
    }
    toUpperCase() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }],
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => e.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((e) => e.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((e) => e.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((e) => e.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((e) => e.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((e) => e.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => e.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((e) => e.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((e) => e.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((e) => e.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => e.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((e) => e.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((e) => e.kind === "ip");
    }
    get isBase64() {
      return !!this._def.checks.find((e) => e.kind === "base64");
    }
    get minLength() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  U.create = (t) => {
    var e;
    return new U({
      checks: [],
      typeName: m.ZodString,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...g(t),
    });
  };
  function Jr(t, e) {
    let r = (t.toString().split(".")[1] || "").length,
      n = (e.toString().split(".")[1] || "").length,
      s = r > n ? r : n,
      a = parseInt(t.toFixed(s).replace(".", "")),
      i = parseInt(e.toFixed(s).replace(".", ""));
    return (a % i) / Math.pow(10, s);
  }
  var F = class t extends b {
    constructor() {
      super(...arguments),
        (this.min = this.gte),
        (this.max = this.lte),
        (this.step = this.multipleOf);
    }
    _parse(e) {
      if (
        (this._def.coerce && (e.data = Number(e.data)),
        this._getType(e) !== p.number)
      ) {
        let a = this._getOrReturnCtx(e);
        return (
          l(a, {
            code: d.invalid_type,
            expected: p.number,
            received: a.parsedType,
          }),
          v
        );
      }
      let n,
        s = new T();
      for (let a of this._def.checks)
        a.kind === "int"
          ? x.isInteger(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            l(n, {
              code: d.invalid_type,
              expected: "integer",
              received: "float",
              message: a.message,
            }),
            s.dirty())
          : a.kind === "min"
            ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
              ((n = this._getOrReturnCtx(e, n)),
              l(n, {
                code: d.too_small,
                minimum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message,
              }),
              s.dirty())
            : a.kind === "max"
              ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
                ((n = this._getOrReturnCtx(e, n)),
                l(n, {
                  code: d.too_big,
                  maximum: a.value,
                  type: "number",
                  inclusive: a.inclusive,
                  exact: !1,
                  message: a.message,
                }),
                s.dirty())
              : a.kind === "multipleOf"
                ? Jr(e.data, a.value) !== 0 &&
                  ((n = this._getOrReturnCtx(e, n)),
                  l(n, {
                    code: d.not_multiple_of,
                    multipleOf: a.value,
                    message: a.message,
                  }),
                  s.dirty())
                : a.kind === "finite"
                  ? Number.isFinite(e.data) ||
                    ((n = this._getOrReturnCtx(e, n)),
                    l(n, { code: d.not_finite, message: a.message }),
                    s.dirty())
                  : x.assertNever(a);
      return { status: s.value, value: e.data };
    }
    gte(e, r) {
      return this.setLimit("min", e, !0, h.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, !1, h.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, !0, h.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, !1, h.toString(r));
    }
    setLimit(e, r, n, s) {
      return new t({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: r, inclusive: n, message: h.toString(s) },
        ],
      });
    }
    _addCheck(e) {
      return new t({ ...this._def, checks: [...this._def.checks, e] });
    }
    int(e) {
      return this._addCheck({ kind: "int", message: h.toString(e) });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: h.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: h.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: h.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: h.toString(e),
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: h.toString(r),
      });
    }
    finite(e) {
      return this._addCheck({ kind: "finite", message: h.toString(e) });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: h.toString(e),
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: h.toString(e),
      });
    }
    get minValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find(
        (e) =>
          e.kind === "int" || (e.kind === "multipleOf" && x.isInteger(e.value)),
      );
    }
    get isFinite() {
      let e = null,
        r = null;
      for (let n of this._def.checks) {
        if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
          return !0;
        n.kind === "min"
          ? (r === null || n.value > r) && (r = n.value)
          : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
      }
      return Number.isFinite(r) && Number.isFinite(e);
    }
  };
  F.create = (t) =>
    new F({
      checks: [],
      typeName: m.ZodNumber,
      coerce: t?.coerce || !1,
      ...g(t),
    });
  var J = class t extends b {
    constructor() {
      super(...arguments), (this.min = this.gte), (this.max = this.lte);
    }
    _parse(e) {
      if (
        (this._def.coerce && (e.data = BigInt(e.data)),
        this._getType(e) !== p.bigint)
      ) {
        let a = this._getOrReturnCtx(e);
        return (
          l(a, {
            code: d.invalid_type,
            expected: p.bigint,
            received: a.parsedType,
          }),
          v
        );
      }
      let n,
        s = new T();
      for (let a of this._def.checks)
        a.kind === "min"
          ? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
            ((n = this._getOrReturnCtx(e, n)),
            l(n, {
              code: d.too_small,
              type: "bigint",
              minimum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            s.dirty())
          : a.kind === "max"
            ? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
              ((n = this._getOrReturnCtx(e, n)),
              l(n, {
                code: d.too_big,
                type: "bigint",
                maximum: a.value,
                inclusive: a.inclusive,
                message: a.message,
              }),
              s.dirty())
            : a.kind === "multipleOf"
              ? e.data % a.value !== BigInt(0) &&
                ((n = this._getOrReturnCtx(e, n)),
                l(n, {
                  code: d.not_multiple_of,
                  multipleOf: a.value,
                  message: a.message,
                }),
                s.dirty())
              : x.assertNever(a);
      return { status: s.value, value: e.data };
    }
    gte(e, r) {
      return this.setLimit("min", e, !0, h.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, !1, h.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, !0, h.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, !1, h.toString(r));
    }
    setLimit(e, r, n, s) {
      return new t({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: e, value: r, inclusive: n, message: h.toString(s) },
        ],
      });
    }
    _addCheck(e) {
      return new t({ ...this._def, checks: [...this._def.checks, e] });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: h.toString(e),
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: h.toString(e),
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: h.toString(e),
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: h.toString(e),
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: h.toString(r),
      });
    }
    get minValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  J.create = (t) => {
    var e;
    return new J({
      checks: [],
      typeName: m.ZodBigInt,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...g(t),
    });
  };
  var Y = class extends b {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = !!e.data),
        this._getType(e) !== p.boolean)
      ) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.boolean,
            received: n.parsedType,
          }),
          v
        );
      }
      return R(e.data);
    }
  };
  Y.create = (t) =>
    new Y({ typeName: m.ZodBoolean, coerce: t?.coerce || !1, ...g(t) });
  var G = class t extends b {
    _parse(e) {
      if (
        (this._def.coerce && (e.data = new Date(e.data)),
        this._getType(e) !== p.date)
      ) {
        let a = this._getOrReturnCtx(e);
        return (
          l(a, {
            code: d.invalid_type,
            expected: p.date,
            received: a.parsedType,
          }),
          v
        );
      }
      if (isNaN(e.data.getTime())) {
        let a = this._getOrReturnCtx(e);
        return l(a, { code: d.invalid_date }), v;
      }
      let n = new T(),
        s;
      for (let a of this._def.checks)
        a.kind === "min"
          ? e.data.getTime() < a.value &&
            ((s = this._getOrReturnCtx(e, s)),
            l(s, {
              code: d.too_small,
              message: a.message,
              inclusive: !0,
              exact: !1,
              minimum: a.value,
              type: "date",
            }),
            n.dirty())
          : a.kind === "max"
            ? e.data.getTime() > a.value &&
              ((s = this._getOrReturnCtx(e, s)),
              l(s, {
                code: d.too_big,
                message: a.message,
                inclusive: !0,
                exact: !1,
                maximum: a.value,
                type: "date",
              }),
              n.dirty())
            : x.assertNever(a);
      return { status: n.value, value: new Date(e.data.getTime()) };
    }
    _addCheck(e) {
      return new t({ ...this._def, checks: [...this._def.checks, e] });
    }
    min(e, r) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: h.toString(r),
      });
    }
    max(e, r) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: h.toString(r),
      });
    }
    get minDate() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
  };
  G.create = (t) =>
    new G({
      checks: [],
      coerce: t?.coerce || !1,
      typeName: m.ZodDate,
      ...g(t),
    });
  var fe = class extends b {
    _parse(e) {
      if (this._getType(e) !== p.symbol) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.symbol,
            received: n.parsedType,
          }),
          v
        );
      }
      return R(e.data);
    }
  };
  fe.create = (t) => new fe({ typeName: m.ZodSymbol, ...g(t) });
  var K = class extends b {
    _parse(e) {
      if (this._getType(e) !== p.undefined) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.undefined,
            received: n.parsedType,
          }),
          v
        );
      }
      return R(e.data);
    }
  };
  K.create = (t) => new K({ typeName: m.ZodUndefined, ...g(t) });
  var X = class extends b {
    _parse(e) {
      if (this._getType(e) !== p.null) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.null,
            received: n.parsedType,
          }),
          v
        );
      }
      return R(e.data);
    }
  };
  X.create = (t) => new X({ typeName: m.ZodNull, ...g(t) });
  var q = class extends b {
    constructor() {
      super(...arguments), (this._any = !0);
    }
    _parse(e) {
      return R(e.data);
    }
  };
  q.create = (t) => new q({ typeName: m.ZodAny, ...g(t) });
  var V = class extends b {
    constructor() {
      super(...arguments), (this._unknown = !0);
    }
    _parse(e) {
      return R(e.data);
    }
  };
  V.create = (t) => new V({ typeName: m.ZodUnknown, ...g(t) });
  var Z = class extends b {
    _parse(e) {
      let r = this._getOrReturnCtx(e);
      return (
        l(r, {
          code: d.invalid_type,
          expected: p.never,
          received: r.parsedType,
        }),
        v
      );
    }
  };
  Z.create = (t) => new Z({ typeName: m.ZodNever, ...g(t) });
  var pe = class extends b {
    _parse(e) {
      if (this._getType(e) !== p.undefined) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.void,
            received: n.parsedType,
          }),
          v
        );
      }
      return R(e.data);
    }
  };
  pe.create = (t) => new pe({ typeName: m.ZodVoid, ...g(t) });
  var D = class t extends b {
    _parse(e) {
      let { ctx: r, status: n } = this._processInputParams(e),
        s = this._def;
      if (r.parsedType !== p.array)
        return (
          l(r, {
            code: d.invalid_type,
            expected: p.array,
            received: r.parsedType,
          }),
          v
        );
      if (s.exactLength !== null) {
        let i = r.data.length > s.exactLength.value,
          o = r.data.length < s.exactLength.value;
        (i || o) &&
          (l(r, {
            code: i ? d.too_big : d.too_small,
            minimum: o ? s.exactLength.value : void 0,
            maximum: i ? s.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: s.exactLength.message,
          }),
          n.dirty());
      }
      if (
        (s.minLength !== null &&
          r.data.length < s.minLength.value &&
          (l(r, {
            code: d.too_small,
            minimum: s.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.minLength.message,
          }),
          n.dirty()),
        s.maxLength !== null &&
          r.data.length > s.maxLength.value &&
          (l(r, {
            code: d.too_big,
            maximum: s.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.maxLength.message,
          }),
          n.dirty()),
        r.common.async)
      )
        return Promise.all(
          [...r.data].map((i, o) => s.type._parseAsync(new M(r, i, r.path, o))),
        ).then((i) => T.mergeArray(n, i));
      let a = [...r.data].map((i, o) =>
        s.type._parseSync(new M(r, i, r.path, o)),
      );
      return T.mergeArray(n, a);
    }
    get element() {
      return this._def.type;
    }
    min(e, r) {
      return new t({
        ...this._def,
        minLength: { value: e, message: h.toString(r) },
      });
    }
    max(e, r) {
      return new t({
        ...this._def,
        maxLength: { value: e, message: h.toString(r) },
      });
    }
    length(e, r) {
      return new t({
        ...this._def,
        exactLength: { value: e, message: h.toString(r) },
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  D.create = (t, e) =>
    new D({
      type: t,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: m.ZodArray,
      ...g(e),
    });
  function ue(t) {
    if (t instanceof P) {
      let e = {};
      for (let r in t.shape) {
        let n = t.shape[r];
        e[r] = A.create(ue(n));
      }
      return new P({ ...t._def, shape: () => e });
    } else
      return t instanceof D
        ? new D({ ...t._def, type: ue(t.element) })
        : t instanceof A
          ? A.create(ue(t.unwrap()))
          : t instanceof L
            ? L.create(ue(t.unwrap()))
            : t instanceof I
              ? I.create(t.items.map((e) => ue(e)))
              : t;
  }
  var P = class t extends b {
    constructor() {
      super(...arguments),
        (this._cached = null),
        (this.nonstrict = this.passthrough),
        (this.augment = this.extend);
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      let e = this._def.shape(),
        r = x.objectKeys(e);
      return (this._cached = { shape: e, keys: r });
    }
    _parse(e) {
      if (this._getType(e) !== p.object) {
        let u = this._getOrReturnCtx(e);
        return (
          l(u, {
            code: d.invalid_type,
            expected: p.object,
            received: u.parsedType,
          }),
          v
        );
      }
      let { status: n, ctx: s } = this._processInputParams(e),
        { shape: a, keys: i } = this._getCached(),
        o = [];
      if (
        !(this._def.catchall instanceof Z && this._def.unknownKeys === "strip")
      )
        for (let u in s.data) i.includes(u) || o.push(u);
      let c = [];
      for (let u of i) {
        let f = a[u],
          y = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: f._parse(new M(s, y, s.path, u)),
          alwaysSet: u in s.data,
        });
      }
      if (this._def.catchall instanceof Z) {
        let u = this._def.unknownKeys;
        if (u === "passthrough")
          for (let f of o)
            c.push({
              key: { status: "valid", value: f },
              value: { status: "valid", value: s.data[f] },
            });
        else if (u === "strict")
          o.length > 0 &&
            (l(s, { code: d.unrecognized_keys, keys: o }), n.dirty());
        else if (u !== "strip")
          throw new Error(
            "Internal ZodObject error: invalid unknownKeys value.",
          );
      } else {
        let u = this._def.catchall;
        for (let f of o) {
          let y = s.data[f];
          c.push({
            key: { status: "valid", value: f },
            value: u._parse(new M(s, y, s.path, f)),
            alwaysSet: f in s.data,
          });
        }
      }
      return s.common.async
        ? Promise.resolve()
            .then(async () => {
              let u = [];
              for (let f of c) {
                let y = await f.key,
                  w = await f.value;
                u.push({ key: y, value: w, alwaysSet: f.alwaysSet });
              }
              return u;
            })
            .then((u) => T.mergeObjectSync(n, u))
        : T.mergeObjectSync(n, c);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return (
        h.errToObj,
        new t({
          ...this._def,
          unknownKeys: "strict",
          ...(e !== void 0
            ? {
                errorMap: (r, n) => {
                  var s, a, i, o;
                  let c =
                    (i =
                      (a = (s = this._def).errorMap) === null || a === void 0
                        ? void 0
                        : a.call(s, r, n).message) !== null && i !== void 0
                      ? i
                      : n.defaultError;
                  return r.code === "unrecognized_keys"
                    ? {
                        message:
                          (o = h.errToObj(e).message) !== null && o !== void 0
                            ? o
                            : c,
                      }
                    : { message: c };
                },
              }
            : {}),
        })
      );
    }
    strip() {
      return new t({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new t({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(e) {
      return new t({
        ...this._def,
        shape: () => ({ ...this._def.shape(), ...e }),
      });
    }
    merge(e) {
      return new t({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
        typeName: m.ZodObject,
      });
    }
    setKey(e, r) {
      return this.augment({ [e]: r });
    }
    catchall(e) {
      return new t({ ...this._def, catchall: e });
    }
    pick(e) {
      let r = {};
      return (
        x.objectKeys(e).forEach((n) => {
          e[n] && this.shape[n] && (r[n] = this.shape[n]);
        }),
        new t({ ...this._def, shape: () => r })
      );
    }
    omit(e) {
      let r = {};
      return (
        x.objectKeys(this.shape).forEach((n) => {
          e[n] || (r[n] = this.shape[n]);
        }),
        new t({ ...this._def, shape: () => r })
      );
    }
    deepPartial() {
      return ue(this);
    }
    partial(e) {
      let r = {};
      return (
        x.objectKeys(this.shape).forEach((n) => {
          let s = this.shape[n];
          e && !e[n] ? (r[n] = s) : (r[n] = s.optional());
        }),
        new t({ ...this._def, shape: () => r })
      );
    }
    required(e) {
      let r = {};
      return (
        x.objectKeys(this.shape).forEach((n) => {
          if (e && !e[n]) r[n] = this.shape[n];
          else {
            let a = this.shape[n];
            for (; a instanceof A; ) a = a._def.innerType;
            r[n] = a;
          }
        }),
        new t({ ...this._def, shape: () => r })
      );
    }
    keyof() {
      return Ft(x.objectKeys(this.shape));
    }
  };
  P.create = (t, e) =>
    new P({
      shape: () => t,
      unknownKeys: "strip",
      catchall: Z.create(),
      typeName: m.ZodObject,
      ...g(e),
    });
  P.strictCreate = (t, e) =>
    new P({
      shape: () => t,
      unknownKeys: "strict",
      catchall: Z.create(),
      typeName: m.ZodObject,
      ...g(e),
    });
  P.lazycreate = (t, e) =>
    new P({
      shape: t,
      unknownKeys: "strip",
      catchall: Z.create(),
      typeName: m.ZodObject,
      ...g(e),
    });
  var Q = class extends b {
    _parse(e) {
      let { ctx: r } = this._processInputParams(e),
        n = this._def.options;
      function s(a) {
        for (let o of a) if (o.result.status === "valid") return o.result;
        for (let o of a)
          if (o.result.status === "dirty")
            return r.common.issues.push(...o.ctx.common.issues), o.result;
        let i = a.map((o) => new C(o.ctx.common.issues));
        return l(r, { code: d.invalid_union, unionErrors: i }), v;
      }
      if (r.common.async)
        return Promise.all(
          n.map(async (a) => {
            let i = { ...r, common: { ...r.common, issues: [] }, parent: null };
            return {
              result: await a._parseAsync({
                data: r.data,
                path: r.path,
                parent: i,
              }),
              ctx: i,
            };
          }),
        ).then(s);
      {
        let a,
          i = [];
        for (let c of n) {
          let u = { ...r, common: { ...r.common, issues: [] }, parent: null },
            f = c._parseSync({ data: r.data, path: r.path, parent: u });
          if (f.status === "valid") return f;
          f.status === "dirty" && !a && (a = { result: f, ctx: u }),
            u.common.issues.length && i.push(u.common.issues);
        }
        if (a) return r.common.issues.push(...a.ctx.common.issues), a.result;
        let o = i.map((c) => new C(c));
        return l(r, { code: d.invalid_union, unionErrors: o }), v;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  Q.create = (t, e) => new Q({ options: t, typeName: m.ZodUnion, ...g(e) });
  var $ = (t) =>
      t instanceof te
        ? $(t.schema)
        : t instanceof N
          ? $(t.innerType())
          : t instanceof re
            ? [t.value]
            : t instanceof ne
              ? t.options
              : t instanceof se
                ? x.objectValues(t.enum)
                : t instanceof ae
                  ? $(t._def.innerType)
                  : t instanceof K
                    ? [void 0]
                    : t instanceof X
                      ? [null]
                      : t instanceof A
                        ? [void 0, ...$(t.unwrap())]
                        : t instanceof L
                          ? [null, ...$(t.unwrap())]
                          : t instanceof Ie || t instanceof oe
                            ? $(t.unwrap())
                            : t instanceof ie
                              ? $(t._def.innerType)
                              : [],
    rt = class t extends b {
      _parse(e) {
        let { ctx: r } = this._processInputParams(e);
        if (r.parsedType !== p.object)
          return (
            l(r, {
              code: d.invalid_type,
              expected: p.object,
              received: r.parsedType,
            }),
            v
          );
        let n = this.discriminator,
          s = r.data[n],
          a = this.optionsMap.get(s);
        return a
          ? r.common.async
            ? a._parseAsync({ data: r.data, path: r.path, parent: r })
            : a._parseSync({ data: r.data, path: r.path, parent: r })
          : (l(r, {
              code: d.invalid_union_discriminator,
              options: Array.from(this.optionsMap.keys()),
              path: [n],
            }),
            v);
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      static create(e, r, n) {
        let s = new Map();
        for (let a of r) {
          let i = $(a.shape[e]);
          if (!i.length)
            throw new Error(
              `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
            );
          for (let o of i) {
            if (s.has(o))
              throw new Error(
                `Discriminator property ${String(e)} has duplicate value ${String(o)}`,
              );
            s.set(o, a);
          }
        }
        return new t({
          typeName: m.ZodDiscriminatedUnion,
          discriminator: e,
          options: r,
          optionsMap: s,
          ...g(n),
        });
      }
    };
  function mt(t, e) {
    let r = B(t),
      n = B(e);
    if (t === e) return { valid: !0, data: t };
    if (r === p.object && n === p.object) {
      let s = x.objectKeys(e),
        a = x.objectKeys(t).filter((o) => s.indexOf(o) !== -1),
        i = { ...t, ...e };
      for (let o of a) {
        let c = mt(t[o], e[o]);
        if (!c.valid) return { valid: !1 };
        i[o] = c.data;
      }
      return { valid: !0, data: i };
    } else if (r === p.array && n === p.array) {
      if (t.length !== e.length) return { valid: !1 };
      let s = [];
      for (let a = 0; a < t.length; a++) {
        let i = t[a],
          o = e[a],
          c = mt(i, o);
        if (!c.valid) return { valid: !1 };
        s.push(c.data);
      }
      return { valid: !0, data: s };
    } else
      return r === p.date && n === p.date && +t == +e
        ? { valid: !0, data: t }
        : { valid: !1 };
  }
  var ee = class extends b {
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e),
        s = (a, i) => {
          if (pt(a) || pt(i)) return v;
          let o = mt(a.value, i.value);
          return o.valid
            ? ((ht(a) || ht(i)) && r.dirty(),
              { status: r.value, value: o.data })
            : (l(n, { code: d.invalid_intersection_types }), v);
        };
      return n.common.async
        ? Promise.all([
            this._def.left._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
          ]).then(([a, i]) => s(a, i))
        : s(
            this._def.left._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
          );
    }
  };
  ee.create = (t, e, r) =>
    new ee({ left: t, right: e, typeName: m.ZodIntersection, ...g(r) });
  var I = class t extends b {
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== p.array)
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.array,
            received: n.parsedType,
          }),
          v
        );
      if (n.data.length < this._def.items.length)
        return (
          l(n, {
            code: d.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          v
        );
      !this._def.rest &&
        n.data.length > this._def.items.length &&
        (l(n, {
          code: d.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        r.dirty());
      let a = [...n.data]
        .map((i, o) => {
          let c = this._def.items[o] || this._def.rest;
          return c ? c._parse(new M(n, i, n.path, o)) : null;
        })
        .filter((i) => !!i);
      return n.common.async
        ? Promise.all(a).then((i) => T.mergeArray(r, i))
        : T.mergeArray(r, a);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new t({ ...this._def, rest: e });
    }
  };
  I.create = (t, e) => {
    if (!Array.isArray(t))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new I({ items: t, typeName: m.ZodTuple, rest: null, ...g(e) });
  };
  var nt = class t extends b {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(e) {
        let { status: r, ctx: n } = this._processInputParams(e);
        if (n.parsedType !== p.object)
          return (
            l(n, {
              code: d.invalid_type,
              expected: p.object,
              received: n.parsedType,
            }),
            v
          );
        let s = [],
          a = this._def.keyType,
          i = this._def.valueType;
        for (let o in n.data)
          s.push({
            key: a._parse(new M(n, o, n.path, o)),
            value: i._parse(new M(n, n.data[o], n.path, o)),
            alwaysSet: o in n.data,
          });
        return n.common.async
          ? T.mergeObjectAsync(r, s)
          : T.mergeObjectSync(r, s);
      }
      get element() {
        return this._def.valueType;
      }
      static create(e, r, n) {
        return r instanceof b
          ? new t({ keyType: e, valueType: r, typeName: m.ZodRecord, ...g(n) })
          : new t({
              keyType: U.create(),
              valueType: e,
              typeName: m.ZodRecord,
              ...g(r),
            });
      }
    },
    he = class extends b {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(e) {
        let { status: r, ctx: n } = this._processInputParams(e);
        if (n.parsedType !== p.map)
          return (
            l(n, {
              code: d.invalid_type,
              expected: p.map,
              received: n.parsedType,
            }),
            v
          );
        let s = this._def.keyType,
          a = this._def.valueType,
          i = [...n.data.entries()].map(([o, c], u) => ({
            key: s._parse(new M(n, o, n.path, [u, "key"])),
            value: a._parse(new M(n, c, n.path, [u, "value"])),
          }));
        if (n.common.async) {
          let o = new Map();
          return Promise.resolve().then(async () => {
            for (let c of i) {
              let u = await c.key,
                f = await c.value;
              if (u.status === "aborted" || f.status === "aborted") return v;
              (u.status === "dirty" || f.status === "dirty") && r.dirty(),
                o.set(u.value, f.value);
            }
            return { status: r.value, value: o };
          });
        } else {
          let o = new Map();
          for (let c of i) {
            let u = c.key,
              f = c.value;
            if (u.status === "aborted" || f.status === "aborted") return v;
            (u.status === "dirty" || f.status === "dirty") && r.dirty(),
              o.set(u.value, f.value);
          }
          return { status: r.value, value: o };
        }
      }
    };
  he.create = (t, e, r) =>
    new he({ valueType: e, keyType: t, typeName: m.ZodMap, ...g(r) });
  var me = class t extends b {
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== p.set)
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.set,
            received: n.parsedType,
          }),
          v
        );
      let s = this._def;
      s.minSize !== null &&
        n.data.size < s.minSize.value &&
        (l(n, {
          code: d.too_small,
          minimum: s.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: s.minSize.message,
        }),
        r.dirty()),
        s.maxSize !== null &&
          n.data.size > s.maxSize.value &&
          (l(n, {
            code: d.too_big,
            maximum: s.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.maxSize.message,
          }),
          r.dirty());
      let a = this._def.valueType;
      function i(c) {
        let u = new Set();
        for (let f of c) {
          if (f.status === "aborted") return v;
          f.status === "dirty" && r.dirty(), u.add(f.value);
        }
        return { status: r.value, value: u };
      }
      let o = [...n.data.values()].map((c, u) =>
        a._parse(new M(n, c, n.path, u)),
      );
      return n.common.async ? Promise.all(o).then((c) => i(c)) : i(o);
    }
    min(e, r) {
      return new t({
        ...this._def,
        minSize: { value: e, message: h.toString(r) },
      });
    }
    max(e, r) {
      return new t({
        ...this._def,
        maxSize: { value: e, message: h.toString(r) },
      });
    }
    size(e, r) {
      return this.min(e, r).max(e, r);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  me.create = (t, e) =>
    new me({
      valueType: t,
      minSize: null,
      maxSize: null,
      typeName: m.ZodSet,
      ...g(e),
    });
  var st = class t extends b {
      constructor() {
        super(...arguments), (this.validate = this.implement);
      }
      _parse(e) {
        let { ctx: r } = this._processInputParams(e);
        if (r.parsedType !== p.function)
          return (
            l(r, {
              code: d.invalid_type,
              expected: p.function,
              received: r.parsedType,
            }),
            v
          );
        function n(o, c) {
          return et({
            data: o,
            path: r.path,
            errorMaps: [
              r.common.contextualErrorMap,
              r.schemaErrorMap,
              Qe(),
              le,
            ].filter((u) => !!u),
            issueData: { code: d.invalid_arguments, argumentsError: c },
          });
        }
        function s(o, c) {
          return et({
            data: o,
            path: r.path,
            errorMaps: [
              r.common.contextualErrorMap,
              r.schemaErrorMap,
              Qe(),
              le,
            ].filter((u) => !!u),
            issueData: { code: d.invalid_return_type, returnTypeError: c },
          });
        }
        let a = { errorMap: r.common.contextualErrorMap },
          i = r.data;
        if (this._def.returns instanceof W) {
          let o = this;
          return R(async function (...c) {
            let u = new C([]),
              f = await o._def.args.parseAsync(c, a).catch((E) => {
                throw (u.addIssue(n(c, E)), u);
              }),
              y = await Reflect.apply(i, this, f);
            return await o._def.returns._def.type
              .parseAsync(y, a)
              .catch((E) => {
                throw (u.addIssue(s(y, E)), u);
              });
          });
        } else {
          let o = this;
          return R(function (...c) {
            let u = o._def.args.safeParse(c, a);
            if (!u.success) throw new C([n(c, u.error)]);
            let f = Reflect.apply(i, this, u.data),
              y = o._def.returns.safeParse(f, a);
            if (!y.success) throw new C([s(f, y.error)]);
            return y.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...e) {
        return new t({ ...this._def, args: I.create(e).rest(V.create()) });
      }
      returns(e) {
        return new t({ ...this._def, returns: e });
      }
      implement(e) {
        return this.parse(e);
      }
      strictImplement(e) {
        return this.parse(e);
      }
      static create(e, r, n) {
        return new t({
          args: e || I.create([]).rest(V.create()),
          returns: r || V.create(),
          typeName: m.ZodFunction,
          ...g(n),
        });
      }
    },
    te = class extends b {
      get schema() {
        return this._def.getter();
      }
      _parse(e) {
        let { ctx: r } = this._processInputParams(e);
        return this._def
          .getter()
          ._parse({ data: r.data, path: r.path, parent: r });
      }
    };
  te.create = (t, e) => new te({ getter: t, typeName: m.ZodLazy, ...g(e) });
  var re = class extends b {
    _parse(e) {
      if (e.data !== this._def.value) {
        let r = this._getOrReturnCtx(e);
        return (
          l(r, {
            received: r.data,
            code: d.invalid_literal,
            expected: this._def.value,
          }),
          v
        );
      }
      return { status: "valid", value: e.data };
    }
    get value() {
      return this._def.value;
    }
  };
  re.create = (t, e) => new re({ value: t, typeName: m.ZodLiteral, ...g(e) });
  function Ft(t, e) {
    return new ne({ values: t, typeName: m.ZodEnum, ...g(e) });
  }
  var ne = class t extends b {
    constructor() {
      super(...arguments), Ne.set(this, void 0);
    }
    _parse(e) {
      if (typeof e.data != "string") {
        let r = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          l(r, {
            expected: x.joinValues(n),
            received: r.parsedType,
            code: d.invalid_type,
          }),
          v
        );
      }
      if (
        (tt(this, Ne, "f") || Ut(this, Ne, new Set(this._def.values), "f"),
        !tt(this, Ne, "f").has(e.data))
      ) {
        let r = this._getOrReturnCtx(e),
          n = this._def.values;
        return (
          l(r, { received: r.data, code: d.invalid_enum_value, options: n }), v
        );
      }
      return R(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e = {};
      for (let r of this._def.values) e[r] = r;
      return e;
    }
    get Values() {
      let e = {};
      for (let r of this._def.values) e[r] = r;
      return e;
    }
    get Enum() {
      let e = {};
      for (let r of this._def.values) e[r] = r;
      return e;
    }
    extract(e, r = this._def) {
      return t.create(e, { ...this._def, ...r });
    }
    exclude(e, r = this._def) {
      return t.create(
        this.options.filter((n) => !e.includes(n)),
        { ...this._def, ...r },
      );
    }
  };
  Ne = new WeakMap();
  ne.create = Ft;
  var se = class extends b {
    constructor() {
      super(...arguments), Ae.set(this, void 0);
    }
    _parse(e) {
      let r = x.getValidEnumValues(this._def.values),
        n = this._getOrReturnCtx(e);
      if (n.parsedType !== p.string && n.parsedType !== p.number) {
        let s = x.objectValues(r);
        return (
          l(n, {
            expected: x.joinValues(s),
            received: n.parsedType,
            code: d.invalid_type,
          }),
          v
        );
      }
      if (
        (tt(this, Ae, "f") ||
          Ut(this, Ae, new Set(x.getValidEnumValues(this._def.values)), "f"),
        !tt(this, Ae, "f").has(e.data))
      ) {
        let s = x.objectValues(r);
        return (
          l(n, { received: n.data, code: d.invalid_enum_value, options: s }), v
        );
      }
      return R(e.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  Ae = new WeakMap();
  se.create = (t, e) =>
    new se({ values: t, typeName: m.ZodNativeEnum, ...g(e) });
  var W = class extends b {
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== p.promise && r.common.async === !1)
        return (
          l(r, {
            code: d.invalid_type,
            expected: p.promise,
            received: r.parsedType,
          }),
          v
        );
      let n = r.parsedType === p.promise ? r.data : Promise.resolve(r.data);
      return R(
        n.then((s) =>
          this._def.type.parseAsync(s, {
            path: r.path,
            errorMap: r.common.contextualErrorMap,
          }),
        ),
      );
    }
  };
  W.create = (t, e) => new W({ type: t, typeName: m.ZodPromise, ...g(e) });
  var N = class extends b {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === m.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e),
        s = this._def.effect || null,
        a = {
          addIssue: (i) => {
            l(n, i), i.fatal ? r.abort() : r.dirty();
          },
          get path() {
            return n.path;
          },
        };
      if (((a.addIssue = a.addIssue.bind(a)), s.type === "preprocess")) {
        let i = s.transform(n.data, a);
        if (n.common.async)
          return Promise.resolve(i).then(async (o) => {
            if (r.value === "aborted") return v;
            let c = await this._def.schema._parseAsync({
              data: o,
              path: n.path,
              parent: n,
            });
            return c.status === "aborted"
              ? v
              : c.status === "dirty" || r.value === "dirty"
                ? de(c.value)
                : c;
          });
        {
          if (r.value === "aborted") return v;
          let o = this._def.schema._parseSync({
            data: i,
            path: n.path,
            parent: n,
          });
          return o.status === "aborted"
            ? v
            : o.status === "dirty" || r.value === "dirty"
              ? de(o.value)
              : o;
        }
      }
      if (s.type === "refinement") {
        let i = (o) => {
          let c = s.refinement(o, a);
          if (n.common.async) return Promise.resolve(c);
          if (c instanceof Promise)
            throw new Error(
              "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
            );
          return o;
        };
        if (n.common.async === !1) {
          let o = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return o.status === "aborted"
            ? v
            : (o.status === "dirty" && r.dirty(),
              i(o.value),
              { status: r.value, value: o.value });
        } else
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((o) =>
              o.status === "aborted"
                ? v
                : (o.status === "dirty" && r.dirty(),
                  i(o.value).then(() => ({ status: r.value, value: o.value }))),
            );
      }
      if (s.type === "transform")
        if (n.common.async === !1) {
          let i = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          if (!Me(i)) return i;
          let o = s.transform(i.value, a);
          if (o instanceof Promise)
            throw new Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
            );
          return { status: r.value, value: o };
        } else
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((i) =>
              Me(i)
                ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
                    status: r.value,
                    value: o,
                  }))
                : i,
            );
      x.assertNever(s);
    }
  };
  N.create = (t, e, r) =>
    new N({ schema: t, typeName: m.ZodEffects, effect: e, ...g(r) });
  N.createWithPreprocess = (t, e, r) =>
    new N({
      schema: e,
      effect: { type: "preprocess", transform: t },
      typeName: m.ZodEffects,
      ...g(r),
    });
  var A = class extends b {
    _parse(e) {
      return this._getType(e) === p.undefined
        ? R(void 0)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  A.create = (t, e) =>
    new A({ innerType: t, typeName: m.ZodOptional, ...g(e) });
  var L = class extends b {
    _parse(e) {
      return this._getType(e) === p.null
        ? R(null)
        : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  L.create = (t, e) =>
    new L({ innerType: t, typeName: m.ZodNullable, ...g(e) });
  var ae = class extends b {
    _parse(e) {
      let { ctx: r } = this._processInputParams(e),
        n = r.data;
      return (
        r.parsedType === p.undefined && (n = this._def.defaultValue()),
        this._def.innerType._parse({ data: n, path: r.path, parent: r })
      );
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ae.create = (t, e) =>
    new ae({
      innerType: t,
      typeName: m.ZodDefault,
      defaultValue:
        typeof e.default == "function" ? e.default : () => e.default,
      ...g(e),
    });
  var ie = class extends b {
    _parse(e) {
      let { ctx: r } = this._processInputParams(e),
        n = { ...r, common: { ...r.common, issues: [] } },
        s = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: { ...n },
        });
      return Ze(s)
        ? s.then((a) => ({
            status: "valid",
            value:
              a.status === "valid"
                ? a.value
                : this._def.catchValue({
                    get error() {
                      return new C(n.common.issues);
                    },
                    input: n.data,
                  }),
          }))
        : {
            status: "valid",
            value:
              s.status === "valid"
                ? s.value
                : this._def.catchValue({
                    get error() {
                      return new C(n.common.issues);
                    },
                    input: n.data,
                  }),
          };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  ie.create = (t, e) =>
    new ie({
      innerType: t,
      typeName: m.ZodCatch,
      catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
      ...g(e),
    });
  var ve = class extends b {
    _parse(e) {
      if (this._getType(e) !== p.nan) {
        let n = this._getOrReturnCtx(e);
        return (
          l(n, {
            code: d.invalid_type,
            expected: p.nan,
            received: n.parsedType,
          }),
          v
        );
      }
      return { status: "valid", value: e.data };
    }
  };
  ve.create = (t) => new ve({ typeName: m.ZodNaN, ...g(t) });
  var Yr = Symbol("zod_brand"),
    Ie = class extends b {
      _parse(e) {
        let { ctx: r } = this._processInputParams(e),
          n = r.data;
        return this._def.type._parse({ data: n, path: r.path, parent: r });
      }
      unwrap() {
        return this._def.type;
      }
    },
    Le = class t extends b {
      _parse(e) {
        let { status: r, ctx: n } = this._processInputParams(e);
        if (n.common.async)
          return (async () => {
            let a = await this._def.in._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            });
            return a.status === "aborted"
              ? v
              : a.status === "dirty"
                ? (r.dirty(), de(a.value))
                : this._def.out._parseAsync({
                    data: a.value,
                    path: n.path,
                    parent: n,
                  });
          })();
        {
          let s = this._def.in._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return s.status === "aborted"
            ? v
            : s.status === "dirty"
              ? (r.dirty(), { status: "dirty", value: s.value })
              : this._def.out._parseSync({
                  data: s.value,
                  path: n.path,
                  parent: n,
                });
        }
      }
      static create(e, r) {
        return new t({ in: e, out: r, typeName: m.ZodPipeline });
      }
    },
    oe = class extends b {
      _parse(e) {
        let r = this._def.innerType._parse(e),
          n = (s) => (Me(s) && (s.value = Object.freeze(s.value)), s);
        return Ze(r) ? r.then((s) => n(s)) : n(r);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
  oe.create = (t, e) =>
    new oe({ innerType: t, typeName: m.ZodReadonly, ...g(e) });
  function Jt(t, e = {}, r) {
    return t
      ? q.create().superRefine((n, s) => {
          var a, i;
          if (!t(n)) {
            let o =
                typeof e == "function"
                  ? e(n)
                  : typeof e == "string"
                    ? { message: e }
                    : e,
              c =
                (i = (a = o.fatal) !== null && a !== void 0 ? a : r) !== null &&
                i !== void 0
                  ? i
                  : !0,
              u = typeof o == "string" ? { message: o } : o;
            s.addIssue({ code: "custom", ...u, fatal: c });
          }
        })
      : q.create();
  }
  var Gr = { object: P.lazycreate },
    m;
  (function (t) {
    (t.ZodString = "ZodString"),
      (t.ZodNumber = "ZodNumber"),
      (t.ZodNaN = "ZodNaN"),
      (t.ZodBigInt = "ZodBigInt"),
      (t.ZodBoolean = "ZodBoolean"),
      (t.ZodDate = "ZodDate"),
      (t.ZodSymbol = "ZodSymbol"),
      (t.ZodUndefined = "ZodUndefined"),
      (t.ZodNull = "ZodNull"),
      (t.ZodAny = "ZodAny"),
      (t.ZodUnknown = "ZodUnknown"),
      (t.ZodNever = "ZodNever"),
      (t.ZodVoid = "ZodVoid"),
      (t.ZodArray = "ZodArray"),
      (t.ZodObject = "ZodObject"),
      (t.ZodUnion = "ZodUnion"),
      (t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
      (t.ZodIntersection = "ZodIntersection"),
      (t.ZodTuple = "ZodTuple"),
      (t.ZodRecord = "ZodRecord"),
      (t.ZodMap = "ZodMap"),
      (t.ZodSet = "ZodSet"),
      (t.ZodFunction = "ZodFunction"),
      (t.ZodLazy = "ZodLazy"),
      (t.ZodLiteral = "ZodLiteral"),
      (t.ZodEnum = "ZodEnum"),
      (t.ZodEffects = "ZodEffects"),
      (t.ZodNativeEnum = "ZodNativeEnum"),
      (t.ZodOptional = "ZodOptional"),
      (t.ZodNullable = "ZodNullable"),
      (t.ZodDefault = "ZodDefault"),
      (t.ZodCatch = "ZodCatch"),
      (t.ZodPromise = "ZodPromise"),
      (t.ZodBranded = "ZodBranded"),
      (t.ZodPipeline = "ZodPipeline"),
      (t.ZodReadonly = "ZodReadonly");
  })(m || (m = {}));
  var Kr = (t, e = { message: `Input not instance of ${t.name}` }) =>
      Jt((r) => r instanceof t, e),
    Yt = U.create,
    Gt = F.create,
    Xr = ve.create,
    Qr = J.create,
    Kt = Y.create,
    en = G.create,
    tn = fe.create,
    rn = K.create,
    nn = X.create,
    sn = q.create,
    an = V.create,
    on = Z.create,
    cn = pe.create,
    un = D.create,
    dn = P.create,
    ln = P.strictCreate,
    fn = Q.create,
    pn = rt.create,
    hn = ee.create,
    mn = I.create,
    vn = nt.create,
    yn = he.create,
    gn = me.create,
    bn = st.create,
    _n = te.create,
    xn = re.create,
    wn = ne.create,
    kn = se.create,
    Tn = W.create,
    zt = N.create,
    En = A.create,
    On = L.create,
    jn = N.createWithPreprocess,
    Rn = Le.create,
    Sn = () => Yt().optional(),
    Pn = () => Gt().optional(),
    Cn = () => Kt().optional(),
    Nn = {
      string: (t) => U.create({ ...t, coerce: !0 }),
      number: (t) => F.create({ ...t, coerce: !0 }),
      boolean: (t) => Y.create({ ...t, coerce: !0 }),
      bigint: (t) => J.create({ ...t, coerce: !0 }),
      date: (t) => G.create({ ...t, coerce: !0 }),
    },
    An = v,
    _ = Object.freeze({
      __proto__: null,
      defaultErrorMap: le,
      setErrorMap: Nr,
      getErrorMap: Qe,
      makeIssue: et,
      EMPTY_PATH: Ar,
      addIssueToContext: l,
      ParseStatus: T,
      INVALID: v,
      DIRTY: de,
      OK: R,
      isAborted: pt,
      isDirty: ht,
      isValid: Me,
      isAsync: Ze,
      get util() {
        return x;
      },
      get objectUtil() {
        return ft;
      },
      ZodParsedType: p,
      getParsedType: B,
      ZodType: b,
      datetimeRegex: Ht,
      ZodString: U,
      ZodNumber: F,
      ZodBigInt: J,
      ZodBoolean: Y,
      ZodDate: G,
      ZodSymbol: fe,
      ZodUndefined: K,
      ZodNull: X,
      ZodAny: q,
      ZodUnknown: V,
      ZodNever: Z,
      ZodVoid: pe,
      ZodArray: D,
      ZodObject: P,
      ZodUnion: Q,
      ZodDiscriminatedUnion: rt,
      ZodIntersection: ee,
      ZodTuple: I,
      ZodRecord: nt,
      ZodMap: he,
      ZodSet: me,
      ZodFunction: st,
      ZodLazy: te,
      ZodLiteral: re,
      ZodEnum: ne,
      ZodNativeEnum: se,
      ZodPromise: W,
      ZodEffects: N,
      ZodTransformer: N,
      ZodOptional: A,
      ZodNullable: L,
      ZodDefault: ae,
      ZodCatch: ie,
      ZodNaN: ve,
      BRAND: Yr,
      ZodBranded: Ie,
      ZodPipeline: Le,
      ZodReadonly: oe,
      custom: Jt,
      Schema: b,
      ZodSchema: b,
      late: Gr,
      get ZodFirstPartyTypeKind() {
        return m;
      },
      coerce: Nn,
      any: sn,
      array: un,
      bigint: Qr,
      boolean: Kt,
      date: en,
      discriminatedUnion: pn,
      effect: zt,
      enum: wn,
      function: bn,
      instanceof: Kr,
      intersection: hn,
      lazy: _n,
      literal: xn,
      map: yn,
      nan: Xr,
      nativeEnum: kn,
      never: on,
      null: nn,
      nullable: On,
      number: Gt,
      object: dn,
      oboolean: Cn,
      onumber: Pn,
      optional: En,
      ostring: Sn,
      pipeline: Rn,
      preprocess: jn,
      promise: Tn,
      record: vn,
      set: gn,
      strictObject: ln,
      string: Yt,
      symbol: tn,
      transformer: zt,
      tuple: mn,
      undefined: rn,
      union: fn,
      unknown: an,
      void: cn,
      NEVER: An,
      ZodIssueCode: d,
      quotelessJson: Cr,
      ZodError: C,
    });
  var vt = _.object({ url: _.string(), token: _.string() }),
    Mn = _.object({
      header: _.string(),
      payload: _.string(),
      signature: _.string(),
    }),
    Zn = _.object({
      fid: _.number(),
      type: _.literal("app_key"),
      key: _.string().startsWith("0x"),
    }),
    Xt = _.object({
      event: _.literal("frame-added"),
      notificationDetails: vt.optional(),
    }),
    Qt = _.object({ event: _.literal("frame-removed") }),
    er = _.object({
      event: _.literal("notifications-enabled"),
      notificationDetails: vt.required(),
    }),
    tr = _.object({ event: _.literal("notifications-disabled") }),
    In = _.discriminatedUnion("event", [Xt, Qt, er, tr]),
    Ln = _.object({
      notificationId: _.string().uuid(),
      title: _.string().max(32),
      body: _.string().max(128),
      targetUrl: _.string().max(256),
      tokens: _.string().array().max(100),
    }),
    $n = _.object({
      result: _.object({
        successfulTokens: _.array(_.string()),
        invalidTokens: _.array(_.string()),
        rateLimitedTokens: _.array(_.string()),
      }),
    });
  var Vn = dt;
  return ur(Dn);
})();
/*! Bundled license information:

comlink/dist/esm/comlink.mjs:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=index.min.js.map
