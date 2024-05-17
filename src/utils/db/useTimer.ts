import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

export interface TimerStateInterface {
  time: number;
  seconds: number;
  isOver: boolean;
}

type TimerState = {
  timeStore: TimerStateInterface;
  interval: NodeJS.Timeout | null;

  updateTimer: (name: string, value: number) => void;

  getStore: () => TimerStateInterface;
  getInterval: () => NodeJS.Timeout | null;
};

export const useTimer = create<TimerState>()(
  immer((set, get) => ({
    timeStore: { time: 0, seconds: 0, isOver: false },
    interval: null,
    updateTimer(name: string, value: number) {
      set((state) => {
        state.timeStore = { ...state.timeStore, [name]: value };
      });
    },

    startTimer: () => {
      const interval: NodeJS.Timeout = setInterval(() => {
        set((state) => {
          if (state.timeStore.seconds === 0) {
            state.timeStore.seconds = 59;
            state.updateTimer("time", --state.timeStore.time);
          } else {
            state.updateTimer("seconds", --state.timeStore.seconds);
          }
          if (state.timeStore.time === 0 && state.timeStore.seconds === 0) {
            state.timeStore.isOver = true;
            clearInterval(interval);
          }
        }); // 1000ms = 1s
      }, 1000);

      set((state) => {
        state.interval = interval;
      });
      return interval;
    },

    getStore() {
      return get().timeStore;
    },

    getInterval() {
      set((state) => {
        state.timeStore = { time: 0, seconds: 0, isOver: false };
      });
      return get().interval;
    },
  }))
);
