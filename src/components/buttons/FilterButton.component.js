import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import theme from '../../utils/theme';

import styles from './Buttons.style';

const Filter = props => {
  const {title, active, yOffset} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.filtersContainer,
        active
          ? {backgroundColor: theme.PRIMARY_COLOR}
          : {backgroundColor: theme.WHITE_COLOR},
      ]}>
      <Text
        style={[
          styles.filterTitle,
          active ? {color: theme.WHITE_COLOR} : {color: theme.DARK_GREY},
        ]}>
        {title}
      </Text>
      <View style={[styles.filterCircleTheme, active && {opacity: 0.2}]} />
    </TouchableOpacity>
  );
};

export default Filter;
