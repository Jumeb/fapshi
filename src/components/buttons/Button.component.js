import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';

const Button = props => {
  const {title, invert, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={invert ? styles.buttonContainerI : styles.buttonContainer}
      activeOpacity={0.8}>
      <Text style={invert ? styles.buttonTextI : styles.buttonText}>
        {title}
      </Text>
      <View style={invert ? styles.circleThemeI : styles.circleTheme} />
    </TouchableOpacity>
  );
};

export default Button;
