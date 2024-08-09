import { sendSkillStart } from "../api";

export const startWoodCuttingActivity = async () => {
  return await sendSkillStart();
};
