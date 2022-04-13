import {
  SET_USER,
  SET_TOKEN,
  RESET,
  SET_WALLET,
  SIGNOUT,
  ACTION,
  SET_PIN,
} from '../types';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setPin = value => {
  return {
    type: SET_PIN,
    payload: value,
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const resetUser = () => {
  return {
    type: RESET,
  };
};

export const SetWallet = data => {
  return {
    type: SET_WALLET,
    payload: data,
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};

export const setAction = data => {
  return {
    type: ACTION,
    payload: data,
  };
};
