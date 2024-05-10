import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface BoardStateInterface {
  currentLevel: number;
  levelCompletionStatus: boolean;
}

type BoardStates = {
  gameBoard: BoardStateInterface;

  incrementLevel: () => void;

  getStore: () => BoardStateInterface;
};

export const useGameController = create<BoardStates>()(
  immer((set, get) => ({
    gameBoard: { currentLevel: 0, levelCompletionStatus: false },

    incrementLevel() {
      set((state) => {
        state.gameBoard = {
          ...state.gameBoard,
          ["currentLevel"]: ++state.gameBoard.currentLevel,
        };
      });
    },

    completeLevel: () => {
        set((state) => {
            state.gameBoard = {
            ...state.gameBoard,
            ["levelCompletionStatus"]: true,
            };
            state.incrementLevel();
        });
    },

    getStore() {
      return get().gameBoard;
    },
  }))
);
