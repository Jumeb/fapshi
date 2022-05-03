import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';

import styles from './payout.style';
import {
  Button,
  Divider,
  FapCard,
  NavBar,
  Notification,
  Operator,
  RecentsCard,
  RefreshButton,
  SquareInput,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {AddPayout, Details, VerifyPayout} from '../../section';
import {
  AuthMTN,
  AuthNumber,
  AuthOrange,
  BASE_URL,
  Hyphenator,
  KSeparator,
} from '../../utils';
import {
  removePayout,
  removePayoutIndex,
} from '../../redux/actions/ContactActions';

const Payout = props => {
  const {i18n, navigation, payoutsContacts, token} = props;
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [tel, setTel] = useState('');
  const [add, setAdd] = useState(false);
  const [telError, setTelError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [operator, setOperator] = useState('mtn');
  const [data, setData] = useState({});
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });
  const [payLoading, setPayLoading] = useState(false);
  const [payouts, setPayouts] = useState([]);
  const [tablePayout, setTablePayout] = useState({
    tableHead: [],
    tableData: [],
  });
  const [details, setDetails] = useState(false);
  const [detail, setDetail] = useState({});
  const [view, setView] = useState(false);

  const ShowSummary = () => {
    let hasError = false;

    if (!AuthNumber(amount) || amount.length < 1) {
      hasError = true;
      setAmountError(true);
    }

    if (operator.toLowerCase() === 'mtn') {
      console.log(123);
      if (!AuthMTN(tel)) {
        hasError = true;
        setTelError(true);
      }
    }

    if (operator.toLowerCase() === 'orange_money') {
      if (!AuthOrange(tel)) {
        hasError = true;
        setTelError(true);
      }
    }

    if (hasError) {
      setNotifyMsg({
        msg: i18n.t('phrases.invalidDataEntry'),
        type: 'danger',
      });
      setNotify(true);
      return;
    }
    const body = {
      amount,
      tel,
    };
    setData(body);
    setVerify(true);
  };

  const SetOperator = oper => {
    if (oper.toLowerCase() === 'mtn') {
      setOperator(oper);
      return;
    }
    setNotifyMsg({
      msg: i18n.t('phrases.operatorNotActive'),
      type: 'danger',
    });
    setNotify(true);
    return;
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

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
          const tableData = responseJson.map(function (payout) {
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
            tableData: tableData,
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

  const SetPayout = info => {
    setTel(info.number);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen={'Payout'}
        pop={true}
        show={true}
      />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.originText}>{i18n.t('words.from')}</Text>
        <View style={styles.cardContainer}>
          <FapCard />
        </View>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <ScrollView horizontal={true} style={styles.operatorContainer}>
          <Operator
            operator={operator}
            value={'mtn'}
            setOperator={() => SetOperator('mtn')}
          />
          <Operator
            operator={operator}
            value={'orange_money'}
            setOperator={() => SetOperator('orange_money')}
          />
        </ScrollView>
        <View style={styles.detailsContainer}>
          {/* <SquareInput
            title={i18n.t('words.email')}
            holder={'jondoe@yahoo.fr'}
            type={'email-address'}
            capitalize={'none'}
            secure={false}
            value={email}
            setValue={text => setEmail(text)}
            errorMessage={i18n.t('phrases.emailInvalid')}
            error={emailError}
            toggleError={() => setEmailError(false)}
            icon={'ios-mail'}
          /> */}
          <SquareInput
            title={i18n.t('phrases.phoneNumber')}
            holder={'Mobile Money'}
            type={'phone-pad'}
            capitalize={'none'}
            secure={false}
            value={tel}
            setValue={text => setTel(text)}
            errorMessage={i18n.t('phrases.telInvalid')}
            error={telError}
            toggleError={() => setTelError(false)}
            icon={'ios-phone-portrait'}
          />
          <SquareInput
            title={i18n.t('words.amount')}
            holder={'5000'}
            type={'numeric'}
            capitalize={'none'}
            secure={false}
            value={amount}
            setValue={text => setAmount(text)}
            errorMessage={i18n.t('phrases.amountInvalid')}
            error={amountError}
            toggleError={() => setAmountError(false)}
            icon={'ios-cash'}
          />
        </View>
        <Divider />
        <Text style={styles.recentText}>{i18n.t('words.recent')}</Text>
        <ScrollView
          style={styles.horizontalScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {payoutsContacts && payoutsContacts.length <= 5 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAdd(true)}
              style={styles.addContainer}>
              <View style={styles.addImageContainer}>
                <Icons name={'ios-add'} color={theme.PRIMARY_COLOR} size={35} />
              </View>
              <Text style={styles.addName}>{i18n.t('words.add')}</Text>
            </TouchableOpacity>
          )}
          {payoutsContacts.map((payout, index) => (
            <RecentsCard
              key={index}
              onDet={() => props.removePayoutIndex(index)}
              data={payout}
              active={tel}
              onPress={() => SetPayout(payout)}
            />
          ))}
          {payoutsContacts && payoutsContacts.length >= 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.removePayout()}
              style={styles.addContainer}>
              <View style={styles.addImageContainer}>
                <Icons
                  name={'ios-remove'}
                  color={theme.PRIMARY_COLOR}
                  size={35}
                />
              </View>
              <Text style={styles.addName}>{i18n.t('words.pop')}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.payout')}
            invert={true}
            onPress={() => ShowSummary()}
          />
        </View>
        {view && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {!payLoading && payouts.length >= 1 ? (
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
                            <MoreButton
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
              <RefreshButton
                i18n={i18n}
                info={
                  payouts && payouts.length === 0
                    ? i18n.t('phrases.noPayouts')
                    : i18n.t('phrases.noPayouts')
                }
                onPress={() => fetchPayouts()}
              />
            )}
          </ScrollView>
        )}
        <View style={styles.buttonContainer2}>
          <Button
            title={
              view
                ? i18n.t('phrases.closeTopups')
                : i18n.t('phrases.viewTopups')
            }
            onPress={() => setView(!view)}
          />
        </View>
      </ScrollView>
      <VerifyPayout
        verify={verify}
        setVerify={setVerify}
        navigation={navigation}
        data={data}
        operator={operator}
      />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
      <AddPayout add={add} setAdd={setAdd} i18n={i18n} />
      <Details details={details} setDetails={setDetails} data={detail} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, contacts, auth}) => {
  return {
    i18n: i18n.i18n,
    token: auth.token,
    payoutsContacts: contacts.payouts,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({removePayout, removePayoutIndex}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Payout);

const MoreButton = ({i18n, data, setDetail, setDetails}) => {
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
