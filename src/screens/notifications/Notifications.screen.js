import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Notifications.style';
import {Header, NavBar, NotifcationCard, Text} from '../../components';
import theme from '../../utils/theme';

const Notifications = props => {
  const {i18n, navigation} = props;
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      {/* <Header /> */}
      <NavBar
        screen={'Notifications'}
        show={true}
        pop={false}
        search={true}
        navigation={navigation}
        setText={setText}
      />
      <ScrollView
        style={styles.scrollView}
        horizontal={false}
        showsVerticalScrollIndicator={false}>
        <NotifcationCard i18n={i18n} receive={true} index={0} />
        <NotifcationCard i18n={i18n} receive={true} index={1} />
        <NotifcationCard i18n={i18n} sent={true} index={2} />
        <NotifcationCard i18n={i18n} sent={true} index={3} />
        <NotifcationCard i18n={i18n} pending={true} index={4} />
        <NotifcationCard i18n={i18n} pay={true} index={5} />
        <NotifcationCard i18n={i18n} pending={true} index={6} />
        <NotifcationCard i18n={i18n} pending={true} index={7} />
        <NotifcationCard i18n={i18n} pay={true} index={8} />
        <NotifcationCard i18n={i18n} pay={true} index={9} />
        <NotifcationCard i18n={i18n} sent={true} index={10} />
        <NotifcationCard i18n={i18n} sent={true} index={11} />
        <NotifcationCard i18n={i18n} receive={true} index={12} />
        <NotifcationCard i18n={i18n} receive={true} last={true} index={13} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
