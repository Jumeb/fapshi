import React, {useState} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './changePassword.style';
import {Button, Text, SquareInput, Notification} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';

const ChangePassword = props => {
  const {
    i18n,
    configurePassword,
    setConfigurePassword,
    navigation,
    user,
    token,
  } = props;

  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [conPasswordError, setConPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (password.length < 5) {
      hasError = true;
      setPasswordError(true);
    }

    if (conPassword.length < 5) {
      hasError = true;
      setConPasswordError(true);
    }

    if (newPassword.length < 5) {
      hasError = true;
      setNewPasswordError(true);
    }

    if (newPassword !== conPassword) {
      hasError = true;
      setNewPasswordError(true);
      setConPasswordError(true);
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
      oldPass: password,
      newPass: conPassword,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/reset-password`, {
      method: 'PUT',
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
        setLoading(false);

        if (statusCode === 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.passwordUpdatedSuccess'),
          });
          setTimeout(() => {
            setConfigurePassword(false);
          }, 2500);
        }

        if (statusCode === 401) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.authenticationError'),
          });
          setTimeout(() => {
            setConfigurePassword(false);
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
      isVisible={configurePassword}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setConfigurePassword(false)}
      onBackdropPress={() => setConfigurePassword(false)}
      onBackButtonPress={() => setConfigurePassword(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.passwordTitle}>
          {i18n.t('phrases.changePassword')}
        </Text>
        <Text style={styles.passwordReason}>
          {i18n.t('words.hello')} {user.username},{' '}
          {i18n.t('phrases.youAreAboutToChange')}.
        </Text>
        <View style={styles.passwordContainer}>
          <SquareInput
            title={i18n.t('phrases.oldPassword')}
            holder={'*****'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            value={password}
            setValue={text => setPassword(text)}
            errorMessage={i18n.t('phrases.passwordTooShort')}
            error={passwordError}
            toggleError={() => setPasswordError(false)}
            icon={'ios-create'}
          />
          <SquareInput
            title={i18n.t('phrases.newPassword')}
            holder={'*****'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            value={newPassword}
            setValue={text => setNewPassword(text)}
            errorMessage={i18n.t('phrases.passwordsDoNotMatch')}
            error={newPasswordError}
            toggleError={() => setNewPasswordError(false)}
            icon={'ios-create'}
          />
          <SquareInput
            title={i18n.t('phrases.confirmNewPassword')}
            holder={'*****'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            value={conPassword}
            setValue={text => setConPassword(text)}
            errorMessage={i18n.t('phrases.passwordsDoNotMatch')}
            error={conPasswordError}
            toggleError={() => setConPasswordError(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
