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
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './topUp.style';
import {NavBar, Notification, Text} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL, Hyphenator, KSeparator} from '../../utils';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TopUp = props => {
  const {i18n, navigation, token} = props;
  const [activeOper, setActiveOper] = useState('mtn');
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });
  const [accs, setAccs] = useState({});

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
  }, []);

  const fetchTopupAccs = () => {
    let statusCode, responseJson;

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
        setLoading(false);
        statusCode = res[0];
        responseJson = res[1];
        console.log(res, 'hahaha');

        if (statusCode === 200) {
          setAccs(responseJson);
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar navigation={navigation} screen={'Topup'} pop={true} show={true} />
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
            {accs && accs.momo && accs.momo.isVerified && (
              <Text style={styles.isOperator}>
                (+237) * ***{' '}
                {Hyphenator(
                  (accs && accs.momo && accs.momo.phone.substring(5, 9)) || 0,
                )}
              </Text>
            )}
            <View style={styles.topUpButtonContainer}>
              {accs && accs.momo && accs.momo.isVerified ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.topUpButton}
                  onPress={() => console.log(123)}>
                  <Text style={styles.topUpButtonText}>
                    {i18n.t('phrases.topUp')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.topUpButton}
                  onPress={() => console.log(123)}>
                  <Text style={styles.topUpButtonText}>
                    {i18n.t('phrases.setTop')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        <View style={styles.operatorContainer}>
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
        </View>
        {activeOper.toLowerCase() === 'orange' && (
          <View
            style={[
              styles.loadingContainer,
              activeOper.toLowerCase() === 'orange'
                ? animatedHeight
                : hiddenHeight,
            ]}>
            {accs && accs.orange && accs.orange.isVerified && (
              <Text style={styles.isOperator}>
                (+237) * ***{' '}
                {Hyphenator(
                  (accs && accs.orange && accs.orange.phone.substring(5, 9)) ||
                    0,
                )}
              </Text>
            )}
            <View style={styles.topUpButtonContainer}>
              {accs && accs.orange && accs.orange.isVerified ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.topUpButton}
                  onPress={() => console.log(123)}>
                  <Text style={styles.topUpButtonText}>
                    {i18n.t('phrases.topUp')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.topUpButton}
                  onPress={() => console.log(123)}>
                  <Text style={styles.topUpButtonText}>
                    {i18n.t('phrases.setTop')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
