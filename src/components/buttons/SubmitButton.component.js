import React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './Buttons.style';
import {Text} from '../../components';

const SubmitButton = props => {
  const {title, invert, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={invert ? styles.subContainerI : styles.subContainer}
      activeOpacity={0.8}>
      <Text style={invert ? styles.subTextI : styles.subText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
