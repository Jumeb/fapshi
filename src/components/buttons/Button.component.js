import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';
import theme from '../../utils/theme';

const Button = props => {
  const {title, invert, onPress, loading} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={invert ? styles.buttonContainerI : styles.buttonContainer}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={invert ? theme.WHITE_COLOR : theme.PRIMARY_COLOR}
        />
      ) : (
        <Text style={invert ? styles.buttonTextI : styles.buttonText}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
