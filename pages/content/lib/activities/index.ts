import { sendSkillStop } from "./api";
import { Activity } from "./types";
import { startWoodCuttingActivity } from "./woodcutting";

export const startActivityWorker = (activity: Activity) => {
  switch (activity) {
    case "woodcutting":
      return startWoodCuttingActivity();
    default:
      return false;
  }
};

export const stopActivityWorker = async () => {
  await sendSkillStop();
};
