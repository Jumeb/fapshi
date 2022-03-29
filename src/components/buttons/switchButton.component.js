import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';

const SwitchButton = props => {
  const {title, invert, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.switchButton,
        invert ? styles.switchContainerI : styles.switchContainer,
      ]}
      activeOpacity={0.8}>
      <View
        style={[
          styles.switch,
          invert ? styles.switchThemeI : styles.switchTheme,
        ]}
      />
    </TouchableOpacity>
  );
};

export default SwitchButton;
