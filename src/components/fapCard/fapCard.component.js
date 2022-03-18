import React from 'react';
import {View, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styles from './fapCard.styles';
import {Text} from '..';
import i18n from 'i18n-js';

const FapCard = props => {
  const {navigation} = props;

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
          <Text style={styles.cardAmount}>20,000</Text>
        </View>
        <View style={styles.cardIdContainer}>
          <Text style={styles.cardIdHidden}>**** **** ****</Text>
          <Text style={styles.cardId}>5693</Text>
        </View>
        <View style={styles.expireContainer}>
          <Text style={styles.expiresText}>{i18n.t('words.expires')}</Text>
          <Text style={styles.expiresText}>11/24</Text>
        </View>
      </View>
      <View style={styles.circleTheme} />
    </View>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FapCard);
