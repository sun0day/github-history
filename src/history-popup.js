function send() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { type: 'history-modal' });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  send()
});