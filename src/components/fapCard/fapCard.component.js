import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './fapCard.styles';
import {Text} from '..';
import theme from '../../utils/theme';
import {BASE_URL, Hyphenator, KSeparator} from '../../utils';

const FapCard = props => {
  const {navigation, user, i18n, setPin, hasPin, token} = props;

  const [loading, setLoading] = useState(false);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let statusCode, responseJson;
    setLoading(true);

    fetch(`${BASE_URL}/getbalance`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
        Host: 'api.fapshi.com',
      },
    })
      .then(res => {
        statusCode = res.status;
        responseJson = res.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        setLoading(false);
        statusCode = res[0];
        responseJson = res[1];
        if (statusCode === 200) {
          setBalance(responseJson.balance);
        }

        if (statusCode === 401) {
        }
      })
      .catch(err => {
        if (err) {
          setLoading(false);
        }
      });
  }, [balance, token]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardAmount}>
            {loading ? '-----' : KSeparator(balance || 0)}
          </Text>
          <Text style={styles.cardCurrency}>XAF</Text>
        </View>
        <Text style={styles.cardBalanceText}>FAPSHI Balance</Text>
        <View style={styles.pinContainer}>
          <View style={styles.expireContainer}>
            <Text style={styles.expiresText}>{user?.username}</Text>
            <Text style={styles.expiresText}>
              {user && user?.email && user?.email}
            </Text>
          </View>
          {!hasPin && (
            <TouchableOpacity
              style={styles.pinButton}
              onPress={() => setPin(true)}>
              <Icons name="ios-create" size={16} color={theme.PRIMARY_COLOR} />
              <Text style={styles.pinText}>{i18n.t('phrases.setPin')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({auth, i18n}) => {
  return {
    user: auth.user,
    token: auth.token,
    i18n: i18n.i18n,
    hasPin: auth.hasPin,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FapCard);
