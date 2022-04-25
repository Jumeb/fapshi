import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import {
  Detail,
  FapCard,
  Filter,
  Function,
  Header,
  NavBar,
  Notification,
  RefreshButton,
  Text,
  ValidityNotification,
} from '../../components';
import {signOut, setAction} from '../../redux/actions/AuthActions';
import theme from '../../utils/theme';
import styles from './Home.style';
import {SetPin} from '../../section';
import {BASE_URL} from '../../utils';

const Home = props => {
  const {i18n, navigation, user, token, hasPin} = props;

  const [configurePin, setConfigurePin] = useState(false);
  const [balLoading, setBalLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validity, setValidity] = useState(false);

  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'success',
  });

  useEffect(() => {
    if (!hasPin) {
      setConfigurePin(true);
    }
    fetchValidity();
  }, []);

  const fetchValidity = () => {
    let statusCode;
    setLoading(true);

    fetch(`${BASE_URL}/token`, {
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
        setLoading(false);
        if (statusCode === 200) {
          return;
        }
        if (statusCode !== 200) {
          setValidity(true);
          setTimeout(() => {
            setNotifyMsg({
              type: 'success',
              msg: i18n.t('phrases.sorryTokenExpired'),
            });
          }, 1000);
          setTimeout(() => {
            setValidity(false);
            setNotify(false);
            props.signOut();
            props.setAction('signIn');
            navigation.navigate('Action');
          }, 2000);
        }
      })
      .catch(err => {
        if (err) {
          setLoading(false);
          return;
        }
      });
  };

  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar screen="My Dashboard" show={true} />
      {loading ? (
        <View style={styles.centralize}>
          <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <FapCard
            setPin={setConfigurePin}
            loading={balLoading}
            balance={balance}
          />
          <Function
            navigation={navigation}
            action={i18n.t('phrases.fapshiPay')}
            title={i18n.t('words.payment')}
          />
          <Function
            navigation={navigation}
            action={i18n.t('phrases.fapshiTopup')}
            title={i18n.t('phrases.topUp')}
            onPress={() => navigation.navigate('Topup')}
          />
          <Function
            navigation={navigation}
            action={i18n.t('phrases.fapshiTransfer')}
            title={i18n.t('words.transfer')}
            onPress={() => navigation.navigate('Transfer')}
          />
          <Function
            navigation={navigation}
            action={i18n.t('phrases.fapshiPayout')}
            title={i18n.t('words.payout')}
            onPress={() => navigation.navigate('Payout')}
          />
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('Transaction')}>
            <Text style={styles.detailText}>{i18n.t('phrases.viewAll')}</Text>
            <Icons
              name="ios-document-text"
              color={theme.WHITE_COLOR}
              size={20}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
      <SetPin configurePin={configurePin} setConfigurePin={setConfigurePin} />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
      <ValidityNotification
        validity={validity}
        setValidity={setValidity}
        info={notifyMsg}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
    token: auth.token,
    hasPin: auth.hasPin,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setAction, signOut}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
