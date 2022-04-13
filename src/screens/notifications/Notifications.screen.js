import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Notifications.style';
import {
  Header,
  NavBar,
  NotifcationCard,
  Notification,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';

const Notifications = props => {
  const {i18n, navigation, user, token} = props;
  const [text, setText] = useState('');
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    let statusCode, responseJson;

    fetch(`${BASE_URL}/notif`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
        Host: 'api.fapshi.com',
      },
    })
      .then(res => {
        statusCode = res.status;
        responseJson = res.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        setLoading(false);
        statusCode = res[0];
        responseJson = res[1];
        console.log(res, 'hahaha');

        if (statusCode === 200) {
          setNotifs(responseJson);
        }

        if (statusCode === 401) {
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          setLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

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
        {notifs.map((notif, index) => (
          <NotifcationCard
            key={index}
            i18n={i18n}
            notif={notif}
            receive={true}
            index={index}
            last={index + 1 === notifs.length ? true : false}
          />
        ))}
        {/* <NotifcationCard i18n={i18n} receive={true} index={1} />
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
        <NotifcationCard i18n={i18n} receive={true} last={true} index={13} /> */}
      </ScrollView>
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
    token: auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
