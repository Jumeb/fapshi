import {
  ADD_PAYOUT,
  ADD_TRANSFER,
  REMOVE_PAYOUT,
  REMOVE_TRANSFER,
  SET_PAYOUTS,
  SET_TRANSFERS,
} from '../types';

export const addPayout = (name, number) => {
  return {
    type: ADD_PAYOUT,
    payload: {name, number},
  };
};

export const addTransfer = (name, email) => {
  return {
    type: ADD_TRANSFER,
    payload: {name, email},
  };
};

export const setPayouts = payouts => {
  return {
    type: SET_PAYOUTS,
    payload: payouts,
  };
};

export const setTransfers = transfers => {
  return {
    type: SET_TRANSFERS,
    payload: transfers,
  };
};

export const removeTransfer = () => {
  return {
    type: REMOVE_TRANSFER,
  };
};

export const removePayout = () => {
  return {
    type: REMOVE_PAYOUT,
  };
};
