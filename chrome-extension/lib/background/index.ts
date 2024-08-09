import "webextension-polyfill";

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.type == "createActivityAlarm") {
    chrome.alarms.create({ delayInMinutes: request.delay });
    console.log("Next alarm registered. Start in " + request.delay);

    chrome.alarms.onAlarm.addListener(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
        if (!tabs[0].id) {
          return;
        }

        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            type: "restart",
            activity: request.activity,
          },
          () => {},
        );
      });
    });
  }

  sendResponse();
});
