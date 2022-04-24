import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './topUp.style';
import {
  Button,
  NavBar,
  Notification,
  SquareInput,
  Text,
  Divider,
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
import {ConfirmNumber} from '../../section';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TopUp = props => {
  const {i18n, navigation, token} = props;
  const [activeOper, setActiveOper] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [notify, setNotify] = useState(false);
  const [accsLoad, setAccsLoad] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });
  const [accs, setAccs] = useState({});
  const [tel, setTel] = useState('');
  const [telError, setTelError] = useState(false);

  const animatedHeight = {
    height: 'auto',
    opacity: 1,
  };

  const hiddenHeight = {
    height: 0,
    opacity: 0,
  };

  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      500,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity,
    ),
  );

  useEffect(() => {
    fetchTopupAccs();
  }, [accs]);

  const fetchTopupAccs = () => {
    let statusCode, responseJson;
    setAccsLoad(true);

    fetch(`${BASE_URL}/topupacc`, {
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
        setAccsLoad(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setAccs(responseJson);
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
          setAccsLoad(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

  const AuthenticateTopUP = () => {
    let hasError = false;
    setLoading(true);

    if (!AuthNumber(tel) || tel.length < 2) {
      hasError = true;
      setTelError(true);
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
      amount: Number(tel),
    };

    let statusCode, responseJson;

    fetch(`${BASE_URL}/topup/${activeOper}`, {
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

        if (statusCode === 200) {
          navigation.navigate('Topup Notifcation', {amount: tel});
          return;
        }

        if (statusCode === 401) {
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

  const AuthenticateAddTopUp = () => {
    let hasError = false;
    setLoading(true);

    if (activeOper.toLowerCase() === 'mtn') {
      if (!AuthMTN(tel)) {
        hasError = true;
        setTelError(true);
      }
    }

    if (activeOper.toLowerCase() === 'orange') {
      if (!AuthOrange(tel)) {
        hasError = true;
        setTelError(true);
      }
    }

    if (hasError) {
      setLoading(false);
      setNotifyMsg({
        msg: i18n.t('phrases.invalidDataEntry'),
        type: 'danger',
      });
      setNotify(true);
      return;
    }

    const body = {
      phone: tel,
    };

    let statusCode, responseJson;

    fetch(`${BASE_URL}/addtopup/${activeOper}`, {
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
          setConfirm(true);
          return;
        }

        if (statusCode === 400) {
          setLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            msg: i18n.t('phrases.topUpNumberExist'),
          });
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
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar navigation={navigation} screen={'Topup'} pop={true} show={true} />
      {accsLoad ? (
        <View style={styles.centralize}>
          <Text />
          <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
      ) : (
        <ScrollView style={styles.scrollview}>
          <View style={styles.operatorContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.operatorButton}
              onPress={() => setActiveOper('mtn')}>
              <Image
                source={require('../../utils/images/mtn-2.png')}
                style={styles.operatorImage}
              />
              {accs && accs.momo && accs.momo.isVerified ? (
                <Text style={styles.operatorDetail}>{i18n.t('words.set')}</Text>
              ) : (
                <Text style={styles.operatorDetailNot}>
                  {i18n.t('phrases.notSet')}
                </Text>
              )}
              <Icons
                name={
                  activeOper.toLowerCase() === 'mtn'
                    ? 'ios-chevron-down-outline'
                    : 'ios-chevron-forward-outline'
                }
                size={16}
                color={theme.PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
          {activeOper.toLowerCase() === 'mtn' && (
            <View
              style={[
                styles.loadingContainer,
                activeOper.toLowerCase() === 'mtn'
                  ? animatedHeight
                  : hiddenHeight,
              ]}>
              {accs && accs.momo && accs.momo.isVerified ? (
                <View style={styles.topUpContainer}>
                  <Text style={styles.isOperator}>
                    {i18n.t('phrases.activeNumber')}:{' '}
                    {Hyphenator((accs && accs.momo && accs.momo.phone) || 0)}
                  </Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {i18n.t('words.amount')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF {KSeparator(tel || 0)}
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {i18n.t('words.charges')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF {KSeparator(Math.ceil(tel * 0.0122) || 0)}
                    </Text>
                  </View>
                  <Divider />
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountTotal}>
                      {i18n.t('phrases.totalAmount')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF{' '}
                      {KSeparator(Number(tel) + Math.ceil(tel * 0.0122) || 0)}
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <SquareInput
                      title={i18n.t('words.amount')}
                      holder={'5,000'}
                      type={'phone-pad'}
                      capitalize={'none'}
                      secure={false}
                      value={tel}
                      setValue={text => setTel(text)}
                      errorMessage={i18n.t('phrases.telInvalid')}
                      error={telError}
                      toggleError={() => setTelError(false)}
                      icon={'ios-cash'}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.topUpContainer}>
                  <Text style={styles.isOperator}>
                    {i18n.t('phrases.addNumber')}
                  </Text>
                  <SquareInput
                    title={i18n.t('phrases.phoneNumber')}
                    holder={'6-xxxxxxx'}
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
                </View>
              )}
              <View style={styles.topUpButtonContainer}>
                {accs && accs.momo && accs.momo.isVerified ? (
                  <View style={styles.topUpButtonContainer}>
                    {/* <Button
                        title={i18n.t('words.edit')}
                        onPress={() => console.log(123)}
                      /> */}
                    <Button
                      title={i18n.t('phrases.topUp')}
                      invert={true}
                      onPress={() => AuthenticateTopUP()}
                      loading={loading}
                    />
                  </View>
                ) : (
                  <Button
                    title={i18n.t('phrases.setTop')}
                    onPress={() => AuthenticateAddTopUp()}
                    loading={loading}
                  />
                )}
              </View>
            </View>
          )}
          {/* Orange */}
          {/* <View style={styles.operatorContainer}>
            <TouchableOpacity
              style={styles.operatorButton}
              onPress={() => setActiveOper('orange')}>
              <Image
                source={require('../../utils/images/orange_money.png')}
                style={styles.operatorImage}
              />
              {accs && accs.orange && accs.orange.isVerified ? (
                <Text style={styles.operatorDetail}>{i18n.t('words.set')}</Text>
              ) : (
                <Text style={styles.operatorDetailNot}>
                  {i18n.t('phrases.notSet')}
                </Text>
              )}
              <Icons
                name={
                  activeOper.toLowerCase() === 'orange'
                    ? 'ios-chevron-down-outline'
                    : 'ios-chevron-forward-outline'
                }
                size={16}
                color={theme.PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View> */}
          {/* {activeOper.toLowerCase() === 'orange' && (
            <View
              style={[
                styles.loadingContainer,
                activeOper.toLowerCase() === 'orange'
                  ? animatedHeight
                  : hiddenHeight,
              ]}>
              {accs && accs.orange && accs.orange.isVerified ? (
                <View style={styles.topUpContainer}>
                  <Text style={styles.isOperator}>
                    {i18n.t('phrases.activeNumber')}:{' '}
                    {Hyphenator(
                      (accs && accs.orange && accs.orange.phone) || 0,
                    )}
                  </Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {i18n.t('words.amount')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF {KSeparator(tel || 0)}
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {i18n.t('words.charges')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF {KSeparator(Math.ceil(tel * 0.0122) || 0)}
                    </Text>
                  </View>
                  <Divider />
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountTotal}>
                      {i18n.t('phrases.totalAmount')}
                    </Text>
                    <Text style={styles.amountValue}>
                      XAF{' '}
                      {KSeparator(Number(tel) + Math.ceil(tel * 0.0122) || 0)}
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <SquareInput
                      title={i18n.t('words.amount')}
                      holder={'5,000'}
                      type={'phone-pad'}
                      capitalize={'none'}
                      secure={false}
                      value={tel}
                      setValue={text => setTel(text)}
                      errorMessage={i18n.t('phrases.telInvalid')}
                      error={telError}
                      toggleError={() => setTelError(false)}
                      icon={'ios-cash'}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.topUpContainer}>
                  <Text style={styles.isOperator}>
                    {i18n.t('phrases.addNumber')}
                  </Text>
                  <SquareInput
                    title={i18n.t('phrases.phoneNumber')}
                    holder={'Orange Money'}
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
                </View>
              )}
              <View style={styles.topUpButtonContainer}>
                {accs && accs.orange && accs.orange.isVerified ? (
                  <View style={styles.topUpButtonContainer}>
                    <Button
                        title={i18n.t('words.edit')}
                        onPress={() => console.log(123)}
                      />
                    <Button
                      title={i18n.t('phrases.topUp')}
                      invert={true}
                      onPress={() => AuthenticateTopUP()}
                    />
                  </View>
                ) : (
                  <Button
                    title={i18n.t('phrases.setTop')}
                    onPress={() => AuthenticateAddTopUp()}
                    loading={loading}
                  />
                )}
              </View>
            </View>
          )} */}
        </ScrollView>
      )}
      <ConfirmNumber
        confirm={confirm}
        setConfirm={setConfirm}
        number={tel}
        oper={activeOper}
      />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
