import {combineReducers} from 'redux';
import AuthReducer from './AuthReducers';
import TranslationReducer from './TranslationReducer';

export default combineReducers({
  auth: AuthReducer,
  i18n: TranslationReducer,
});
