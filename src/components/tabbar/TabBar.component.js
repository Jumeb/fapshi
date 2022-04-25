import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import theme from '../../utils/theme';

import styles from './TabBar.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TabBar = props => {
  const {state, descriptors, navigation} = props;
  const {i18n} = props;
  const activeTabIndex = state.index;

  return (
    <KeyboardAvoidingView style={styles.tabBar}>
      {state.routes.map(element => (
        <TabIcon
          element={element}
          title={element.name}
          activeTabIndex={activeTabIndex}
          key={element.key}
          i18n={i18n}
          navigation={navigation}
        />
      ))}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(TabBar);

const TabIcon = props => {
  const {title, activeTabIndex, element, i18n, navigation} = props;
  let icon = '';
  let index = -1;
  if (title === 'Notification Stack') {
    icon = 'ios-notifications';
    index = 1;
  }
  if (title === 'Profile Stack') {
    icon = 'ios-person';
    index = 3;
  }
  if (title === 'Settings Stack') {
    icon = 'ios-build';
    index = 2;
  }
  // if (title === 'orders') {
  //   icon = 'ios-receipt-outline';
  // }
  if (title === 'Home Stack') {
    icon = 'ios-home';
    index = 0;
  }

  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      500,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity,
    ),
  );

  return (
    <TouchableOpacity
      style={[
        activeTabIndex === index ? styles.tabTabSelected : styles.tabTab,
        activeTabIndex === index ? {width: 95} : {width: 50},
      ]}
      onPress={() => navigation.navigate(title)}
      key={element.key}>
      <Icons
        name={icon}
        size={17}
        color={
          activeTabIndex === index ? theme.WHITE_COLOR : theme.DARK_OVERLAYS
        }
      />
      <Text
        numberOfLines={1}
        style={[
          activeTabIndex === index
            ? styles.tabTabTextSelected
            : styles.tabTabText,
          activeTabIndex === index ? {opacity: 1} : {opacity: 0},
        ]}>
        {title === 'Home Stack'
          ? i18n.t('words.home').toUpperCase()
          : title === 'Settings Stack'
          ? i18n.t('words.settings').toUpperCase()
          : title === 'Profile Stack'
          ? i18n.t('words.profile').toUpperCase()
          : i18n.t('words.notifications').toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
