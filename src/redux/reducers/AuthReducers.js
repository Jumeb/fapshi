import {Storage} from '../../utils';
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
  ACTION,
} from '../types';

const INITIAL_STATE = {
  actionType: '',
  token: '',
  user: {},
  chefs: [],
  firstTime: true,
  items: [],
  locations: [],
  orders: [],
  wallet: {},
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION:
      const actionType = action.payload;
      return {...state, actionType};
    case SET_USER:
      const user = action.payload;
      Storage.storeInfo('USER', user);
      return {...state, user: {...user}};
    case SET_CHEFS:
      const chefs = action.payload;
      return {...state, chefs: [...chefs]};
    case SET_ITEMS:
      const items = action.payload;
      return {...state, items};
    case SET_TOKEN:
      const token = action.payload;
      Storage.storeInfo('TOKEN', token);
      return {...state, token};
    case SET_LOCATIONS:
      const locations = action.payload;
      return {...state, locations};
    case SET_ORDERS:
      const orders = action.payload;
      return {...state, orders};
    case SET_WALLET:
      const wallet = action.payload;
      return {...state, wallet};
    case ENTRY:
      return {...state, firstTime: false};
    case SIGNOUT:
      Storage.storeInfo('isNotFirstTime', false);
      // Storage.remove({key: 'isNotFirstTime'});
      Storage.remove({key: 'TOKEN'});
      Storage.remove({key: 'USER'});
      Storage.remove({key: 'FAVOURITES'});
      Storage.remove({key: 'CART'});
      return {
        ...state,
        user: {},
        token: '',
        bakerId: '',
        chefs: [],
        firstTime: true,
        items: [],
        locations: [],
        orders: [],
        wallet: {},
      };
    default:
      return state;
  }
};

export default AuthReducer;
