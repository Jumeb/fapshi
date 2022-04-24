import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit';

import styles from './Transactions.style';
import {scrolling} from '../../redux/actions/ScrollActions';
import {
  Detail,
  Filter,
  Filters,
  NavBar,
  RefreshButton,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';

const Transaction = props => {
  const {i18n, navigation, yOffset, token, user} = props;

  const [text, setText] = useState('');
  const [balLoading, setBalLoading] = useState(false);
  const [tranLoading, setTransLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [topLoading, setTopLoading] = useState(false);
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
    fetchBalance();
    fetchTransfer();
    fetchPayouts();
    fetchTopUps();
  }, [topups, transfers, payouts]);

  const fetchTopUps = () => {
    let statusCode, responseJson;
    setTopLoading(true);

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
        setTopLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setTopups(responseJson);
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: responseJson.message,
          });
        }
      })
      .catch(err => {
        if (err) {
          setTopLoading(false);
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
    setPayLoading(true);

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
        setPayLoading(false);
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
          setPayLoading(false);
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
    setTransLoading(true);

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
        setTransLoading(false);
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
          setTransLoading(false);
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
    setBalLoading(true);

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

  const data = {
    labels: [
      i18n.t('words.monday').substr(0, 3),
      i18n.t('words.tuesday').substr(0, 3),
      i18n.t('words.wednesday').substr(0, 3),
      i18n.t('words.thursday').substr(0, 3),
      i18n.t('words.friday').substr(0, 3),
      i18n.t('words.saturday').substr(0, 3),
      i18n.t('words.sunday').substr(0, 3),
    ],
    datasets: [
      {
        data: [25, 45, 28, 102, 40, 20, 110],
        color: (opacity = 1) => theme.MINT_COLOR,
        strokeWidth: 2,
      },
      {
        data: [5, 10, 4, 80, 34, 15, 50],
        color: (opacity = 1) => theme.VIOLET_COLOR,
        strokeWidth: 2,
      },
      {
        data: [2, 20, 14, 10, 6, 0, 10],
        color: (opacity = 1) => theme.GREEN_COLOR,
        strokeWidth: 2,
      },
      {
        data: [3, 2, 1, 5, 10, 0.5, 10],
        color: (opacity = 1) => theme.PURPLE_COLOR,
        strokeWidth: 2,
      },
    ],
    legend: [
      i18n.t('phrases.topUps'),
      i18n.t('words.sent'),
      i18n.t('words.withdraws'),
      i18n.t('words.airtime'),
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: theme.WHITE_COLOR,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: theme.WHITE_COLOR,
    backgroundGradientToOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.PRIMARY_COLOR_MONO,
    style: styles.chartStyle,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        screen={'Transactions'}
        show={true}
        pop={true}
        search={true}
        navigation={navigation}
        setText={setText}
      />
      {tranLoading ? (
        <View style={styles.centralize}>
          <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          onScroll={e => props.scrolling(e)}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          <Filters title={i18n.t('phrases.days7')} active={true} />
          <Filters title={i18n.t('phrases.months6')} />
          <Filters title={i18n.t('phrases.year1')} />
          <Filters title={i18n.t('phrases.years5')} />
        </ScrollView>
        <LineChart
          data={data}
          width={theme.WIDTH_100 * 0.94}
          height={200}
          withInnerLines={false}
          // withHorizontalLabels={false}
          withOuterLines={false}
          // yLabelsOffset={0}
          verticalLabelRotation={0}
          chartConfig={chartConfig}
          bezier
          style={styles.chartInnerStyle}
        /> */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer2}>
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
            {/* <Filter
            yOffset={10}
            title={i18n.t('words.payments')}
            active={activeIndex === 3}
            onPress={() => setActiveIndex(3)}
          /> */}
          </ScrollView>
          <View style={styles.detailsContainer}>
            {!tranLoading && !balLoading && !payLoading && (
              <View style={styles.circleTheme} />
            )}
            {activeIndex === 0 && transfers && transfers.length >= 1
              ? transfers.map((transfer, index) => (
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
                ))
              : activeIndex === 0 &&
                (!tranLoading ? (
                  <RefreshButton
                    i18n={i18n}
                    info={
                      transfers && transfers.length === 0
                        ? i18n.t('phrases.noTransfersNow')
                        : i18n.t('phrases.noTransfers')
                    }
                    onPress={() => fetchTransfer()}
                  />
                ) : (
                  <ActivityIndicator
                    size={'small'}
                    color={theme.PRIMARY_COLOR}
                  />
                ))}
            {activeIndex === 1 && payouts && payouts.length >= 1
              ? topups.map((topup, index) => (
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
                ))
              : activeIndex === 1 &&
                (!topLoading ? (
                  <RefreshButton
                    i18n={i18n}
                    info={
                      payouts && payouts.length === 0
                        ? i18n.t('phrases.noTopupsNow')
                        : i18n.t('phrases.noTopups')
                    }
                    onPress={() => fetchTopUps()}
                  />
                ) : (
                  <ActivityIndicator
                    size={'small'}
                    color={theme.PRIMARY_COLOR}
                  />
                ))}
            {activeIndex === 2 && payouts && payouts.length >= 1
              ? payouts.map((payout, index) => (
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
                ))
              : activeIndex === 2 &&
                (!payLoading ? (
                  <RefreshButton
                    i18n={i18n}
                    info={
                      payouts && payouts.length === 0
                        ? i18n.t('phrases.noPayouts')
                        : i18n.t('phrases.noPayouts')
                    }
                    onPress={() => fetchPayouts()}
                  />
                ) : (
                  <ActivityIndicator
                    size={'small'}
                    color={theme.PRIMARY_COLOR}
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
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, scroll, auth}) => {
  return {
    i18n: i18n.i18n,
    yOffset: scroll.yOffset,
    user: auth.user,
    token: auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({scrolling}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
