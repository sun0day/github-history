import { Modal } from "./history-modal";
import { Font } from './history-font'

const send = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "history-query" }, (response) => {
      console.log(response);
      resolve(response);
    });
  });
};

const modal = new Modal(send);
const font = new Font()

const listen = () => {
  // @ts-expect-error
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request)
    if (request.type == "history-modal") {
      modal.toggle()
    }
  });
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.visible()) {
    modal.toggle()
  }
});

document.addEventListener("click", (e) => {
  if (modal.visible() && !modal.contains(e.target)) {
    modal.toggle()
  }
});

listen()
font.mount()
modal.mount()