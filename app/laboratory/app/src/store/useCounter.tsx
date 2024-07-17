import { create } from 'zustand';

export type CountState = {
  count: number;
  diff: number;
  increase: () => void;
  decrease: () => void;
  asyncIncrease: () => void;
  changeDiff: (newDiff: string) => void;
};

const useCounter = create<CountState>((set) => ({
  count: 0,
  diff: 1,
  increase: () => set((state) => ({ count: state.count + state.diff })),
  decrease: () => set((state) => ({ count: state.count - state.diff })),
  asyncIncrease: async () => {
    return await new Promise(() =>
      setTimeout(() => {
        set((state) => ({ count: state.count + state.diff }));
      }, 1000),
    );
  },
  changeDiff: (newDiff) => set(() => ({ diff: Number(newDiff || 1) })),
}));

export default useCounter;
