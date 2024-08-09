import { BaseStorage, createStorage, StorageType } from "../base";
import { defaultUserValue } from "./constants";
import { User } from "./types";

type UserStorage = BaseStorage<User> & {
  get: () => Promise<User>;
  update: (usr: User) => Promise<void>;
};

const storage = createStorage<User>("rim-user", defaultUserValue, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const userStorage: UserStorage = {
  ...storage,
  get: async () => {
    return await storage.get();
  },
  update: async (usr: User): Promise<void> => {
    return await storage.set(usr);
  },
};
