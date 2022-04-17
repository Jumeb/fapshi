import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
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
  Notification,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import styles from './Home.style';
import {SetPin} from '../../section';
import {BASE_URL} from '../../utils';

const Home = props => {
  const {i18n, navigation, user, token, hasPin} = props;

  const [configurePin, setConfigurePin] = useState(false);
  const [balLoading, setBalLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transfers, setTransfers] = useState([]);
  const [topups, setTopups] = useState([]);
  const [payouts, setPayouts] = useState([]);

  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  useEffect(() => {
    console.log(user);
    if (hasPin) {
      setConfigurePin(true);
    }
    fetchBalance();
    fetchTransfer();
    fetchPayouts();
    fetchTopUps();
  }, []);

  const fetchTopUps = () => {
    let statusCode, responseJson;

    fetch(`${BASE_URL}/topup`, {
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
        setBalLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setTopups(responseJson);
        }

        if (statusCode === 401) {
        }
      })
      .catch(err => {
        if (err) {
          setBalLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  const fetchPayouts = () => {
    let statusCode, responseJson;

    fetch(`${BASE_URL}/cashout`, {
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
        setBalLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setPayouts(responseJson);
        }

        if (statusCode === 401) {
        }
      })
      .catch(err => {
        if (err) {
          setBalLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  const fetchTransfer = () => {
    let statusCode, responseJson;

    fetch(`${BASE_URL}/transfer`, {
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
        setBalLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setTransfers(responseJson);
        }

        if (statusCode === 401) {
        }
      })
      .catch(err => {
        if (err) {
          setBalLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  const fetchBalance = () => {
    let statusCode, responseJson;

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
        setBalLoading(false);
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
          setBalLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar backgroundColor={theme.TRANSPARENT} />
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('phrases.myDashboard')}</Text>
      </View>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <FapCard
          setPin={setConfigurePin}
          loading={balLoading}
          balance={balance}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.funcContainer}>
          <Function
            navigation={navigation}
            title={i18n.t('phrases.topUp')}
            icon="ios-trending-up"
            color={theme.MINT_COLOR}
            onPress={() => navigation.navigate('Topup')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('words.transfer')}
            icon="ios-swap-vertical"
            color={theme.VIOLET_COLOR}
            onPress={() => navigation.navigate('Transfer')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('words.payout')}
            icon="ios-cash"
            color={theme.GREEN_COLOR}
            onPress={() => navigation.navigate('Payout')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('words.payment')}
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
          />
        </ScrollView>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>{i18n.t('words.transactions')}</Text>
          <LinearGradient
            style={styles.button}
            colors={[theme.VIOLET_COLOR + 'af', theme.PRIMARY_COLOR]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigation.navigate('Transaction')}>
              <Text style={styles.detailText}>{i18n.t('phrases.viewAll')}</Text>
              <Icons
                name="ios-document-text"
                color={theme.WHITE_COLOR}
                size={16}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          {/* <Filter yOffset={10} title={i18n.t('words.all')} active={true} /> */}
          <Filter
            yOffset={10}
            title={i18n.t('words.transfers')}
            active={activeIndex === 0}
            onPress={() => setActiveIndex(0)}
          />
          <Filter
            yOffset={10}
            title={i18n.t('phrases.topUps')}
            active={activeIndex === 1}
            onPress={() => setActiveIndex(1)}
          />
          <Filter
            yOffset={10}
            title={i18n.t('words.payouts')}
            active={activeIndex === 2}
            onPress={() => setActiveIndex(2)}
          />
          <Filter
            yOffset={10}
            title={i18n.t('words.payments')}
            active={activeIndex === 3}
            onPress={() => setActiveIndex(3)}
          />
        </ScrollView>
        <View style={styles.detailsContainer}>
          <View style={styles.circleTheme} />
          {activeIndex === 0 &&
            transfers.map((transfer, index) => (
              <Detail
                key={index}
                icon={
                  transfer.type === 'receive'
                    ? 'ios-arrow-down'
                    : 'ios-arrow-up'
                }
                color={theme.VIOLET_COLOR}
                navigation={navigation}
                data={transfer}
              />
            ))}
          {activeIndex === 1 &&
            topups.map((topup, index) => (
              <Detail
                key={index}
                icon={'ios-trending-up'}
                color={
                  topup.status.toLowerCase() === 'successful'
                    ? theme.MINT_COLOR
                    : theme.DANGER_COLOR
                }
                navigation={navigation}
                data={topup}
              />
            ))}
          {activeIndex === 2 &&
            payouts.map((payout, index) => (
              <Detail
                key={index}
                icon={'ios-cash'}
                color={
                  payout.status.toLowerCase() === 'successful'
                    ? theme.GREEN_COLOR
                    : theme.DANGER_COLOR
                }
                navigation={navigation}
                data={payout}
              />
            ))}
          {activeIndex === 3 &&
            transfers.map((transfer, index) => (
              <Detail
                key={index}
                icon={
                  transfer.type === 'receive'
                    ? 'ios-arrow-down'
                    : 'ios-arrow-up'
                }
                color={theme.VIOLET_COLOR}
                navigation={navigation}
                data={transfer}
              />
            ))}
        </View>
      </ScrollView>
      <SetPin configurePin={configurePin} setConfigurePin={setConfigurePin} />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
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
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
