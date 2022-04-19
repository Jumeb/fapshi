import React, {useState} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './confirmNumber.style';
import {Button, Text, SquareInput, Notification} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL, Hyphenator} from '../../utils';

const ConfirmNumber = props => {
  const {i18n, confirm, setConfirm, user, token, number, oper} = props;

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (code.length < 5) {
      hasError = true;
      setCodeError(true);
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
      code,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/verifytopup/${oper}`, {
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
        setLoading(false);

        if (statusCode === 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.numberConfirmed'),
          });
          setTimeout(() => {
            setConfirm(false);
          }, 2500);
        }

        if (statusCode === 403) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.unexpectedError'),
          });
          setTimeout(() => {
            setConfirm(false);
          }, 2500);
        }
      })
      .catch(err => {
        if (err) {
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
      isVisible={confirm}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setConfirm(false)}
      onBackdropPress={() => setConfirm(false)}
      onBackButtonPress={() => setConfirm(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.codeTitle}>{i18n.t('phrases.confirmNumber')}</Text>
        <Text style={styles.codeReason}>
          {i18n.t('words.hello')} {user.username},{' '}
          {i18n.t('phrases.pleaseEnterTheFive')} {Hyphenator(number || 0)} .
        </Text>
        <View style={styles.codeContainer}>
          <SquareInput
            title={i18n.t('words.code')}
            holder={'1x3is'}
            type={'default'}
            capitalize={'none'}
            secure={false}
            value={code}
            setValue={text => setCode(text)}
            maxLength={5}
            errorMessage={i18n.t('phrases.codeTooShort')}
            error={codeError}
            toggleError={() => setCodeError(false)}
            icon={'ios-create'}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('words.confirm')}
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
    user: auth.user,
    token: auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNumber);
