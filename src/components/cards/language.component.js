import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Text} from '..';
import theme from '../../utils/theme';

import styles from './cards.styles';

const LanguageCard = props => {
  const {language, onPress, _active} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.lanContainer}
      onPress={() => onPress()}>
      <Text style={styles.lanTitle}>{language.name}</Text>
      {_active === language.key && (
        <Icons name={'ios-checkmark'} size={18} color={theme.SUCCESS_COLOR} />
      )}
    </TouchableOpacity>
  );
};

export default LanguageCard;
