import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import styles from './verifyTrans.style';
import {Button, Text, Divider, SquareInput} from '../../components';
import theme from '../../utils/theme';

const VerifyTrans = props => {
  const {i18n, verify, setVerify, navigation} = props;
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  return (
    <Modal
      isVisible={verify}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.55}
      backdropColor={theme.SECONDARY_COLOR}
      swipeDirection={'down'}
      onBackdropPress={() => setVerify(false)}
      onBackButtonPress={() => setVerify(false)}>
      <View style={styles.scrollView}>
        <Text style={styles.transTitle}>
          {i18n.t('phrases.confirmTransfer')}
        </Text>
        <Text style={styles.transFrom}>{i18n.t('phrases.transferFrom')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>1234</Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumber}>7890</Text>
        </View>
        <Text style={styles.originText}>FAPSHI</Text>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <View style={styles.transContainer}>
          <Text style={styles.cardNumber}>0987</Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumberHidden}> **** </Text>
          <Text style={styles.cardNumber}>4321</Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.amount')}</Text>
            <Text style={styles.amountValue}>XAF 5,000</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{i18n.t('words.fee')}</Text>
            <Text style={styles.amountValue}>XAF 300</Text>
          </View>
          <Divider />
          <View style={styles.amountContainer}>
            <Text style={styles.amountTotal}>
              {i18n.t('phrases.totalAmount')}
            </Text>
            <Text style={styles.amountValue}>XAF 5,300</Text>
          </View>
          <View style={styles.inputContainer}>
            <SquareInput
              title={i18n.t('words.pin')}
              holder={'1xys4'}
              type={'default'}
              capitalize={'none'}
              secure={true}
              value={pin}
              maxLength={5}
              setValue={text => setPin(text)}
              errorMessage={i18n.t('phrases.pinInvalid')}
              error={pinError}
              toggleError={() => setPinError(false)}
              icon={'ios-cash'}
            />
          </View>
          <View style={styles.amountContainer}>
            <Button
              title={i18n.t('words.transfer') + ' XAF 5,300'}
              invert={true}
              onPress={() => navigation.navigate('Enter Code')}
            />
          </View>
        </View>
      </View>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyTrans);
