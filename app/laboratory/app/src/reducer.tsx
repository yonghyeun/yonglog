import { ADD, SUBTRACT, CHANGE_INCREASE } from './action';
import type { State, Action } from './types';

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD:
      return { ...state, counter: state.counter + state.increase };
    case SUBTRACT:
      return {
        ...state,
        counter: state.counter - state.increase,
      };
    case CHANGE_INCREASE:
      return { ...state, increase: action.payload || 1 };
    default:
      return state;
  }
};

export default appReducer;
