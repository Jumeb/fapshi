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

import styles from './transfer.style';
import {
  Button,
  Divider,
  FapCard,
  NavBar,
  Notification,
  RecentsCard,
  RefreshButton,
  SquareInput,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {AddTransfer, Details, VerifyTrans} from '../../section';
import {AuthMail, AuthNumber, BASE_URL} from '../../utils';
import {
  removeTransfer,
  removeTransferIndex,
} from '../../redux/actions/ContactActions';

const Transfer = props => {
  const {i18n, navigation, transfersContacts, token} = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [add, setAdd] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });
  const [details, setDetails] = useState(false);
  const [detail, setDetail] = useState({});
  const [view, setView] = useState(false);
  const [tranLoading, setTransLoading] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [tableTransfer, setTableTransfer] = useState({
    tableHead: [],
    tableData: [],
  });

  useEffect(() => {
    fetchTransfer();
  }, []);

  const ShowSummary = () => {
    let hasError = false;

    if (!AuthMail(email.trim())) {
      hasError = true;
      setEmailError(true);
    }

    if (note.length < 5) {
      hasError = true;
      setNoteError(true);
    }

    if (!AuthNumber(amount) || amount.length < 1) {
      hasError = true;
      setAmountError(true);
    }

    if (hasError) {
      setNotifyMsg({
        msg: i18n.t('phrases.invalidDataEntry'),
        type: 'danger',
      });
      setNotify(true);
      setLoading(false);
      return;
    }
    const body = {
      amount,
      note,
      email,
    };
    setData(body);
    setVerify(true);
  };

  const SetTransfer = info => {
    setEmail(info.email);
  };

  const fetchTransfer = () => {
    let statusCode, responseJson;
    setTransLoading(true);
    console.log(1234589899);

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
          console.log(res);
          const tableData = responseJson.map(function (transfer) {
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen={'Transfer'}
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
        <View style={styles.detailsContainer}>
          <SquareInput
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
          <SquareInput
            title={i18n.t('words.note')}
            holder={'Ex: Money for bills'}
            type={'default'}
            capitalize={'none'}
            secure={false}
            value={note}
            setValue={text => setNote(text)}
            errorMessage={i18n.t('phrases.noteInvalid')}
            error={noteError}
            toggleError={() => setNoteError(false)}
            icon={'ios-document-text'}
          />
        </View>
        <Divider />
        <Text style={styles.recentText}>{i18n.t('words.recent')}</Text>
        <ScrollView
          style={styles.horizontalScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {transfersContacts && transfersContacts.length <= 5 && (
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

          {transfersContacts.map((transfer, index) => (
            <RecentsCard
              key={index}
              data={transfer}
              onDet={() => props.removeTransferIndex(index)}
              active={email}
              onPress={() => SetTransfer(transfer)}
            />
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.transfer')}
            invert={true}
            onPress={() => ShowSummary()}
          />
        </View>
        {view && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {!tranLoading && transfers.length >= 1 ? (
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
                            <MoreButton
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
              <RefreshButton
                i18n={i18n}
                info={
                  transfers && transfers.length === 0
                    ? i18n.t('phrases.noTransfersNow')
                    : i18n.t('phrases.noTransfers')
                }
                onPress={() => fetchTransfer()}
              />
            )}
          </ScrollView>
        )}
        <View style={styles.buttonContainer2}>
          <Button
            title={
              view
                ? i18n.t('phrases.closeTransfers')
                : i18n.t('phrases.viewTransfers')
            }
            onPress={() => setView(!view)}
          />
        </View>
      </ScrollView>
      <VerifyTrans
        verify={verify}
        setVerify={setVerify}
        navigation={navigation}
        summary={data}
      />
      <AddTransfer add={add} setAdd={setAdd} i18n={i18n} />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
      <Details details={details} setDetails={setDetails} data={detail} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, contacts, auth}) => {
  return {
    i18n: i18n.i18n,
    token: auth.token,
    transfersContacts: contacts.transfers,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({removeTransfer, removeTransferIndex}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);

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
