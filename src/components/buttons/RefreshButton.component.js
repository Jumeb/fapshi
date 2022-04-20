import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';

import styles from './Buttons.style';
import {Text} from '..';

const RefreshButton = props => {
  const {i18n, onPress, info, center} = props;

  return (
    <View style={center && styles.refreshButtonContainer}>
      <Text style={styles.refreshInfoText}>{info}</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={() => onPress()}>
        <Image
          source={require('../../utils/images/logo-full.png')}
          style={styles.refreshImage}
        />
        <Text style={styles.refreshText}>{i18n.t('phrases.tapToRefresh')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RefreshButton;
