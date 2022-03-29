import React from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../utils/theme';

import styles from './header.styles';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[theme.PRIMARY_COLOR, theme.PRIMARY_COLOR_MONO]}
        style={styles.roundContainer}>
        <Image
          style={styles.logoBackground}
          imageStyle={styles.logoBackground}
          source={require('../../utils/images/logo-full.png')}
        />
      </LinearGradient>
    </View>
  );
};

export default Header;
