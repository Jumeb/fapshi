import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RNLocalize from 'react-native-localize';

import styles from './Splash.style';
import {setLanguage} from '../../redux/actions/TranslationAction';
import {setUser, setToken, setPin} from '../../redux/actions/AuthActions';
import {setPayouts, setTransfers} from '../../redux/actions/ContactActions';
import {BASE_URL, Storage} from '../../utils';
import theme from '../../utils/theme';

let currentDeviceLocale = RNLocalize.getLocales()[0];

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isFirstTime: true,
      opacity: new Animated.Value(0.09),
      animate: false,
      loading: true,
      validity: false,
    };
  }

  increaseOpacity = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  };

  FetchValidity = () => {
    let statusCode;
    this.setState({loading: true});

    fetch(`${BASE_URL}/token`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.token,
        Host: 'api.fapshi.com',
      },
    })
      .then(res => {
        statusCode = res.status;
        this.setState({loading: false});
        if (statusCode === 200) {
          return;
        }
        if (statusCode !== 200) {
          this.setState({validity: true});
        }
      })
      .catch(err => {
        if (err) {
          this.setState({loading: false});
          return;
        }
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: true});
      this.increaseOpacity();
    }, 500);

    this.FetchValidity();

    this.SetDeviceLanguage();

    Storage.load({key: 'USER'})
      .then(user => {
        this.props.setUser(user);
      })
      .catch(err => {
        if (err) {
          this.props.setUser({});
        }
      });

    Storage.load({key: 'PAYOUTS'})
      .then(payouts => {
        this.props.setPayouts(payouts);
      })
      .catch(err => {
        if (err) {
          this.props.setPayouts([]);
        }
      });

    Storage.load({key: 'TRANSFERS'})
      .then(transfers => {
        this.props.setTransfers(transfers);
      })
      .catch(err => {
        if (err) {
          this.props.setTransfers([]);
        }
      });

    Storage.load({key: 'TOKEN'})
      .then(token => this.props.setToken(token))
      .catch(err => {
        if (err) {
          this.props.setToken('');
        }
      });
    Storage.load({key: 'HasPin'})
      .then(pin => this.props.setPin({value: pin}))
      .catch(err => {
        if (err) {
          this.props.setPin({value: false});
        }
      });

    Storage.load({key: 'isFirstTime'})
      .then(res => {
        if (res.value) {
          this.setState({isFirstTime: true});
        } else {
          this.setState({isFirstTime: false});
        }
      })
      .catch(e => {
        this.setState({isFirstTime: true});
        Storage.storeInfo('isFirstTime', {value: true});
      });

    setTimeout(() => {
      if (!this.state.loading && !this.state.isFirstTime) {
        return this.props.navigation.navigate('Main Stack');
      }
      this.props.navigation.navigate('Welcome');
    }, 4000);
  }

  SetDeviceLanguage = async () => {
    try {
      var locale = await Storage.load({key: 'LOCALE'});
      if (locale && locale !== currentDeviceLocale.languageCode) {
        this.props.setLanguage(locale);
      } else {
        let deviceLocale = currentDeviceLocale.languageCode;
        this.props.setLanguage(deviceLocale);
      }
    } catch (e) {
      var locale = currentDeviceLocale.languageCode;
      this.props.setLanguage(locale);
    }
  };

  render() {
    const animatedOpacity = {
      opacity: this.state.opacity,
      transform: [{scale: this.state.opacity}],
    };
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View style={styles.mainContainer}>
          <Animated.View style={[styles.logoContainer, animatedOpacity]}>
            <Image
              source={require('../../utils/images/logo-full.png')}
              style={styles.appLogo}
            />
          </Animated.View>
          {(this.state.isFirstTime ||
            !this.state.validity ||
            this.state.loading) && (
            <ActivityIndicator size="small" color={theme.PRIMARY_COLOR} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
    token: auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {setLanguage, setUser, setToken, setPayouts, setTransfers, setPin},
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
