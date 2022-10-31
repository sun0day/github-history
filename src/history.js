import { Modal } from "./history-modal";

const modal = Modal();

window.addEventListener("load", () => {
  document.body.appendChild(modal);
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "KeyH") {
    modal.className = "show";
  }
});

document.addEventListener("click", (e) => {
  if (!modal.contains(e.target)) {
    modal.className = "hide";
  }
});

const send = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "history-query" }, (response) => {
      console.log(response);
      resolve(response);
    });
  });
};

send();
