import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './Notification.styles';
import {Text} from '..';
import theme from '../../utils/theme';

const ValidityNotification = props => {
  const {validity, setValidity, info, loading} = props;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setValidity(true);
  //   }, 8000);
  // }, [validity, setValidity]);
  return (
    <Modal
      isVisible={validity}
      style={styles.mainContainer2}
      animationInTiming={500}
      animationOutTiming={600}
      backdropOpacity={0.5}
      backdropColor={theme.PRIMARY_COLOR}
      animationIn="fadeInUp"
      animationOut="fadeOutDown">
      <View
        style={[
          styles.validityContainer,
          info?.type === 'success' ? styles.success : styles.danger,
        ]}>
        <Text style={styles.validityText}>{info?.msg}</Text>
        {loading ? (
          <ActivityIndicator size={'small'} color={theme.WHITE_COLOR} />
        ) : (
          <Icons name="ios-link-sharp" size={20} color={theme.WHITE_COLOR} />
        )}
      </View>
    </Modal>
  );
};

export default ValidityNotification;
