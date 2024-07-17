import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }
  return store;
};

import { create } from 'zustand';
type CounterState = {
  count: number;
  diff: number;
};

type CounterStore = {
  increase: () => void;
  decrease: () => void;
  asyncIncrease: () => void;
  changeDiff: (newDiff: string) => void;
} & CounterState;

export const createDependentStore = (
  externalInitalValue: Partial<CounterState>,
) => {
  const initalState: CounterState = {
    count: 0,
    diff: 1,
  };

  return create<CounterStore>((set) => ({
    ...initalState,
    ...externalInitalValue,
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
};
