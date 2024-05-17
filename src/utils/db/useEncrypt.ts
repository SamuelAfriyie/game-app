import bcrypt from "bcryptjs";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

export interface EncryptKeyType {
  key: string;
}

type EncryptKeyState = {
  keyStore: EncryptKeyType;

  updateKey: (value: string) => void;

  generateKey: () => void;

  getKey: () => EncryptKeyType;
};

export const useEncrypt = create<EncryptKeyState>()(
  immer((set, get) => ({
    keyStore: { key: "" },

    updateKey(value: string) {
      set((state) => {
        state.keyStore = { ["key"]: value };
      });
    },

    generateKey() {
      const key = bcrypt.genSaltSync(10);
      set((state) => {
        state.keyStore = { ["key"]: key };
      });
    },

    getKey() {
      get().generateKey();
      return get().keyStore;
    },
  }))
);
