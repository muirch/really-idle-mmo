import { Activity } from "@src/types";

export const startActivity = (activity: Activity) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    if (!tabs[0].id) {
      return alert("Activity can't be started. No tab with game found!");
    }

    const activityUrl = "https://web.idle-mmo.com/skills/view/" + activity;

    if (tabs[0].url !== activityUrl) {
      await chrome.tabs.update(tabs[0].id, { url: "https://web.idle-mmo.com/skills/view/" + activity });
    }

    setTimeout(() => {
      if (!tabs[0].id) {
        return alert("Activity can't be started. No tab with game found!");
      }

      const message = { type: "start", activity };
      chrome.tabs.sendMessage(tabs[0].id, message, async (isStarted: boolean) => {
        if (isStarted) {
          alert(`Activity ${activity} started!`);
          return await chrome.tabs.reload();
        }
        return alert(`Activity ${activity} failed to start.`);
      });
    }, 1000);
  });
};
