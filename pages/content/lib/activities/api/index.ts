import { userStorage, utilityStorage } from "@extension/storage";
import { parseGameData } from "@lib/utils/parseGameData";
import { GameData } from "@lib/types";

const getHeaders = async () => {
  const bearer = await utilityStorage.getBearer();
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + bearer);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  return headers;
};

const getActive = async () => {
  const userData = await userStorage.get();
  const url = document.querySelector("meta[name=api-active-action-endpoint]")?.getAttribute("content");
  if (!url) {
    throw new Error("Can't get url to fetch active state.");
  }

  try {
    const headers = await getHeaders();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ character_id: userData.id }),
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Can't get active data: " + error);
  }
};

const getCurrentAvailableMaterials = async (gameData: GameData) => {
  const url = gameData.skills?.data?.endpoint;

  if (!url) {
    throw new Error("Can't get url to fetch available materials data.");
  }

  try {
    const headers = await getHeaders();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ filter: {} }),
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Can't get available materials data: " + error);
  }
};

const createAlarm = async () => {
  const activeData = await getActive();
  const delay = (activeData.expires_in + 1000) / 60000; // add 1000 ms to start without errors
  console.log(`[RIM] Next skill action "${activeData.type}" will start in ${delay.toFixed(0)} mins!`);
  chrome.runtime.sendMessage({ type: "createActivityAlarm", delay, activity: activeData.type });
};

export const sendSkillStart = async () => {
  const gameData = parseGameData();
  const url = gameData.skills?.start?.endpoint;
  if (!url) {
    throw new Error("Can't start activity: game_data not found.");
  }

  const materialData = await getCurrentAvailableMaterials(gameData);
  const materialList = materialData.items as Array<Record<string, unknown>>;

  try {
    const headers = await getHeaders();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        skill_item_id: materialList[materialList.length - 1].id,
        quantity: 1,
        essence_crystal: null,
      }),
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (json.result === "success") {
      createAlarm();
    }

    return json.result === "success" ? true : false;
  } catch (error) {
    throw new Error("Can't start activity: " + error);
  }
};

export const sendSkillStop = async () => {
  const activeData = await getActive();
  const url = activeData.cancel_url;
  if (!url) {
    return false;
  }

  try {
    const headers = await getHeaders();
    const response = await fetch(url, {
      method: "POST",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return true;
  } catch (error) {
    throw new Error("Can't start activity: " + error);
  }
};
