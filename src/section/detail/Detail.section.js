import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Moment from 'react-moment';

import {Button, Text} from '../../components';
import {Hyphenator, KSeparator} from '../../utils';
import theme from '../../utils/theme';
import styles from './Detail.styles';

const Details = props => {
  const {i18n, data, setDetails, details} = props;

  return (
    <Modal
      isVisible={details}
      style={styles.modalContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setDetails(false)}
      onBackdropPress={() => setDetails(false)}
      onBackButtonPress={() => setDetails(false)}>
      <TouchableOpacity activeOpacity={0.8} style={styles.mainContainer}>
        <Text style={styles.title}>
          {data?.senderName && data?.senderName}
          {data?.depositNumber ||
            (data?.phone &&
              Hyphenator(data?.depositNumber || data?.phone || 0))}
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
          <Text style={styles.dateValue} element={Text} fromNow>
            {new Date(data.date || data.createdAt).toLocaleDateString() +
              ' at ' +
              new Date(data.date || data.createdAt).toLocaleTimeString([], {
                timeStyle: 'short',
              })}
          </Text>
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
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.close')}
            invert={true}
            onPress={() => setDetails(false)}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(Details);
