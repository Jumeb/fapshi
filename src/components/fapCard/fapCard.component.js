import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './fapCard.styles';
import {Text} from '..';
import theme from '../../utils/theme';
import {KSeparator} from '../../utils';

const FapCard = props => {
  const {navigation, user, i18n, setPin, balance, loading, hasPin} = props;

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../utils/images/logo-full.png')}
        style={styles.cardLogo}
        imageStyle={styles.cardLogo}
      />
      <View style={styles.cardDetailsContainer}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardCurrency}>XAF</Text>
          <Text style={styles.cardAmount}>
            {loading ? '-----' : KSeparator(balance || 0)}
          </Text>
        </View>
        <View style={styles.cardIdContainer}>
          <Text style={styles.cardId}>+237 </Text>
          <Text style={styles.cardIdHidden}> * ****</Text>
          <Text style={styles.cardId}>
            {user && user?.phone && user?.phone.substr(5)}
          </Text>
        </View>
        <View style={styles.pinContainer}>
          <View style={styles.expireContainer}>
            <Text style={styles.expiresText}>{user?.username}</Text>
            <Text style={styles.expiresText}>
              {user && user?.email && user?.email.substr(0, 5)} ---------{' '}
              {user && user?.email && user?.email.substr(15)}
            </Text>
          </View>
          {hasPin && (
            <TouchableOpacity
              style={styles.pinButton}
              onPress={() => setPin(true)}>
              <Icons name="ios-create" size={16} color={theme.PRIMARY_COLOR} />
              <Text style={styles.pinText}>{i18n.t('phrases.setPin')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.circleTheme} />
    </View>
  );
};

const mapStateToProps = ({auth, i18n}) => {
  return {
    user: auth.user,
    i18n: i18n.i18n,
    hasPin: auth.hasPin,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FapCard);
