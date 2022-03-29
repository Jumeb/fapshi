import {SCROLL} from '../types';

const INITIAL_STATE = {
  yOffset: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCROLL:
      const yOffset = action.payload.nativeEvent.contentOffset.y;
      return {...state, yOffset};
    default:
      return {...state};
  }
};
