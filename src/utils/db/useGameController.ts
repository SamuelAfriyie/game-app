import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface BoardStateInterface {
  currentLevel: number;
  levelCompletionStatus: boolean;
  score: number;
}

type BoardStates = {
  gameBoard: BoardStateInterface;

  incrementLevel: () => void;
  addScore: (gamePoint: number) => void;

  getStore: () => BoardStateInterface;
};

export const useGameController = create<BoardStates>()(
  immer((set, get) => ({
    gameBoard: {
      currentLevel: 0,
      levelCompletionStatus: false,
      score: 0,
    },

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

    addScore(gamePoint: number) {
      set((state) => {
        state.gameBoard = {
          ...state.gameBoard,
          ["score"]: state.gameBoard.score + gamePoint,
        };
      });
    },

    getStore() {
      return get().gameBoard;
    },
  }))
);
