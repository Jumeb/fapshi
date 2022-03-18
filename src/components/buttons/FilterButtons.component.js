import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '..';
import theme from '../../utils/theme';

import styles from './Buttons.style';

const Filter = props => {
  const {title, active} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.filterContainer,
        active && {borderBottomColor: theme.PRIMARY_COLOR},
      ]}>
      <Text style={styles.filterText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Filter;
