import React, {useEffect, useState} from 'react';
import {
  Platform,
  UIManager,
  LayoutAnimation,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import theme from '../../utils/theme';
import styles from './navbar.styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Header = props => {
  const {screen, search, pop, i18n, setText, text, show, showText, navigation} =
    props;
  const [showSearch, setShowSearch] = useState(false);
  const searchScreen =
    screen.toString() === 'Transactions'
      ? i18n.t('words.transactions')
      : screen.toString() === 'Notifications'
      ? i18n.t('words.notifications')
      : screen.toString() === 'Settings'
      ? i18n.t('words.settings')
      : screen.toString() === 'Profile'
      ? i18n.t('words.profile')
      : screen.toString() === 'Languages'
      ? i18n.t('words.languages')
      : screen.toString() === 'Verify Transaction'
      ? i18n.t('phrases.verifyTrans')
      : screen.toString() === 'Transfer'
      ? i18n.t('words.transfer')
      : screen.toString() === 'Topup'
      ? i18n.t('phrases.topUp')
      : screen.toString() === 'Payout'
      ? i18n.t('words.payout')
      : screen.toString() === 'My Dashboard'
      ? i18n.t('phrases.myDashboard')
      : i18n.t('words.cart1');

  const animatedWidth = {
    width: showSearch ? theme.WIDTH_100 * 0.87 : 0,
    opacity: showSearch ? 1 : 0,
  };

  const toggleShow = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setShowSearch(!showSearch);
    setText('');
  };

  return (
    <View
      style={[
        styles.headerContainer,
        showSearch
          ? {backgroundColor: theme.WHITE_COLOR}
          : {
              backgroundColor: theme.PRIMARY_COLOR,
            },
      ]}>
      {pop && !showSearch && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backIndicator}
          onPress={() => navigation.pop()}>
          <Icons name="ios-arrow-back" size={20} color={theme.WHITE_COLOR} />
        </TouchableOpacity>
      )}
      {show && !showSearch && (
        <View style={styles.pageNameContainer}>
          <Text style={styles.pageName}>{searchScreen}</Text>
        </View>
      )}
      {search && (
        <View
          style={[
            styles.searchTextInputContainer,
            (screen.toString() === 'Order' || showSearch) && styles.marginLeft,
            screen.toString() === 'Home' && styles.marginLeft,
          ]}>
          <View style={animatedWidth}>
            <TextInput
              placeholder={i18n.t('words.search') + ' ' + searchScreen}
              placeholderTextColor={theme.LIGHT_GREY}
              style={[
                styles.searchBar,
                showSearch ? styles.showSearch : styles.hideSearch,
              ]}
              value={text}
              onChangeText={txt => setText(txt)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchIndicator}
            onPress={() => toggleShow()}>
            <Icons
              name={showSearch ? 'ios-close-outline' : 'ios-search-outline'}
              size={20}
              color={showSearch ? theme.PRIMARY_COLOR : theme.WHITE_COLOR}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = ({i18n, auth, favourites}) => {
  return {
    i18n: i18n.i18n,
  };
};

export default connect(mapStateToProps)(Header);
