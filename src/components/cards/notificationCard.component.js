import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import styles from './cards.styles';
import {Text} from '..';

let text1 = '';
let text2 = '';
let text3 = '';
let text4 = '';

const NotifcationCard = props => {
  const {receive, sent, pending, pay, i18n, last, index} = props;

  if (receive) {
    text1 = i18n.t('phrases.youHaveReceived');
    text2 = '2,000 XAF';
    text3 = i18n.t('words.from');
    text4 = 'Jume Brice';
  }
  if (sent) {
    text1 = i18n.t('phrases.youMadeATransferOf');
    text2 = '4,000 XAF';
    text3 = i18n.t('words.to');
    text4 = 'Jame Bond';
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
  useEffect(() => {}, []);

  return (
    <View style={[styles.noticationContainer, last && {marginBottom: 150}]}>
      <View style={styles.notificationImageContainer}>
        <Image
          source={require('../../utils/images/person.jpg')}
          imageStyle={styles.notificationImageS}
          style={styles.notificationImage}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.notificationText}>
          {text1}
          <Text style={styles.bold}> {text2} </Text>
          {text3}
          <Text style={styles.bold}> {text4} </Text>.
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
      <Text style={styles.notificationTime}>08:13 PM</Text>
      <View
        style={index % 2 === 1 ? styles.circleTheme : styles.circleThemeUp}
      />
    </View>
  );
};

export default NotifcationCard;
