import {combineReducers} from 'redux';

import AuthReducer from './AuthReducers';
import ContactReducer from './ContactReducers';
import ScrollReducers from './ScrollReducers';
import TranslationReducer from './TranslationReducer';

export default combineReducers({
  auth: AuthReducer,
  i18n: TranslationReducer,
  scroll: ScrollReducers,
  contacts: ContactReducer,
});
