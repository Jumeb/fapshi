import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './verifyPayout.style';
import {
  Button,
  Text,
  Divider,
  SquareInput,
  Notification,
} from '../../components';
import theme from '../../utils/theme';
import {
  AuthMTN,
  AuthNumber,
  AuthOrange,
  BASE_URL,
  Hyphenator,
  KSeparator,
} from '../../utils';

const VerifyPayout = props => {
  const {i18n, verify, setVerify, navigation, data, operator, user, token} =
    props;
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    const {amount, tel} = data;

    if (pin.length < 5) {
      hasError = true;
      setPinError(true);
    }

    if (operator.toLowerCase() === 'mtn') {
      if (!AuthMTN(tel)) {
        hasError = true;
      }
    }

    if (operator.toLowerCase() === 'orange_money') {
      if (!AuthOrange(tel)) {
        hasError = true;
      }
    }

    if (!AuthNumber(amount) || amount.length < 2) {
      hasError = true;
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
      phone: tel,
      pin,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/cashout/${operator}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
        Host: 'api.fapshi.com',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        statusCode = res.status;
        responseJson = res.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        setLoading(false);
        statusCode = res[0];
        responseJson = res[1];
        console.log(res);

        if (statusCode === 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            msg: i18n.t('phrases.transferSuccessful'),
          });

          setTimeout(() => {
            setVerify(false);
          }, 3500);
          return;
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          setTimeout(() => {
            setVerify(false);
          }, 3500);
          return false;
        }

        if (statusCode !== 200 && statusCode !== 400) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.transferFailed'),
          });
          setTimeout(() => {
            setVerify(false);
          }, 3500);
          return false;
        }
      })
      .catch(err => {
        if (err) {
          setTimeout(() => {
            setVerify(false);
          }, 3500);
          setLoading(false);
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
    <Modal
      isVisible={verify}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.55}
      backdropColor={theme.SECONDARY_COLOR}
      swipeDirection={'down'}
      onBackdropPress={() => setVerify(false)}
      onBackButtonPress={() => setVerify(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.transTitle}>{i18n.t('phrases.confirmPayout')}</Text>
        <Text style={styles.transFrom}>{i18n.t('phrases.transferFrom')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>{user?.email}</Text>
        </View>
        <Text style={styles.originText}>FAPSHI</Text>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>{Hyphenator(data?.tel || 0)}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.amount')}</Text>
            <Text style={styles.amountValue}>
              XAF {KSeparator(data?.amount || 0)}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.fee')}</Text>
            <Text style={styles.amountValue}>{i18n.t('words.free')}</Text>
          </View>
          <Divider />
          <View style={styles.amountContainer}>
            <Text style={styles.amountTotal}>
              {i18n.t('phrases.totalAmount')}
            </Text>
            <Text style={styles.amountValue}>
              XAF {KSeparator(data?.amount || 0)}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <SquareInput
              title={i18n.t('words.pin')}
              holder={'1xys4'}
              type={'default'}
              capitalize={'none'}
              secure={true}
              value={pin}
              maxLength={5}
              setValue={text => setPin(text)}
              errorMessage={i18n.t('phrases.pinInvalid')}
              error={pinError}
              toggleError={() => setPinError(false)}
              icon={'ios-create'}
            />
          </View>
          <View style={styles.amountContainer}>
            <Button
              title={
                i18n.t('words.payout') + ' XAF ' + KSeparator(data?.amount || 0)
              }
              invert={true}
              onPress={() => Authenticate()}
              loading={loading}
            />
          </View>
        </View>
      </View>
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
    </Modal>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    token: auth.token,
    user: auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPayout);
