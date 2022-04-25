import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {Text} from '..';
import theme from '../../utils/theme';
import styles from './Buttons.style';

const Function = props => {
  const {title, onPress, action} = props;

  return (
    <View style={styles.funcContainer}>
      <Text style={styles.funcTitle}>{action}</Text>
      <TouchableOpacity
        style={styles.funcButton}
        activeOpacity={0.8}
        onPress={() => onPress()}>
        <Text style={styles.funcButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Function;
