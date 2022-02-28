import React, {Component} from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RNLocalize from 'react-native-localize';

import styles from './Splash.style';
import colorScheme from '../../utils/theme';
import {setLanguage} from '../../redux/actions/TranslationAction';
import {setUser, setToken} from '../../redux/actions/AuthActions';
// import {addToCart} from '../../redux/actions/CartAction';
// import {addToFavourites} from '../../redux/actions/FavouritesActions';
import {Storage} from '../../utils';

let currentDeviceLocale = RNLocalize.getLocales()[0];

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isNotFirstTime: false,
    };
  }

  componentDidMount() {
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

    Storage.load({key: 'TOKEN'})
      .then(token => this.props.setToken(token))
      .catch(err => {
        if (err) {
          this.props.setToken('');
        }
      });

    // Storage.load({key: 'CART'})
    //   .then(cart => {
    //     this.props.addToCart(cart);
    //   })
    //   .catch(er => this.props.addToCart([]));

    // Storage.load({key: 'FAVOURITES'})
    //   .then(favourites => this.props.addToFavourites(favourites))
    //   .catch(err => {
    //     if (err) {
    //       this.props.addToFavourites([]);
    //     }
    //   });

    Storage.load({key: 'isNotFirstTime'})
      .then(res => {
        if (res) {
          this.setState({isNotFirstTime: true});
        } else {
          this.setState({isNotFirstTime: false});
        }
      })
      .catch(e => {
        this.setState({isNotFirstTime: false});
        Storage.storeInfo('isNotFirstTime', true);
      });

    // setTimeout(() => {
    //   if (this.state.isNotFirstTime) {
    //     return Actions.main();
    //   }
    //   Actions.welcome();
    // }, 2500);
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
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <LinearGradient
          style={styles.mainContainer}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[colorScheme.TERTIARY_COLOR, colorScheme.SECONDARY_COLOR]}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../resources/images/logo-1.png')}
              style={styles.appLogo}
            />
            {/* <Text style={styles.appName}>Flavours</Text> */}
          </View>
          {/* <View>
            <Image
              source={require('../../../resources/images/jbInc.png')}
              style={styles.appCreatorLogo}
            />
          </View> */}
        </LinearGradient>
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
