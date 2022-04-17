import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import styles from './addTransfer.styles';
import {Button, SquareInput, Text} from '../../components';
import theme from '../../utils/theme';

const AddTransfer = props => {
  const {i18n, add, setAdd} = props;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

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
      <View style={styles.transferContainer}>
        <Text style={styles.transferText}>
          {i18n.t('phrases.addTransferContact')}
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
          type={'email-address'}
          capitalize={'none'}
          secure={false}
          value={email}
          setValue={text => setEmail(text)}
          errorMessage={i18n.t('phrases.phoneInvalid')}
          error={emailError}
          toggleError={() => setEmailError(false)}
          icon={'ios-envelope'}
        />
        <View style={styles.transferButtonContainer}>
          <Button title={i18n.t('words.add')} />
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

export default AddTransfer;
