import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './verifyTrans.style';
import {
  Button,
  Text,
  Divider,
  SquareInput,
  Notification,
} from '../../components';
import theme from '../../utils/theme';
import {AuthMail, AuthNumber, BASE_URL, KSeparator} from '../../utils';

const VerifyTrans = props => {
  const {i18n, verify, setVerify, navigation, summary, user, token} = props;
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

    const {email, amount, note} = summary;

    if (!AuthMail(email.trim())) {
      hasError = true;
    }

    if (note.length < 5) {
      hasError = true;
    }

    if (!AuthNumber(amount)) {
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
      pin,
      note,
      email,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/transfer`, {
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

        if (statusCode === 400) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.insufficientFunds'),
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
        <Text style={styles.transTitle}>
          {i18n.t('phrases.confirmTransfer')}
        </Text>
        <Text style={styles.transFrom}>{i18n.t('phrases.transferFrom')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>{user?.email}</Text>
          {/* <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumber}>7890</Text> */}
        </View>
        <Text style={styles.originText}>FAPSHI</Text>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>{summary?.email}</Text>
          {/* <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumber}>4321</Text> */}
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.amount')}</Text>
            <Text style={styles.amountValue}>
              XAF {KSeparator(summary?.amount || 0)}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.fee')}</Text>
            <Text style={styles.amountValue}>
              XAF {KSeparator(Math.round(summary?.amount * 0.03) || 0)}
            </Text>
          </View>
          <Divider />
          <View style={styles.amountContainer}>
            <Text style={styles.amountTotal}>
              {i18n.t('phrases.totalAmount')}
            </Text>
            <Text style={styles.amountValue}>
              XAF{' '}
              {KSeparator(
                Number(summary?.amount) +
                  Number(Math.round(summary?.amount * 0.03)) || 0,
              )}
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
              icon={'ios-cash'}
            />
          </View>
          <View style={styles.amountContainer}>
            <Button
              title={
                i18n.t('words.transfer') +
                ' XAF ' +
                KSeparator(summary?.amount || 0)
              }
              invert={true}
              loading={loading}
              onPress={() => Authenticate()}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyTrans);
