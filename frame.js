const main = () => {
  // Get UI elements
  const statusDiv = document.getElementById("status");
  const contextDiv = document.getElementById("contextData");
  const buttons = ["contextBtn", "urlBtn", "closeBtn", "testBtn"].map((id) =>
    document.getElementById(id),
  );

  let isSDKLoaded = false;

  // Enable all buttons
  function enableButtons() {
    buttons.forEach((btn) => (btn.disabled = false));
  }

  // Initialize frame
  async function init() {
    try {
      await frame.actions.ready();
      isSDKLoaded = true;
      statusDiv.innerText = "Frame is ready!";
      enableButtons();

      // Set up button click listener
      frame.on("primaryButtonClicked", () => {
        statusDiv.innerText = "Primary button was clicked!";
      });
    } catch (error) {
      statusDiv.innerText = "Error initializing frame: " + error.message;
    }
  }

  // Get and display frame context
  async function getContext() {
    if (!isSDKLoaded) return;
    try {
      const context = await frame.context;
      contextDiv.innerHTML = `
                    <h3>Frame Context:</h3>
                    <pre>${JSON.stringify(context, null, 2)}</pre>
                `;
    } catch (error) {
      statusDiv.innerText = "Error getting context: " + error.message;
    }
  }

  // Open external URL
  function openUrl() {
    if (!isSDKLoaded) return;
    try {
      frame.actions.openUrl("https://www.farcaster.xyz");
      statusDiv.innerText = "Opening URL...";
    } catch (error) {
      statusDiv.innerText = "Error opening URL: " + error.message;
    }
  }

  // Close the frame
  function closeFrame() {
    if (!isSDKLoaded) return;
    try {
      frame.actions.close();
      statusDiv.innerText = "Closing frame...";
    } catch (error) {
      statusDiv.innerText = "Error closing frame: " + error.message;
    }
  }

  // Test the primary button functionality
  function testPrimaryButton() {
    if (!isSDKLoaded) return;
    try {
      frame.actions.setPrimaryButton({
        text: "Click Me!",
        loading: false,
        disabled: false,
      });
      statusDiv.innerText = "Primary button set - try clicking it!";
    } catch (error) {
      statusDiv.innerText = "Error setting primary button: " + error.message;
    }
  }
};

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  init();
  jframe.sdk.actions.ready();
});
