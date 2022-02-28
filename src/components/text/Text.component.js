import React from 'react';

import {Text} from 'react-native';

import styles from './Text.style';

const MyText = (props) => {
  const {style, children} = props;
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default MyText;
