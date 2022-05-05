import {Storage} from '../../utils';
import {
  ADD_PAYOUT,
  ADD_TRANSFER,
  REMOVE_PAYOUT,
  REMOVE_PAYOUT_INDEX,
  REMOVE_TRANSFER,
  REMOVE_TRANSFER_INDEX,
  SET_PAYOUTS,
  SET_TRANSFERS,
} from '../types';

const INITIAL_STATE = {
  payouts: [],
  transfers: [],
};

export default (state = INITIAL_STATE, action) => {
  let payouts = [],
    transfers = [],
    index;
  switch (action.type) {
    case ADD_PAYOUT:
      const payout = action.payload;
      if (state.payouts.length > 0) {
        state.payouts.unshift(payout);
      }
      if (state.payouts && state.payouts.length <= 0) {
        state.payouts.push(payout);
      }
      payouts = state.payouts;
      Storage.storeInfo('PAYOUTS', payouts);
      return {...state, payouts: [...payouts]};
    case ADD_TRANSFER:
      const transfer = action.payload;
      if (state.transfers && state.transfers.length > 0) {
        state.transfers.unshift(transfer);
      }
      if (
        state.transfers &&
        state.transfers.length <= 0 &&
        transfer.name.length > 2
      ) {
        state.transfers.push(transfer);
      }
      transfers = state.transfers;
      Storage.storeInfo('TRANSFERS', transfers);
      return {...state, transfers: [...transfers]};
    case SET_PAYOUTS:
      payouts = action.payload;
      return {...state, payouts: [...payouts]};
    case SET_TRANSFERS:
      transfers = action.payload;
      return {...state, transfers: [...transfers]};
    case REMOVE_PAYOUT:
      if (state.payouts.length >= 1) {
        state.payouts.pop();
      }
      payouts = state.payouts;
      Storage.storeInfo('PAYOUTS', payouts);
      return {...state, payouts: [...payouts]};
    case REMOVE_TRANSFER:
      if (state.transfers.length >= 1) {
        state.transfers.pop();
      }
      transfers = state.transfers;
      Storage.storeInfo('TRANSFERS', transfers);
      return {...state, transfers: [...transfers]};
    case REMOVE_TRANSFER_INDEX:
      index = action.payload;
      if (state.transfers.length === 1) {
        state.transfers = [];
      }
      if (state.transfers.length >= 1) {
        state.transfers.splice(index, 1);
      }
      transfers = state.transfers;
      Storage.storeInfo('TRANSFERS', transfers);
      return {...state, transfers: [...transfers]};
    case REMOVE_PAYOUT_INDEX:
      index = action.payload;
      if (state.payouts.length === 1) {
        state.payouts = [];
      }
      if (state.payouts.length >= 1) {
        state.payouts.splice(index, 1);
      }
      payouts = state.payouts;
      Storage.storeInfo('PAYOUTS', payouts);
      return {...state, payouts: [...payouts]};
    default:
      return state;
  }
};
