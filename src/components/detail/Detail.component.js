import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Moment from 'react-moment';

import {Text} from '..';
import {Hyphenator, KSeparator} from '../../utils';
import theme from '../../utils/theme';
import styles from './Detail.styles';

const Details = props => {
  const {i18n, navigation, icon, color, data} = props;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.mainContainer}>
      <Text style={styles.title}>
        {data?.senderName && data?.senderName}
        {data?.depositNumber && Hyphenator(data?.depositNumber || 0)}
      </Text>
      <View style={styles.dataContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountValue}>
            {i18n.t('words.amount')}: {KSeparator(data.amount || 0)}
          </Text>
          <Text style={styles.amountCurrency}>XAF</Text>
        </View>
        <Text style={styles.infoText}>
          {data?.type ? i18n.t('words.type') : i18n.t('words.charges')}:
          {data.type || KSeparator(data?.charges || 0)}
        </Text>
        <Text style={styles.infoText}>
          {i18n.t('phrases.transferId')}: {data.transferId}
        </Text>
        {data?.note && (
          <Text style={styles.infoText}>
            {i18n.t('words.note')}: {data.note}
          </Text>
        )}
        {data?.medium && (
          <Text style={styles.infoText}>
            {i18n.t('words.medium')}: {data.medium}
          </Text>
        )}
      </View>
      <View style={styles.dateContainer}>
        <Moment style={styles.dateValue} element={Text} fromNow>
          {data?.date || data?.createdAt}
        </Moment>
      </View>
      {data?.status && (
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
      )}
    </TouchableOpacity>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(Details);
