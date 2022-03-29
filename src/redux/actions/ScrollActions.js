import {SCROLL} from '../types';

export const scrolling = value => {
  return {
    type: SCROLL,
    payload: value,
  };
};
