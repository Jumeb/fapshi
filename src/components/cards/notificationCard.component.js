import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './cards.styles';
import {Text} from '..';
import {searchMsg} from '../../utils';
import Moment from 'react-moment';
import theme from '../../utils/theme';
import {ConfirmDelete} from '../../section';

let text1 = '';
let text2 = '';
let text3 = '';
let text4 = '';

const NotifcationCard = props => {
  const {pending, pay, i18n, last, index, notif, setInfo, setConfirm} = props;
  let cashOutIndex, receiveIndex, fromIndex, xafIndex, icon;
  cashOutIndex = searchMsg('cashout', notif.message);
  receiveIndex = searchMsg('received', notif.message);
  xafIndex = searchMsg('xaf', notif.message);
  fromIndex = searchMsg('from', notif.message);
  icon = 'ios-create';

  if (receiveIndex >= 0) {
    text1 = i18n.t('phrases.youHaveReceived');
    text2 = notif.message.substring(receiveIndex + 8, xafIndex) + ' XAF';
    text3 = i18n.t('words.from');
    text4 =
      notif.message
        .substring(fromIndex + 5, fromIndex + 20)
        .split(' ')[0]
        .trim(' ') + '.';
    icon = 'ios-arrow-down';
  }
  if (cashOutIndex >= 0) {
    text1 = 'You successfully cashed out'; //i18n.t('phrases.youMadeATransferOf');
    text2 = notif.message.substring(cashOutIndex + 8, xafIndex) + ' XAF.';
    icon = 'ios-cash';
  }
  if (pay) {
    text1 = '';
    text2 = 'James Bond';
    text3 = i18n.t('phrases.requestAPaymentOf');
    text4 = '3,000 XAF';
  }
  if (pending) {
    text1 = i18n.t('phrases.yourPaymentOf');
    text2 = '3,000 XAF';
    text3 = 'to James Bond is';
    text4 = i18n.t('words.pending');
  }

  const Authenticate = data => {
    setConfirm(true);
    setInfo(data);
  };
  useEffect(() => {}, []);

  return (
    <View style={[styles.noticationContainer, last && {marginBottom: 150}]}>
      <View style={styles.notificationImageContainer}>
        <View style={styles.notificationIcon}>
          <Icons name={icon} size={24} color={theme.PRIMARY_COLOR} />
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.notificationText}>
          {text1}
          <Text style={styles.bold}> {text2} </Text>
          {text3}
          <Text style={styles.bold}> {text4} </Text>
        </Text>
      </View>
      {pay && (
        <View style={styles.notificationButtonContainer}>
          <TouchableOpacity style={styles.noticationButton} activeOpacity={0.8}>
            <Text style={styles.notificationButtonText}>
              {i18n.t('words.pay')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Moment style={styles.notificationTime} element={Text} fromNow>
        {notif?.date || notif?.createdAt}
      </Moment>
      <View
        style={index % 2 === 1 ? styles.circleTheme : styles.circleThemeUp}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        activeOpacity={0.8}
        onPress={() => Authenticate(notif)}>
        <Icons name="ios-trash" size={14} color={theme.DANGER_COLOR} />
      </TouchableOpacity>
    </View>
  );
};

export default NotifcationCard;
