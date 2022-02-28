import {SET_LANGUAGE} from '../types';

export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};
