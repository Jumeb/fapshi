import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './Notifications.style';
import {
  NavBar,
  NotifcationCard,
  Notification,
  RefreshButton,
} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';
import {ConfirmDelete} from '../../section';

const Notifications = props => {
  const {i18n, navigation, token} = props;
  const [text, setText] = useState('');
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });
  const [confirm, setConfirm] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchNotifications();
  }, [confirm, i18n]);

  const fetchNotifications = () => {
    let statusCode, responseJson;
    setLoading(true);

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

        if (statusCode === 200) {
          setNotifs(responseJson);
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: responseJson.message,
          });
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

  const Refresh = () => {
    fetchNotifications();
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
      {loading ? (
        <View style={styles.centralize}>
          <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          horizontal={false}
          showsVerticalScrollIndicator={false}>
          {notifs && notifs.length >= 1 ? (
            notifs.map((notif, index) => (
              <NotifcationCard
                key={index}
                i18n={i18n}
                notif={notif}
                receive={true}
                index={index}
                setConfirm={setConfirm}
                setInfo={setInfo}
                last={index + 1 === notifs.length ? true : false}
              />
            ))
          ) : notifs && notifs.length === 0 ? (
            <RefreshButton
              i18n={i18n}
              center={true}
              onPress={() => Refresh()}
              info={i18n.t('phrases.noNotificationsNow')}
            />
          ) : (
            <RefreshButton
              i18n={i18n}
              center={true}
              onPress={() => Refresh()}
              info={i18n.t('phrases.noNotifications')}
            />
          )}
          <ConfirmDelete
            confirm={confirm}
            setConfirm={setConfirm}
            data={info}
          />
        </ScrollView>
      )}
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
