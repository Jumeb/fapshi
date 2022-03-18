import React from 'react';
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import theme from '../../utils/theme';

import styles from './TabBar.style';

const TabBar = props => {
  const {state, descriptors, navigation} = props;
  const {i18n} = props;
  const activeTabIndex = state.index;

  return (
    <KeyboardAvoidingView style={styles.tabBar}>
      {/* <TouchableOpacity style={styles.tabTabSelected}>
        <Icons name="ios-home" size={20} color={theme.WHITE_COLOR} />
        <Text style={styles.tabTabTextSelected}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabTab}>
        <Icons name="md-receipt-outline" size={20} color={theme.LIGHT_GREY} />
        <Text style={styles.tabTabText}>ORDERS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabTab}>
        <Icons
          name="ios-chatbubbles-sharp"
          size={20}
          color={theme.LIGHT_GREY}
        />
        <Text style={styles.tabTabText}>REVIEWS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabTab}>
        <Icons
          name="person-circle-outline"
          size={20}
          color={theme.LIGHT_GREY}
        />
        <Text style={styles.tabTabText}>PROFILE</Text>
      </TouchableOpacity> */}
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
  if (title === 'Orders Stack') {
    icon = 'ios-file-tray-full-outline';
    index = 1;
  }
  if (title === 'Wallet Stack') {
    icon = 'ios-wallet-outline';
    index = 2;
  }
  if (title === 'Settings Stack') {
    icon = 'ios-cog-outline';
    index = 3;
  }
  // if (title === 'orders') {
  //   icon = 'ios-receipt-outline';
  // }
  if (title === 'Shop Stack') {
    icon = 'ios-home-outline';
    index = 0;
  }

  return (
    <TouchableOpacity
      style={activeTabIndex === index ? styles.tabTabSelected : styles.tabTab}
      onPress={() => navigation.navigate(title)}
      key={element.key}>
      <Icons
        name={icon}
        size={18}
        color={
          activeTabIndex === index ? theme.WHITE_COLOR : theme.SECONDARY_COLOR
        }
      />
      <Text
        numberOfLines={1}
        style={
          activeTabIndex === index
            ? styles.tabTabTextSelected
            : styles.tabTabText
        }>
        {title === 'Shop Stack'
          ? i18n.t('words.home').toUpperCase()
          : title === 'Settings Stack'
          ? i18n.t('words.settings').toUpperCase()
          : title === 'Wallet Stack'
          ? i18n.t('words.wallet').toUpperCase()
          : i18n.t('words.orders').toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
