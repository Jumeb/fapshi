import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './cards.styles';
import {Text} from '..';
import {searchMsg} from '../../utils';
import Moment from 'react-moment';
import theme from '../../utils/theme';
import {ConfirmDelete} from '../../section';

const NotifcationCard = props => {
  const {pay, i18n, last, index, notif, setInfo, setConfirm} = props;

  const Authenticate = data => {
    setConfirm(true);
    setInfo(data);
  };
  useEffect(() => {}, []);

  return (
    <View style={[styles.noticationContainer, last && {marginBottom: 150}]}>
      <View style={styles.containerText}>
        <Text style={styles.notificationTitle}>{notif.title}</Text>
        <Text style={styles.notificationText}>{notif.message}</Text>
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
