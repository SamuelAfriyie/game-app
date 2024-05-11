import { create } from "zustand";

// export const useTimer = create((set, get) => ({
//   time: 0,

//   updateTimer: (value: number) => set({ time: value }),

//   startTimer: () => {
//     const interval: NodeJS.Timeout = setInterval(() => {
//       set((state: any) => ({ time: state.time - 1 }));

//     }, 1000);
//     const t = get() as any;
//     return interval;
//   },
// }));

import { immer } from "zustand/middleware/immer";

export interface TimerStateInterface {
  time: number;
  seconds: number;
  isOver: boolean;
}

type TimerState = {
  timeStore: TimerStateInterface;

  updateTimer: (name: string, value: number) => void;

  getStore: () => TimerStateInterface;
};

export const useTimer = create<TimerState>()(
  immer((set, get) => ({
    timeStore: { time: 0, seconds: 0, isOver: false },

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
      return interval;
    },

    getStore() {
      return get().timeStore;
    },
  }))
);
