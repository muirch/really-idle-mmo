import { GameData } from "@lib/types";

/**
 * Type representing a nested object where keys are strings and values are either strings or nested objects.
 */
export type NestedObject = {
  [key: string]: string | NestedObject;
};

/**
 * Converts a flat object with dot-separated keys into a nested object.
 *
 * @param obj - The flat object where keys represent the path in the nested structure.
 * @returns The nested object representation.
 */
const convertToNestedObject = (obj: { [key: string]: string }): GameData => {
  const result: GameData = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Split the key by dots to traverse the nested structure
    const keys = key.split(".");

    // Reduce the array of keys to build the nested object
    keys.reduce((acc: NestedObject, cur: string, index: number) => {
      if (index === keys.length - 1) {
        // Set the value at the final key
        acc[cur] = value;
      } else {
        // Ensure intermediate keys exist and are objects
        acc[cur] = acc[cur] || {};
      }
      return acc[cur] as NestedObject;
    }, result as NestedObject);
  });

  return result;
};

/**
 * Merges two nested objects, with values from the source object overriding those in the target object.
 *
 * @param target - The target object to be merged into.
 * @param source - The source object to merge from.
 * @returns The merged object.
 */
const mergeObjects = (target: GameData, source: GameData): GameData => {
  /**
   * Recursively merges the source object into the target object.
   *
   * @param targetObj - The target object to merge into.
   * @param sourceObj - The source object to merge from.
   */
  const merge = (targetObj: Record<string, unknown>, sourceObj: Record<string, unknown>) => {
    for (const key of Object.keys(sourceObj)) {
      if (sourceObj[key] instanceof Object && key in targetObj) {
        // If both are objects, merge them recursively
        merge(targetObj[key] as Record<string, unknown>, sourceObj[key] as Record<string, unknown>);
      } else {
        // Otherwise, directly assign the value
        targetObj[key] = sourceObj[key];
      }
    }
  };

  // Create a copy of the target object to avoid mutating the original
  const result = { ...target };
  // Merge the source object into the copy
  merge(result, source);

  return result;
};

/**
 * Extracts, parses, and merges game data from an HTML string.
 *
 * @param html - The HTML string containing game data.
 * @returns The unified game data as a nested object.
 */
export const extractGameData = (html: string): GameData => {
  const gameDataRegex = /game_data\.push\((.*?)\);/g;
  let match: RegExpExecArray | null;
  let unifiedData: GameData = {};

  // Extract and process all game data entries
  while ((match = gameDataRegex.exec(html)) !== null) {
    // Parse the JSON object, fixing escaped characters
    const parsedObject = JSON.parse(match[1].replace(/\\u0026/g, "&").replace(/\\/g, "")) as { [key: string]: string };
    // Convert the flat object to a nested object
    const nestedObject = convertToNestedObject(parsedObject);
    // Merge the new nested object into the unified data
    unifiedData = mergeObjects(unifiedData, nestedObject);
  }

  return unifiedData;
};
