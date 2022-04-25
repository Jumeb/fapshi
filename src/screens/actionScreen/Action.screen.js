import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Animated,
  Linking,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SquareInput, Text, SubmitButton, Notification} from '../../components';
import styles from './Action.style';
import {setAction, setUser, setToken} from '../../redux/actions/AuthActions';
import {AuthMail, BASE_URL, PasswordAuth} from '../../utils';
import {ConfirmEmail} from '../../section';
import theme from '../../utils/theme';

const ActionS = props => {
  const {i18n, modal, navigation} = props;
  const [signIn] = useState(new Animated.Value(-350));
  const [signUp] = useState(new Animated.Value(300));
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  useEffect(() => {
    setTimeout(() => {
      if (modal === 'signIn') {
        moveInBannersSI();
      }
      if (modal === 'signUp') {
        moveInBannersSU();
      }
    }, 300);
  }, [modal]);

  const moveInBannersSI = () => {
    Animated.timing(signIn, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(signUp, {
      toValue: 350,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const moveInBannersSU = () => {
    Animated.timing(signIn, {
      toValue: -350,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(signUp, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const animatedSignIn = {
    transform: [{translateX: signIn}],
  };
  const animatedSignUp = {
    transform: [{translateX: signUp}],
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../utils/images/logo-full.png')}
            style={styles.appLogo}
          />
        </View>
        <Animated.View style={animatedSignUp}>
          <SignUp
            i18n={i18n}
            SetAction={props.setAction}
            setNotify={setNotify}
            setNotifyMsg={setNotifyMsg}
            navigation={navigation}
            _props={props}
          />
        </Animated.View>
        <Animated.View style={[styles.levelUp, animatedSignIn]}>
          <SignIn
            i18n={i18n}
            SetAction={props.setAction}
            setNotify={setNotify}
            setNotifyMsg={setNotifyMsg}
            navigation={navigation}
            _props={props}
          />
        </Animated.View>
      </ScrollView>
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    modal: auth.actionType,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setAction, setUser, setToken}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionS);

const SignIn = props => {
  const {i18n, SetAction, setNotifyMsg, setNotify, navigation, _props} = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  let url = 'https://dashboard.fapshi.com/forgot-password';

  const changePassword = () => {
    if (url) {
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            return;
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };

  const Switch = () => {
    SetAction('signUp');
  };

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (!AuthMail(email.trim())) {
      hasError = true;
      setEmailError(true);
    }

    if (password.length < 5) {
      hasError = true;
      setPasswordError(true);
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
      password,
      email: email.trim(),
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

        if (statusCode === 200) {
          _props.setUser(responseJson);
          return navigation.navigate('Main Stack');
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
        }

        if (statusCode === 500) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.unexpectedError'),
          });
          return false;
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
    <View style={[styles.actContainer, styles.signInContainer]}>
      <Text style={styles.actText}>{i18n.t('phrases.signIn')}</Text>
      <View style={styles.formContainer}>
        <SquareInput
          title={i18n.t('words.email')}
          holder={'jondoe@yahoo.fr'}
          type={'email-address'}
          capitalize={'none'}
          secure={false}
          value={email}
          setValue={text => setEmail(text)}
          errorMessage={i18n.t('emailInvalid')}
          error={emailError}
          toggleError={() => setEmailError(false)}
          icon={'ios-mail'}
        />
        <SquareInput
          title={i18n.t('words.password')}
          holder={'*******'}
          type={'default'}
          capitalize={'none'}
          secure={true}
          value={password}
          setValue={text => setPassword(text)}
          errorMessage={i18n.t('phrases.weakPassword')}
          error={passwordError}
          toggleError={() => setPasswordError(false)}
          icon={'ios-lock-closed'}
        />
      </View>
      <SubmitButton
        loading={loading}
        title={i18n.t('phrases.signIn')}
        onPress={() => Authenticate()}
      />
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => changePassword()}>
        <Text style={styles.optionTextSmall}>
          {i18n.t('phrases.forgotPassword')}
        </Text>
      </TouchableOpacity>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>
          {i18n.t('phrases.dontHaveAnAccount')}
        </Text>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => Switch()}
          style={styles.optionAction}>
          <Text style={styles.optionAction}>{i18n.t('phrases.signUp')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circleThemeLog} />
    </View>
  );
};

const SignUp = props => {
  const {i18n, SetAction, setNotify, setNotifyMsg} = props;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [conPassword, setConPassword] = useState('');
  const [conPasswordError, setConPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const Switch = () => {
    SetAction('signIn');
  };

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (name.length < 5) {
      hasError = true;
      setNameError(true);
    }

    if (!AuthMail(email.trim())) {
      hasError = true;
      setEmailError(true);
    }

    if (number.length < 6) {
      hasError = true;
      setNumberError(true);
    }

    if (password.length < 6) {
      hasError = true;
      setPasswordError(true);
    }

    if (conPassword.length < 6) {
      setConPasswordError(true);
      hasError = true;
      setLoading(false);
    }

    if (password !== conPassword) {
      setConPasswordError(true);
      setPasswordError(true);
      setLoading(false);
      setNotify(true);
      setNotifyMsg({
        type: 'danger',
        msg: 'Please check your passwords.',
      });
      return false;
    }

    if (hasError) {
      setNotifyMsg({
        msg: i18n.t('phrases.invalidDataEntry'),
        type: 'danger',
      });
      setNotify(true);
      return;
    }

    if (!PasswordAuth(password)[0]) {
      let finalCheck = PasswordAuth(password);
      setConPasswordError(true);
      setPasswordError(true);
      setNotify(true);
      setNotifyMsg({
        type: 'danger',
        msg: finalCheck[1],
      });
      setLoading(false);
      return false;
    }

    const body = {
      username: name,
      password,
      phone: number,
      email: email.trim(),
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

        if (statusCode === 201) {
          setConfirm(true);
        }

        if (statusCode !== 201) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          return false;
        }

        if (statusCode === 500) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.unexpectedError'),
          });
          return false;
        }
      })
      .catch(err => {
        if (err) {
          setLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  return (
    <View style={[styles.actContainer, styles.signUpContainer]}>
      <Text style={styles.actText}>{i18n.t('phrases.signUp')}</Text>
      <View style={styles.formContainer}>
        <SquareInput
          title={i18n.t('words.username')}
          holder={'Jon Doe'}
          type={'default'}
          capitalize={'none'}
          secure={false}
          value={name}
          setValue={text => setName(text)}
          errorMessage={i18n.t('usernameInvalid')}
          error={nameError}
          toggleError={() => setNameError(false)}
          icon={'ios-person'}
        />
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
          title={i18n.t('phrases.mobileNumber')}
          holder={'67xxxxxxxx'}
          type={'phone-pad'}
          capitalize={'none'}
          secure={false}
          value={number}
          setValue={text => setNumber(text)}
          errorMessage={i18n.t('numberInvalid')}
          error={numberError}
          toggleError={() => setNumberError(false)}
          icon={'ios-phone-portrait'}
        />
        <SquareInput
          title={i18n.t('words.password')}
          holder={'*******'}
          type={'default'}
          capitalize={'none'}
          secure={true}
          value={password}
          setValue={text => setPassword(text)}
          errorMessage={i18n.t('phrases.weakPassword')}
          error={passwordError}
          toggleError={() => setPasswordError(false)}
          icon={'ios-lock-closed'}
        />
        <SquareInput
          title={i18n.t('phrases.confirmPassword')}
          holder={'*******'}
          type={'default'}
          capitalize={'none'}
          secure={true}
          value={conPassword}
          setValue={text => setConPassword(text)}
          errorMessage={i18n.t('phrases.weakPassword')}
          error={conPasswordError}
          toggleError={() => setConPasswordError(false)}
          icon={'ios-lock-closed'}
        />
      </View>
      <SubmitButton
        title={i18n.t('phrases.signUp')}
        onPress={() => Authenticate()}
        loading={loading}
      />
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>
          {i18n.t('phrases.alreadyHaveAnAccount')}
        </Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => Switch()}>
          <Text style={styles.optionAction}>{i18n.t('phrases.signIn')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circleThemeSign} />
      <ConfirmEmail
        confirm={confirm}
        setConfirm={setConfirm}
        username={name}
        email={email}
      />
    </View>
  );
};
