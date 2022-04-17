import React, {useEffect, useRef} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {navigationRef} from './RootNavigation';
import {
  ActionScreen,
  SplashScreen,
  WelcomeScreen,
  HomeScreen,
  TransactionsScreen,
  SettingsScreen,
  NotificationsScreen,
  ProfileScreen,
  LanguageScreen,
  SuccessScreen,
  EnterCodeScreen,
  VerifyTransScreen,
  TransferScreen,
  PayoutScreen,
  TopUpScreen,
} from '../screens';
import {connect} from 'react-redux';
import {TabBar} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

let clicks = 0;

let HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payout"
        component={PayoutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Enter Code"
        component={EnterCodeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Topup"
        component={TopUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

let NotificationStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

let ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

let SettingsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

let UserStackScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home Stack"
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home Stack"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification Stack"
        component={NotificationStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings Stack"
        component={SettingsStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile Stack"
        component={ProfileStackScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Routes = props => {
  const {i18n} = props;
  let routeNameRef = useRef();

  useEffect(() => {
    const backAction = () => {
      if (
        routeNameRef.current === 'Home' ||
        routeNameRef.current === 'Action' ||
        routeNameRef.current === 'Welcome'
      ) {
        if (clicks !== 1) {
          ToastAndroid.show(
            i18n.t('phrases.tapAgainToExit'),
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        if (clicks > 0) {
          BackHandler.exitApp();
        } else {
          clicks++;
        }
        setTimeout(() => {
          clicks = 0;
        }, 2000);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [i18n]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (routeNameRef.current !== currentRouteName) {
          routeNameRef.current = currentRouteName;
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Action"
          component={ActionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main Stack"
          component={UserStackScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(Routes);
