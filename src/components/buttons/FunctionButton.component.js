import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {Text} from '..';
import theme from '../../utils/theme';
import styles from './Buttons.style';

const Function = props => {
  const {navigation, icon, title, color} = props;

  return (
    <TouchableOpacity style={styles.funcContainer} activeOpacity={0.8}>
      <View style={[styles.funcIcon, {backgroundColor: color}]}>
        <Icons name={icon} color={theme.WHITE_COLOR} size={12} />
      </View>
      <Text style={styles.funcTitle}>{title}</Text>
      <View style={styles.circleTheme} />
    </TouchableOpacity>
  );
};

export default Function;
