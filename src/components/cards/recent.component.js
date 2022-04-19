import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './cards.styles';
import {Text} from '..';
import theme from '../../utils/theme';

const RecentsCard = props => {
  const {data, onPress, active} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={styles.recentContainer}>
      <View
        style={[
          styles.recentImageContainer,
          active === data.number && styles.activePayout,
          active === data.email && styles.activePayout,
        ]}>
        <Icons
          name={'ios-person-outline'}
          color={
            active === data.number || active === data.email
              ? theme.WHITE_COLOR
              : theme.DARK_OVERLAYS
          }
          size={23}
        />
      </View>
      <Text style={styles.recentName}>{data && data.name.substring(0, 5)}</Text>
      {/* <Text style={styles.recentName}>''</Text> */}
    </TouchableOpacity>
  );
};

export default RecentsCard;
