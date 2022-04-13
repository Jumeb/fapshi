import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';
import theme from '../../utils/theme';

const SubmitButton = props => {
  const {title, invert, onPress, loading} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={invert ? styles.subContainerI : styles.subContainer}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator size={'small'} color={theme.WHITE_COLOR} />
      ) : (
        <Text style={invert ? styles.subTextI : styles.subText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
