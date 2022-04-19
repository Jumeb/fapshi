import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import styles from './addPayout.styles';
import {Button, SquareInput, Text} from '../../components';
import theme from '../../utils/theme';
import {addPayout} from '../../redux/actions/ContactActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AuthMTN, AuthOrange} from '../../utils';

const AddPayout = props => {
  const {i18n, add, setAdd} = props;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState(false);
  const [loading, setLoading] = useState(false);

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (name.length < 4) {
      hasError = true;
      setNameError(true);
    }

    if (!AuthMTN(number) && !AuthOrange(number)) {
      hasError = true;
      setNumberError(true);
    }
    if (hasError) {
      setLoading(false);
      return;
    }
    setLoading(false);
    props.addPayout(name, number);
    setAdd(false);
    setName('');
    setNumber('');
  };

  return (
    <Modal
      isVisible={add}
      style={styles.mainContainer}
      animationInTiming={500}
      animationOutTiming={400}
      backdropOpacity={0.7}
      backdropColor={theme.PRIMARY_COLOR}
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => setAdd(false)}
      onBackdropPress={() => setAdd(false)}
      onBackButtonPress={() => setAdd(false)}>
      <View style={styles.cashoutContainer}>
        <Text style={styles.cashoutText}>
          {i18n.t('phrases.addPayoutContact')}
        </Text>
        {/* <SquareInput
            title={i18n.t('words.email')}
            holder={'jondoe@yahoo.fr'}
            type={'email-address'}
            capitalize={'none'}
            secure={false}
            value={email}
            setValue={text => setEmail(text)}
            errorMessage={i18n.t('phrases.emailInvalid')}
            error={emailError}
            toggleError={() => setEmailError(false)}
            icon={'ios-mail'}
          /> */}
        <SquareInput
          title={i18n.t('phrases.personName')}
          holder={'Jane Boe'}
          type={'default'}
          capitalize={'words'}
          secure={false}
          value={name}
          setValue={text => setName(text)}
          errorMessage={i18n.t('phrases.nameTooShort')}
          error={nameError}
          toggleError={() => setNameError(false)}
          icon={'ios-person'}
        />
        <SquareInput
          title={i18n.t('phrases.personNumber')}
          holder={'6-xxxxxxx'}
          type={'numeric'}
          capitalize={'none'}
          secure={false}
          value={number}
          setValue={text => setNumber(text)}
          errorMessage={i18n.t('phrases.phoneInvalid')}
          error={numberError}
          toggleError={() => setNumberError(false)}
          icon={'ios-phone-portrait'}
        />
        <View style={styles.cashoutButtonContainer}>
          <Button
            title={i18n.t('words.add')}
            loading={loading}
            onPress={() => Authenticate()}
          />
          <Button
            title={i18n.t('words.cancel')}
            invert={true}
            onPress={() => setAdd(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({addPayout}, dispatch);
};

export default connect(null, mapDispatchToProps)(AddPayout);
