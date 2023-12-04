import "./popup.scss";

// Add listeners for click
const buttons = document.querySelectorAll("input");

buttons.forEach((x) => x.addEventListener("click", trigger));
// Add listener for clear button
document.querySelector("button")?.addEventListener("click", clearCheckboxes);

function clearCheckboxes() {
  buttons.forEach((button) => (button.checked = false));
  trigger();
}

function trigger() {
  (async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (tab.id === undefined) {
      return;
    }
    const desiredHighlights = Array.prototype.map
      .call(document.querySelectorAll("input"), (x: any) => {
        return { [x.id]: x.checked };
      })
      .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {});

    await chrome.tabs.sendMessage(tab.id, desiredHighlights);
  })();
}
