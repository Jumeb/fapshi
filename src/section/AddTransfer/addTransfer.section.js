import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './addTransfer.styles';
import {Button, SquareInput, Text} from '../../components';
import theme from '../../utils/theme';
import {addTransfer} from '../../redux/actions/ContactActions';
import {AuthMail} from '../../utils';

const AddTransfer = props => {
  const {i18n, add, setAdd} = props;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (name.length < 4) {
      hasError = true;
      setNameError(true);
    }

    if (!AuthMail(email)) {
      hasError = true;
      setEmailError(true);
    }
    if (hasError) {
      setLoading(false);
      return;
    }
    setLoading(false);
    props.addTransfer(name, email);
    setAdd(false);
    setName('');
    setEmail('');
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
          title={i18n.t('words.email')}
          holder={'janedoe@yahoo.fr'}
          type={'email-address'}
          capitalize={'none'}
          secure={false}
          value={email}
          setValue={text => setEmail(text)}
          errorMessage={i18n.t('phrases.phoneInvalid')}
          error={emailError}
          toggleError={() => setEmailError(false)}
          icon={'ios-mail'}
        />
        <View style={styles.transferButtonContainer}>
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
  return bindActionCreators({addTransfer}, dispatch);
};

export default connect(null, mapDispatchToProps)(AddTransfer);
