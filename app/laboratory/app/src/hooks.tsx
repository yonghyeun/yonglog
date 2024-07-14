import { useContext, useSyncExternalStore } from 'react';
import { DispatchContext, StateContext } from './store';

import type { State } from './types';

export const useSelector = (selector: (state: State) => State[keyof State]) => {
  const store = useContext(StateContext);

  if (!store) {
    throw new Error('Provider 내부에 존재해야 합니다.');
  }

  const getSnapshot = () => selector(store.getState());
  return useSyncExternalStore(store.subscribe, getSnapshot);
};

export const useDispatch = () => {
  const dispatch = useContext(DispatchContext);

  if (!dispatch) {
    throw new Error('Provider 내부에 존재해야 합니다.');
  }

  return dispatch;
};
