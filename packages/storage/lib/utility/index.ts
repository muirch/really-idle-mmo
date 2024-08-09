import { BaseStorage, createStorage, StorageType } from "../base";
import { defaultUtilityValue } from "./constants";
import { Utility } from "./types";

type UtilityStorage = BaseStorage<Utility> & {
  getBearer: () => Promise<Utility["bearer"]>;
  getGameData: () => Promise<Utility["gameData"]>;
};

const storage = createStorage<Utility>("rim-utility", defaultUtilityValue, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const utilityStorage: UtilityStorage = {
  ...storage,
  getBearer: async () => {
    const data = await storage.get();
    return data.bearer;
  },
  getGameData: async () => {
    const data = await storage.get();
    return data.gameData;
  },
};
