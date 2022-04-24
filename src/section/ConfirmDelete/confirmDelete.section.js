import React, {useState} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './confirmDelete.style';
import {Button, Text, SquareInput, Notification} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';

const ConfirmDelete = props => {
  const {i18n, confirm, setConfirm, token, data} = props;

  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const Authenticate = () => {
    setLoading(true);

    let statusCode, responseJson;
    fetch(`${BASE_URL}/notif/${data?._id}`, {
      method: 'DELETE',
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
        setLoading(false);
        console.log(res);

        if (statusCode === 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.deletedNotification'),
          });
          setTimeout(() => {
            setConfirm(false);
          }, 2500);
        }

        if (statusCode !== 200) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: responseJson.message,
          });
          setTimeout(() => {
            setConfirm(false);
          }, 2500);
        }
      })
      .catch(err => {
        if (err) {
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
    <Modal
      isVisible={confirm}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setConfirm(false)}
      onBackdropPress={() => setConfirm(false)}
      onBackButtonPress={() => setConfirm(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.confirmTitle}>
          {i18n.t('phrases.aboutDeleting')}
        </Text>
        <Text style={styles.confirmReason}>{data.message}.</Text>
        <View style={styles.confirmContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('words.cancel')}
              invert={false}
              onPress={() => setConfirm(false)}
            />
            <Button
              title={i18n.t('words.confirm')}
              invert={true}
              onPress={() => Authenticate()}
              loading={loading}
            />
          </View>
        </View>
      </View>
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelete);
