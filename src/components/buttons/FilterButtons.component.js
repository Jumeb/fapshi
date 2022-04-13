import React from 'react';
import {
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Text} from '..';
import theme from '../../utils/theme';

import styles from './Buttons.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Filter = props => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      500,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity,
    ),
  );

  const {title, active, yOffset, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.8}
      style={[
        styles.filterContainer,
        active && {borderBottomColor: theme.PRIMARY_COLOR},
      ]}>
      <Text style={[styles.filterText, {color: theme.PRIMARY_COLOR}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Filter;
