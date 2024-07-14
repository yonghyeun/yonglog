import { Action } from './types';

/* Action Type */
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const CHANGE_INCREASE = 'CHANGE_INCREASE';

/* Action Creator */
export const AddNumber = (): Action => {
  return {
    type: ADD,
  };
};

export const SubtractNumber = (): Action => {
  return {
    type: SUBTRACT,
  };
};

export const changeIncrease = (payload: string): Action => {
  return {
    type: CHANGE_INCREASE,
    payload: Number(payload),
  };
};
