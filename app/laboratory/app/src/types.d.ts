export type State = {
  counter: number;
  increase: number;
};

export type Store = {
  state: State;
  dispatch: Dispatch<Action>;
  getState: () => State;
  subscribe: (listener: () => void) => () => void;
};

export type Action = {
  type: string;
  payload?: number;
};
