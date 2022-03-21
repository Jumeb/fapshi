import React from 'react';
import {SafeAreaView, StatusBar, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Notifications.style';
import {Text} from '../../components';
import theme from '../../utils/theme';

const Notifications = props => {
  const {i18n} = props;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.TRANSPARENT} />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[theme.PRIMARY_COLOR, theme.PRIMARY_COLOR_MONO]}
          style={styles.roundContainer}>
          <Image
            style={styles.logoBackground}
            imageStyle={styles.logoBackground}
            source={require('../../utils/images/logo-full.png')}
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
