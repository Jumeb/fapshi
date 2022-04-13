import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './Settings.style';
import {Header, NavBar, SwitchButton, Text} from '../../components';
import theme from '../../utils/theme';

const Settings = props => {
  const {i18n, navigation} = props;
  const [notify, setNotify] = useState(false);
  const [appNotify, setAppNotify] = useState(true);
  const [payouts, setPayouts] = useState(false);
  const [payments, setPayments] = useState(false);
  const [topUps, setTopUps] = useState(true);

  const Notifications = () => {
    setNotify(!notify);
  };

  const Payouts = () => {
    setPayouts(!payouts);
  };

  const Payments = () => {
    setPayments(!payments);
  };

  const TopUp = () => {
    setTopUps(!topUps);
  };

  const AppNotifications = () => {
    setAppNotify(!appNotify);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        screen={'Settings'}
        show={true}
        pop={false}
        navigation={navigation}
        search={false}
        // setText={setText}
      />
      {/* <Header /> */}
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Icons
            name="ios-notifications-outline"
            size={17}
            color={theme.DARK_GREY}
          />
          <Text style={styles.headerTitle}>
            {i18n.t('words.notifications')}
          </Text>
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.functionTitle}>
            {i18n.t('words.notifications')}
          </Text>
          <SwitchButton invert={notify} onPress={() => Notifications()} />
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.functionTitle}>
            {i18n.t('phrases.appNotifications')}
          </Text>
          <SwitchButton invert={appNotify} onPress={() => AppNotifications()} />
        </View>
        <View style={styles.headerContainer}>
          <Icons name="ios-mail-outline" size={17} color={theme.DARK_GREY} />
          <Text style={styles.headerTitle}>
            {i18n.t('phrases.emailNotifications')}
          </Text>
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.functionTitle}>
            {i18n.t('phrases.successfulPayments')}
          </Text>
          <SwitchButton invert={payments} onPress={() => Payments()} />
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.functionTitle}>{i18n.t('phrases.topUps')}</Text>
          <SwitchButton invert={topUps} onPress={() => TopUp()} />
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.functionTitle}>{i18n.t('words.payouts')}</Text>
          <SwitchButton invert={payouts} onPress={() => Payouts()} />
        </View>
        <View style={styles.headerContainer}>
          <Icons name="ios-create-outline" size={17} color={theme.DARK_GREY} />
          <Text style={styles.headerTitle}>{i18n.t('words.more')}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.functionContainer}
          onPress={() => navigation.navigate('Language')}>
          <Text style={styles.functionTitle}>{i18n.t('words.language')}</Text>
          <View>
            <Icons
              name="ios-chevron-forward"
              size={18}
              color={theme.LIGHT_GREY}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.functionContainer}>
          <Text style={styles.functionTitle}>{i18n.t('words.country')}</Text>
          <View>
            <Icons
              name="ios-chevron-forward"
              size={18}
              color={theme.LIGHT_GREY}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.functionContainer}>
          <Text style={styles.functionTitle}>{i18n.t('phrases.rateUs')}</Text>
          <View>
            <Icons
              name="ios-chevron-forward"
              size={18}
              color={theme.LIGHT_GREY}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.functionContainer}>
          <Text style={styles.functionTitle}>{i18n.t('words.share')}</Text>
          <View>
            <Icons
              name="ios-chevron-forward"
              size={18}
              color={theme.LIGHT_GREY}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
