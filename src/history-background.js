const { transformItem, filterItem } = require("./history-item");
const last7days = 7 * 24 * 3600 * 1000

const search = () => {
  return new Promise((resolve) => {
    // @ts-expect-error
    chrome.history.search(
      {
        text: "https://github.com",
        maxResults: 200,
        startTime: last7days
      },
      resolve
    );
  });
};

const listen = () => {
  // @ts-expect-error
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type == "history-query") {
      search().then(data => sendResponse(transformItem(filterItem(data))))
      return true
    }
  });
};

listen();
