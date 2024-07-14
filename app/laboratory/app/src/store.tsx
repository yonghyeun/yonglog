import { createContext, Dispatch, useReducer } from 'react';
import { State, Action, Store } from './types';
import appReducer from './reducer';

export const StateContext = createContext<Store | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

const initialState = {
  counter: 0,
  increase: 1,
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    appReducer,
    initialState,
  );
  const listeners: (() => void)[] = [];

  const store = {
    state,
    getState: () => state,
    dispatch,
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };

  return (
    <StateContext.Provider value={store}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
