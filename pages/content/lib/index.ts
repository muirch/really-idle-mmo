import { startActivityWorker, stopActivityWorker } from "./activities";
import { getUserData } from "./user";

(() => {
  try {
    getUserData();

    console.log("[RIM] RIM successfully loaded!");

    chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
      if (request.type === "start") {
        const isStarted = startActivityWorker(request.activity);
        sendResponse(isStarted);
      }
      if (request.type === "restart") {
        await stopActivityWorker();
        const isStarted = startActivityWorker(request.activity);
        sendResponse(isStarted);
      }
    });
  } catch (e) {
    throw new Error("[RIM] An error occur when loading background script.");
  }
})();
