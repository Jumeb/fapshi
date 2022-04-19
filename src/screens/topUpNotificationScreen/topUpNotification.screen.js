import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './topUpNotification.styles';
import {Button, Text} from '../../components';
import theme from '../../utils/theme';
import {KSeparator} from '../../utils';

const Success = props => {
  const {i18n, navigation, route, user} = props;
  const {amount} = route.params;

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${*126#}';
    } else {
      phoneNumber = 'telprompt:${*126#}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentStyle}>
        <View style={styles.checkContainer}>
          <Icons name="ios-checkmark" size={100} color={theme.WHITE_COLOR} />
        </View>
        <Text style={styles.msgTitle}>{i18n.t('phrases.topUp')}</Text>
        <Text style={styles.msgAmount}>{KSeparator(amount || 0)} XAF</Text>
        <Text style={styles.msgTo}>
          {i18n.t('words.to')} {user.username}
        </Text>
        <Text style={styles.informMsg}>
          {i18n.t('phrases.youWillReceiveAPrompt')}
        </Text>
        <Text style={styles.msgTo}>{i18n.t('words.or')}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('phrases.dial126')}
            onPress={() => dialCall()}
          />
          <Button
            title={i18n.t('phrases.returnHome')}
            invert={true}
            onPress={() => navigation.navigate('Topup')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
