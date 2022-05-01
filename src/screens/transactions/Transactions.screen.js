import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';

import styles from './Transactions.style';
import {scrolling} from '../../redux/actions/ScrollActions';
import {Filter, Filters, NavBar, RefreshButton, Text} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL, Hyphenator, KSeparator} from '../../utils';
import {Details} from '../../section';

const Transaction = props => {
  const {i18n, navigation, token, user} = props;

  const [text, setText] = useState('');
  const [balLoading, setBalLoading] = useState(false);
  const [tranLoading, setTransLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [topLoading, setTopLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transfers, setTransfers] = useState([]);
  const [topups, setTopups] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [details, setDetails] = useState(false);
  const [detail, setDetail] = useState({});
  const [tableTransfer, setTableTransfer] = useState({
    tableHead: [],
    tableData: [],
  });
  const [tablePayout, setTablePayout] = useState({
    tableHead: [],
    tableData: [],
  });
  const [tableTopups, setTableTopups] = useState({
    tableHead: [],
    tableData: [],
  });
  const [tablePayments, setTablePayments] = useState({
    tableHead: [],
    tableData: [],
  });

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
    fetchPayments();
  }, [i18n, user]);

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
          const data = responseJson.map(function (topup) {
            return [
              Hyphenator(topup.phone),
              KSeparator(topup.amount),
              KSeparator(topup.charges),
              topup.transferId,
              topup.status,
            ];
          });
          setTableTopups({
            tableHead: [
              i18n.t('words.number'),
              i18n.t('words.amount'),
              i18n.t('words.charges'),
              i18n.t('phrases.transferId'),
              i18n.t('words.more'),
            ],
            tableData: data,
          });
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
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
          const data = responseJson.map(function (payout) {
            return [
              Hyphenator(payout.depositNumber),
              KSeparator(payout.amount),
              KSeparator(payout.charges),
              payout.transferId,
              payout.status,
            ];
          });
          setTablePayout({
            tableHead: [
              i18n.t('words.number'),
              i18n.t('words.amount'),
              i18n.t('words.charges'),
              i18n.t('phrases.transferId'),
              i18n.t('words.more'),
            ],
            tableData: data,
          });
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
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

  const fetchPayments = () => {
    let statusCode, responseJson;
    setPayLoading(true);

    fetch(`${BASE_URL}/product-bought`, {
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
        setPaymentLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setPayments(responseJson);
          const data = responseJson.map(function (payment) {
            return [
              Hyphenator(payment.productName),
              KSeparator(
                payment?.amount ||
                  Number(payment?.total - payment?.deliveryFee) ||
                  payment?.total ||
                  0,
              ),
              KSeparator(payment.deliveryFee || 0),
              payment.transferId,
              payment.status,
            ];
          });
          setTablePayments({
            tableHead: [
              i18n.t('words.title'),
              i18n.t('words.amount'),
              i18n.t('words.to'),
              i18n.t('phrases.transferId'),
              i18n.t('words.more'),
            ],
            tableData: data,
          });
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
        }
      })
      .catch(err => {
        if (err) {
          setPaymentLoading(false);
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
          const data = responseJson.map(function (transfer) {
            return [
              transfer.senderName.substring(0, 20),
              transfer.amount,
              transfer.type.substring(0, 20),
              transfer.transferId.substring(0, 20),
              transfer.note.substring(0, 50),
            ];
          });
          setTableTransfer({
            tableHead: [
              i18n.t('words.name'),
              i18n.t('words.amount'),
              i18n.t('words.type'),
              i18n.t('phrases.transferId'),
              i18n.t('words.more'),
            ],
            tableData: data,
          });
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
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

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
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

  const SetActive = index => {
    setActiveIndex(index);

    if (index === 0) {
      const data = transfers.map(function (transfer) {
        return [
          transfer.senderName.substring(0, 20),
          transfer.amount,
          transfer.type.substring(0, 20),
          transfer.transferId.substring(0, 20),
          transfer.note.substring(0, 50),
        ];
      });
      setTableTransfer({
        tableHead: [
          i18n.t('words.name'),
          i18n.t('words.amount'),
          i18n.t('words.type'),
          i18n.t('phrases.transferId'),
          i18n.t('words.more'),
        ],
        tableData: data,
      });
    }
    if (index === 4) {
      const data = transfers.map(function (transfer) {
        return [
          transfer.senderName.substring(0, 20),
          transfer.amount,
          transfer.type.substring(0, 20),
          transfer.transferId.substring(0, 20),
          transfer.note.substring(0, 50),
        ];
      });
      setTableTransfer({
        tableHead: [
          i18n.t('words.name'),
          i18n.t('words.amount'),
          i18n.t('words.type'),
          i18n.t('phrases.transferId'),
          i18n.t('words.more'),
        ],
        tableData: data,
      });
    }

    if (index === 2) {
      const data = payouts.map(function (payout) {
        return [
          Hyphenator(payout.depositNumber),
          KSeparator(payout.amount),
          KSeparator(payout.charges),
          payout.transferId,
          payout.status,
        ];
      });
      setTablePayout({
        tableHead: [
          i18n.t('words.number'),
          i18n.t('words.amount'),
          i18n.t('words.charges'),
          i18n.t('phrases.transferId'),
          i18n.t('words.more'),
        ],
        tableData: data,
      });
    }

    if (index === 1) {
      const data = topups.map(function (topup) {
        return [
          Hyphenator(topup.phone),
          KSeparator(topup.amount),
          KSeparator(topup.charges),
          topup.transferId,
          topup.status,
        ];
      });
      setTableTopups({
        tableHead: [
          i18n.t('words.number'),
          i18n.t('words.amount'),
          i18n.t('words.charges'),
          i18n.t('phrases.transferId'),
          i18n.t('words.more'),
        ],
        tableData: data,
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        screen={'Transactions'}
        show={true}
        pop={true}
        // search={true}
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer2}>
            <Filter
              yOffset={10}
              title={i18n.t('words.transfers')}
              active={activeIndex === 0}
              onPress={() => SetActive(0)}
            />
            <Filter
              yOffset={10}
              title={i18n.t('phrases.topUps')}
              active={activeIndex === 1}
              onPress={() => SetActive(1)}
            />
            <Filter
              yOffset={10}
              title={i18n.t('words.payouts')}
              active={activeIndex === 2}
              onPress={() => SetActive(2)}
            />
            <Filter
              yOffset={10}
              title={i18n.t('words.payment')}
              active={activeIndex === 3}
              onPress={() => SetActive(3)}
            />
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {activeIndex === 0 && !tranLoading && transfers.length >= 1 ? (
              <Table style={styles.table}>
                <Row
                  data={tableTransfer.tableHead}
                  style={styles.headerStyle}
                  textStyle={styles.headerText}
                />
                {tableTransfer.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.rowData}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 4 ? (
                            <Button
                              i18n={i18n}
                              setDetails={setDetails}
                              setDetail={setDetail}
                              data={transfers[index]}
                            />
                          ) : (
                            cellData
                          )
                        }
                        textStyle={styles.dataText}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            ) : (
              activeIndex === 0 && (
                <RefreshButton
                  i18n={i18n}
                  info={
                    transfers && transfers.length === 0
                      ? i18n.t('phrases.noTransfersNow')
                      : i18n.t('phrases.noTransfers')
                  }
                  onPress={() => fetchTransfer()}
                />
              )
            )}
            {activeIndex === 1 && !topLoading && topups.length >= 1 ? (
              <Table style={styles.table}>
                <Row
                  data={tableTopups.tableHead}
                  style={styles.headerStyle}
                  textStyle={styles.headerText}
                />
                {tableTopups.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.rowData}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 4 ? (
                            <Button
                              i18n={i18n}
                              setDetails={setDetails}
                              setDetail={setDetail}
                              data={topups[index]}
                            />
                          ) : (
                            cellData
                          )
                        }
                        textStyle={styles.dataText}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            ) : (
              activeIndex === 1 && (
                <RefreshButton
                  i18n={i18n}
                  info={
                    topups && topups.length === 0
                      ? i18n.t('phrases.noTopupsNow')
                      : i18n.t('phrases.noTopups')
                  }
                  onPress={() => fetchTopUps()}
                />
              )
            )}
            {activeIndex === 2 && !payLoading && payouts.length >= 1 ? (
              <Table style={styles.table}>
                <Row
                  data={tablePayout.tableHead}
                  style={styles.headerStyle}
                  textStyle={styles.headerText}
                />
                {tablePayout.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.rowData}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 4 ? (
                            <Button
                              i18n={i18n}
                              setDetails={setDetails}
                              setDetail={setDetail}
                              data={payouts[index]}
                            />
                          ) : (
                            cellData
                          )
                        }
                        textStyle={styles.dataText}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            ) : (
              activeIndex === 2 && (
                <RefreshButton
                  i18n={i18n}
                  info={
                    payouts && payouts.length === 0
                      ? i18n.t('phrases.noPayoutsNow')
                      : i18n.t('phrases.noPayouts')
                  }
                  onPress={() => fetchPayouts()}
                />
              )
            )}
            {activeIndex === 3 && !paymentLoading && payments.length >= 1 ? (
              <Table style={styles.table}>
                <Row
                  data={tablePayout.tableHead}
                  style={styles.headerStyle}
                  textStyle={styles.headerText}
                />
                {tablePayout.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.rowData}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          cellIndex === 4 ? (
                            <Button
                              i18n={i18n}
                              setDetails={setDetails}
                              setDetail={setDetail}
                              data={payments[index]}
                            />
                          ) : (
                            cellData
                          )
                        }
                        textStyle={styles.dataText}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            ) : (
              activeIndex === 3 && (
                <RefreshButton
                  i18n={i18n}
                  info={
                    payments && payments.length === 0
                      ? i18n.t('phrases.noPaymentNow')
                      : i18n.t('phrases.noPayments')
                  }
                  onPress={() => fetchPayouts()}
                />
              )
            )}
          </ScrollView>
        </ScrollView>
      )}
      <Details details={details} setDetails={setDetails} data={detail} />
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

const Button = ({i18n, data, setDetail, setDetails}) => {
  const OpenDetail = () => {
    setDetail(data);
    setDetails(true);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.signOutButton}
      onPress={() => OpenDetail()}>
      <Text style={styles.signOutButtonText}>{i18n.t('words.more')}</Text>
    </TouchableOpacity>
  );
};
