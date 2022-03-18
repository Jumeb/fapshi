import React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';

const ActionButton = props => {
  const {title, invert, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={invert ? styles.actContainerI : styles.actContainer}
      activeOpacity={0.8}>
      <Text style={invert ? styles.actTextI : styles.actText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
