import React, {useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';

import styles from './operator.style';
import {Text} from '..';

const Operator = props => {
  const {operator, setOperator, value} = props;
  let image = '';

  if (value.toLowerCase() === 'mtn') {
    image = require('../../utils/images/mtn-2.png');
  }

  if (value.toLowerCase() === 'orange_money') {
    image = require('../../utils/images/orange_money.png');
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setOperator()}
      style={[
        styles.mainContainer,
        value.toLowerCase() === operator.toLowerCase() && styles.activeOperator,
      ]}>
      <Image style={styles.operatorImage} source={image} />
      {/* <Text>{value}</Text> */}
    </TouchableOpacity>
  );
};

export default Operator;
