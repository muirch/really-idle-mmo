import { userStorage, utilityStorage } from "@extension/storage";
import { User } from "@extension/storage/lib/user/types";
import { parseGameData } from "@lib/utils/parseGameData";

const getCharacterApiEndpoint = () => {
  const apiEndPoint = document.querySelector("meta[name=api-character-information-endpoint]")?.getAttribute("content");
  if (!apiEndPoint) {
    throw new Error("Can't find api endpoint for basic character info.");
  }
  return apiEndPoint;
};

const getBearerToken = () => {
  const bearer = document.querySelector("meta[name=api-token]")?.getAttribute("content");
  if (!bearer) {
    throw new Error("Can't find bearer token.");
  }
  return bearer;
};

const fetchUserBasicData = async (bearer: string, apiEndPoint: string) => {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + bearer);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const response = await fetch(apiEndPoint, {
    method: "POST",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Can't fetch basic user data.");
  }

  return response.json();
};

export const getUserData = async () => {
  const gameData = parseGameData();
  const apiEndPoint = getCharacterApiEndpoint();
  const bearer = getBearerToken();

  try {
    const data: User = await fetchUserBasicData(bearer, apiEndPoint);
    userStorage.set({ ...data });
    utilityStorage.set({
      bearer,
      characterApiEndpoint: apiEndPoint,
      gameData: gameData,
    });
  } catch (error) {
    throw new Error("An error occur.");
  }
};
