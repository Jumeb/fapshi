import React from 'react';
import {View, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './cards.styles';
import {Text} from '..';
import theme from '../../utils/theme';

const RecentsCard = props => {
  const {} = props;

  return (
    <View style={styles.recentContainer}>
      <View style={styles.recentImageContainer}>
        <Icons
          name={'ios-person-outline'}
          color={theme.DARK_OVERLAYS}
          size={23}
        />
      </View>
      <Text style={styles.recentName}>Jume Brice</Text>
    </View>
  );
};

export default RecentsCard;
