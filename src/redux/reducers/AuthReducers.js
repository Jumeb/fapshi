import {Storage} from '../../utils';
import {SET_USER, SET_TOKEN, ENTRY, SIGNOUT, ACTION, SET_PIN} from '../types';

const INITIAL_STATE = {
  actionType: '',
  token: '',
  user: {},
  firstTime: true,
  hasPin: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION:
      const actionType = action.payload;
      return {...state, actionType};
    case SET_USER:
      const user = action.payload;
      Storage.storeInfo('isFirstTime', {value: false});
      Storage.storeInfo('USER', user);
      if (user && user.accessToken) {
        Storage.storeInfo('TOKEN', user.accessToken);
        return {...state, user: {...user}, token: user.accessToken};
      }
      if (user && user?.hasSetPin) {
        Storage.storeInfo('HasPin', {value: hasPin});
        return {...state, user: {...user}, hasPin: user?.hasSetPin};
      }
      return {...state, user: {...user}};
    case SET_PIN:
      const hasPin = action.payload;
      Storage.storeInfo('HasPin', {value: hasPin});
      return {...state, hasPin};
    case SET_TOKEN:
      const token = action.payload;
      Storage.storeInfo('TOKEN', token);
      return {...state, token};
    case ENTRY:
      return {...state, firstTime: false};
    case SIGNOUT:
      Storage.storeInfo('isFirstTime', {value: true});
      // Storage.remove({key: 'isNotFirstTime'});
      Storage.remove({key: 'USER'});
      Storage.remove({key: 'TOKEN'});
      Storage.remove({key: 'HasPin'});
      return {
        ...state,
        user: {},
        token: '',
      };
    default:
      return state;
  }
};

export default AuthReducer;
