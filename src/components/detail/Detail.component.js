import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Moment from 'react-moment';

import {Text} from '..';
import {KSeparator} from '../../utils';
import theme from '../../utils/theme';
import styles from './Detail.styles';

const Details = props => {
  const {i18n, navigation, icon, color, data} = props;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.mainContainer}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountCurrency}>XAF</Text>
        <Text style={styles.amountValue}>{KSeparator(data.amount || 0)}</Text>
      </View>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Icons name={icon} color={theme.WHITE_COLOR} size={13} />
      </View>
      <View style={styles.personContainer}>
        <Image
          source={require('../../utils/images/logo.png')}
          style={styles.personImage}
          imageStyle={styles.personImage}
        />
        <Text style={styles.personInitials}>JB</Text>
      </View>
      <View style={styles.dateContainer}>
        <Moment style={styles.dateValue} element={Text} fromNow>
          {data?.date || data?.createdAt}
        </Moment>
      </View>
      {/* {data?.status && (
        <Text
          style={[
            styles.status,
            data?.status.toLowerCase() === 'successful'
              ? styles.statusSuccess
              : styles.statusFailed,
          ]}>
          {data?.status.toLowerCase() === 'successful'
            ? i18n.t('words.successful')
            : i18n.t('words.failed')}
        </Text>
      )} */}
    </TouchableOpacity>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(Details);
