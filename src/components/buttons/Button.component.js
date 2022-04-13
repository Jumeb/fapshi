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
        <ActivityIndicator size={'small'} color={theme.WHITE_COLOR} />
      ) : (
        <Text style={invert ? styles.buttonTextI : styles.buttonText}>
          {title}
        </Text>
      )}
      <View style={invert ? styles.circleThemeI : styles.circleTheme} />
    </TouchableOpacity>
  );
};

export default Button;
