import { extractGameData } from "./extractGameData";

export const parseGameData = () => {
  const scripts = Array.from(document.querySelectorAll("script"));
  const needle = scripts.find(script => {
    return script.innerHTML.includes("let game_data = [];");
  });

  if (!needle) {
    throw new Error("Can't find game_data object.");
  }

  return extractGameData(needle.innerHTML);
};
