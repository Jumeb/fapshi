import i18n from 'i18n-js';

import en from '../../translations/en';
import fr from '../../translations/fr';
import {Storage} from '../../utils';
import {SET_LANGUAGE} from '../types';

const INITIAL_STATE = {
  i18n: i18n,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      const locale = action.payload;
      i18n.locale = locale;
      Storage.storeInfo('LOCALE', locale);
      i18n.fallbacks = true;
      i18n.translations = {fr, en};

      var newi18n = {...i18n};
      return {...state, i18n: newi18n};
    default:
      return state;
  }
};
