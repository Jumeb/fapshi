import React, {useState} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './setPin.style';
import {Button, Text, SquareInput, Notification} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';

const SetPin = props => {
  const {i18n, configurePin, setConfigurePin, navigation, user, token} = props;

  const [pin, setPin] = useState('');
  const [conPin, setConPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [conPinError, setConPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (pin.length < 5) {
      hasError = true;
      setPinError(true);
    }

    if (conPin.length < 5) {
      hasError = true;
      setConPinError(true);
    }

    if (pin !== conPin) {
      hasError = true;
      setPinError(true);
      setConPinError(true);
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
      pin,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/addpin`, {
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
            msg: i18n.t('phrases.pinCreatedSuccess'),
          });
          setTimeout(() => {
            setConfigurePin(false);
          }, 2500);
        }

        if (statusCode === 403) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pinHasBeenCreated'),
          });
          setTimeout(() => {
            setConfigurePin(false);
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
      isVisible={configurePin}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setConfigurePin(false)}
      onBackdropPress={() => setConfigurePin(false)}
      onBackButtonPress={() => setConfigurePin(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.pinTitle}>{i18n.t('phrases.setPin')}</Text>
        <Text style={styles.pinReason}>
          {i18n.t('words.hello')} {user.username},{' '}
          {i18n.t('phrases.pleaseYouNeedToSet')}.
        </Text>
        <View style={styles.pinContainer}>
          <SquareInput
            title={i18n.t('words.pin')}
            holder={'*****'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            value={pin}
            setValue={text => setPin(text)}
            maxLength={5}
            errorMessage={i18n.t('phrases.pinTooShort')}
            error={pinError}
            toggleError={() => setPinError(false)}
            icon={'ios-create'}
          />
          <SquareInput
            title={i18n.t('phrases.confirmPin')}
            holder={'*****'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            value={conPin}
            maxLength={5}
            setValue={text => setConPin(text)}
            errorMessage={i18n.t('phrases.pinsDoNotMatch')}
            error={conPinError}
            toggleError={() => setConPinError(false)}
            icon={'ios-create'}
          />
          <Button
            title={i18n.t('words.confirm')}
            invert={true}
            onPress={() => Authenticate()}
            loading={loading}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(SetPin);
