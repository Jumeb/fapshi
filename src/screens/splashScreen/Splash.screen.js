import React, {Component} from 'react';
import {Image, SafeAreaView, StatusBar, View, Animated} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RNLocalize from 'react-native-localize';

import styles from './Splash.style';
import {setLanguage} from '../../redux/actions/TranslationAction';
import {setUser, setToken} from '../../redux/actions/AuthActions';
// import {Text} from '../../components';
// import {addToCart} from '../../redux/actions/CartAction';
// import {addToFavourites} from '../../redux/actions/FavouritesActions';
import {Storage} from '../../utils';

let currentDeviceLocale = RNLocalize.getLocales()[0];

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isFirstTime: true,
      upF: new Animated.Value(180),
      upA: new Animated.Value(150),
      upP: new Animated.Value(120),
      upS: new Animated.Value(90),
      upH: new Animated.Value(60),
      upI: new Animated.Value(30),
      topBB: new Animated.Value(-130),
      topBC: new Animated.Value(-200),
      bottomBB: new Animated.Value(70),
      bottomBC: new Animated.Value(200),
      opacity: new Animated.Value(0.09),
      animate: false,
    };
  }

  moveInBanners = () => {
    Animated.timing(this.state.topBB, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.topBC, {
      toValue: -60,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.bottomBB, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.bottomBC, {
      toValue: 70,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  moveLettersUp = () => {
    Animated.timing(this.state.upF, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.upA, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.upP, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.upS, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.upH, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.upI, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  increaseOpacity = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: true});
      this.moveLettersUp();
      this.increaseOpacity();
      this.moveInBanners();
    }, 500);

    this.SetDeviceLanguage();

    Storage.load({key: 'USER'})
      .then(user => {
        console.log(user);
        this.props.setUser(user);
      })
      .catch(err => {
        if (err) {
          this.props.setUser({});
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
      .then(pin => this.props.setPin(pin))
      .catch(err => {
        if (err) {
          this.props.setPin(false);
        }
      });

    Storage.load({key: 'isFirstTime'})
      .then(res => {
        if (res.value) {
          console.log(res, this.state.isFirstTime);
          this.setState({isFirstTime: true});
        } else {
          console.log(res, this.state.isFirstTime);
          this.setState({isFirstTime: false});
        }
      })
      .catch(e => {
        this.setState({isFirstTime: true});
        Storage.storeInfo('isFirstTime', {value: true});
      });

    setTimeout(() => {
      if (!this.state.isFirstTime) {
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
    const animatedF = {
      transform: [{translateY: this.state.upF}, {translateX: this.state.upI}],
      opacity: this.state.opacity,
    };
    const animatedA = {
      transform: [{translateY: this.state.upA}, {translateX: this.state.upH}],
      opacity: this.state.opacity,
    };
    const animatedP = {
      transform: [{translateY: this.state.upP}, {translateX: this.state.upS}],
      opacity: this.state.opacity,
    };
    const animatedS = {
      transform: [{translateY: this.state.upS}, {translateX: this.state.upP}],
      opacity: this.state.opacity,
    };
    const animatedH = {
      transform: [{translateY: this.state.upH}, {translateX: this.state.upA}],
      opacity: this.state.opacity,
    };
    const animatedI = {
      transform: [{translateY: this.state.upI}, {translateX: this.state.upF}],
      opacity: this.state.opacity,
    };
    const animatedTopBB = {
      transform: [
        {translateY: this.state.topBB},
        {translateX: this.state.topBB},
      ],
    };
    const animatedTopBC = {
      transform: [{translateY: this.state.topBC}],
    };
    const animatedBottomBB = {
      transform: [
        {translateY: this.state.bottomBB},
        {translateX: this.state.bottomBB},
      ],
    };
    const animatedBottomBC = {
      transform: [{translateY: this.state.bottomBC}],
    };

    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Animated.View style={[styles.topBannerContainer, animatedTopBC]}>
          <Animated.View style={[styles.topBannerBold, animatedTopBB]} />
        </Animated.View>
        <View style={styles.mainContainer}>
          <Animated.View style={[styles.logoContainer, animatedOpacity]}>
            <Image
              source={require('../../utils/images/logo.png')}
              style={styles.appLogo}
            />
          </Animated.View>
          <View style={styles.appNameContainer}>
            <Animated.Text style={[styles.appNameF, animatedF]}>
              F
            </Animated.Text>
            <Animated.Text style={[styles.appNameA, animatedA]}>
              A
            </Animated.Text>
            <Animated.Text style={[styles.appNameP, animatedP]}>
              P
            </Animated.Text>
            <Animated.Text style={[styles.appNameS, animatedS]}>
              S
            </Animated.Text>
            <Animated.Text style={[styles.appNameH, animatedH]}>
              H
            </Animated.Text>
            <Animated.Text style={[styles.appNameI, animatedI]}>
              I
            </Animated.Text>
          </View>
        </View>
        <Animated.View style={[styles.bottomBannerContainer, animatedBottomBC]}>
          <Animated.View style={[styles.bottomBannerBold, animatedBottomBB]} />
        </Animated.View>
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
  return bindActionCreators({setLanguage, setUser, setToken}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
