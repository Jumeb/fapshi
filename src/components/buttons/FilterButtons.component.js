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

  const {title, active, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={0.8}
      style={[styles.filterContainer, active && styles.filterContainerActive]}>
      <Text style={[styles.filterText, active && {color: theme.WHITE_COLOR}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Filter;
