import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styles from './Payment.style';
import {
  Button,
  Divider,
  FapCard,
  NavBar,
  SquareInput,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';
import {VerifyPayment} from '../../section';

const Payment = props => {
  const {navigation, i18n, user, token} = props;

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    let hasError = false;
    let statusCode, responseJson;
    setLoading(true);

    if (code.length < 1) {
      hasError = true;
      setCodeError(true);
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
      tranferId: code,
    };

    fetch(`${BASE_URL}/transdetails/${code}`, {
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
        console.log(res, '123');

        if (statusCode === 200) {
          setVerify(true);
          setData(responseJson);
          return;
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: responseJson.message,
          });
          setTimeout(() => {
            setLoading(false);
          }, 3500);
          return false;
        }
      })
      .catch(err => {
        if (err) {
          setTimeout(() => {
            setLoading(false);
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
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen={'Payment'}
        pop={true}
        show={true}
      />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}>
        <Text style={styles.originText}>{i18n.t('words.from')}</Text>
        <View style={styles.cardContainer}>
          <FapCard />
        </View>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <View style={styles.detailsContainer}>
          <SquareInput
            title={i18n.t('words.code')}
            holder={'DXi294s'}
            type={'default'}
            capitalize={'none'}
            secure={false}
            value={code}
            setValue={text => setCode(text)}
            error={codeError}
            toggleError={() => setCodeError(false)}
            icon={'ios-code'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.pay')}
            invert={true}
            onPress={() => Authenticate()}
          />
        </View>
      </ScrollView>
      <VerifyPayment verify={verify} setVerify={setVerify} data={data} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({auth, i18n}) => {
  return {
    user: auth.user,
    token: auth.token,
    i18n: i18n.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
