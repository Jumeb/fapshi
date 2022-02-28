import {
  SET_USER,
  SET_TOKEN,
  RESET,
  ENTRY,
  SET_CHEFS,
  SET_ITEMS,
  SET_LOCATIONS,
  SET_WALLET,
  SET_ORDERS,
  SIGNOUT,
} from '../types';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setChefs = chefs => {
  return {
    type: SET_CHEFS,
    payload: chefs,
  };
};

export const setItems = items => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const setEntry = () => {
  return {
    type: ENTRY,
  };
};

export const resetUser = () => {
  return {
    type: RESET,
  };
};

export const SetLocations = data => {
  return {
    type: SET_LOCATIONS,
    payload: data,
  };
};

export const SetWallet = data => {
  return {
    type: SET_WALLET,
    payload: data,
  };
};

export const SetOrders = data => {
  return {
    type: SET_ORDERS,
    payload: data,
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};
