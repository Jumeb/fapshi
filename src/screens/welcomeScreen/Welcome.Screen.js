import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, Animated, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './Welcome.style';
import {ActionButton, Text} from '../../components';
import {setAction} from '../../redux/actions/AuthActions';

const Welcome = props => {
  const {i18n, navigation} = props;
  const [topBB] = useState(new Animated.Value(-130));
  const [topBC] = useState(new Animated.Value(-200));
  const [opacity] = useState(new Animated.Value(0));
  const [wlc] = useState(new Animated.Value(300));

  useEffect(() => {
    setTimeout(() => {
      increaseOpacity();
      slideWelcome();
    }, 300);
  }, []);

  const slideWelcome = () => {
    Animated.timing(wlc, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const increaseOpacity = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  };

  const animatedOpacity = {
    opacity: opacity,
    transform: [{scale: opacity}],
  };
  const animatedWelcome = {
    transform: [{translateY: wlc}],
  };

  const SignUp = () => {
    props.setAction('signUp');
    navigation.navigate('Action');
  };

  const SignIn = () => {
    props.setAction('signIn');
    navigation.navigate('Action');
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View style={styles.welcomeContainer}>
          <Animated.View style={[styles.logoContainer, animatedOpacity]}>
            <Image
              source={require('../../utils/images/logo-full.png')}
              style={styles.appLogo}
            />
          </Animated.View>
        </View>
        <Animated.View style={[styles.actionContainer, animatedWelcome]}>
          <Text style={styles.actionTitle}>{i18n.t('words.welcome')}</Text>
          <Text style={styles.actionText}>
            Enim nulla ea in nisi est tempor non sunt tempor laborum laborum
            tempor. Do sunt dolor et elit eu nostrud.
          </Text>
          <View style={styles.buttonContainer}>
            <ActionButton
              title={i18n.t('phrases.signIn')}
              invert={false}
              onPress={() => SignIn()}
            />
            <ActionButton
              title={i18n.t('phrases.signUp')}
              invert={true}
              onPress={() => SignUp()}
            />
          </View>
        </Animated.View>
        {/* <Animated.View style={[styles.bottomBannerContainer, animatedBottomBC]}>
          <Animated.View style={[styles.bottomBannerBold, animatedBottomBB]} />
        </Animated.View> */}
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
