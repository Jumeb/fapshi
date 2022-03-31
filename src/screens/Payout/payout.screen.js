import React, {useState} from 'react';
import {ScrollView, SafeAreaView, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './payout.style';
import {
  Button,
  Divider,
  FapCard,
  NavBar,
  RecentsCard,
  SquareInput,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {VerifyPayout, VerifyTrans} from '../../section';

const Payout = props => {
  const {i18n, navigation} = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState(false);
  const [verify, setVerify] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen={'Payout'}
        pop={true}
        show={true}
      />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.originText}>{i18n.t('words.from')}</Text>
        <View style={styles.cardContainer}>
          <FapCard />
        </View>
        <Divider />
        <Text style={styles.originText}>{i18n.t('words.to')}</Text>
        <View style={styles.detailsContainer}>
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
            title={i18n.t('phrases.phoneNumber')}
            holder={'Mobile Money'}
            type={'phone-pad'}
            capitalize={'none'}
            secure={false}
            value={note}
            setValue={text => setNote(text)}
            errorMessage={i18n.t('phrases.noteInvalid')}
            error={noteError}
            toggleError={() => setNoteError(false)}
            icon={'ios-phone-portrait'}
          />
          <SquareInput
            title={i18n.t('words.amount')}
            holder={'5000'}
            type={'phone-pad'}
            capitalize={'none'}
            secure={false}
            value={amount}
            setValue={text => setAmount(text)}
            errorMessage={i18n.t('phrases.amountInvalid')}
            error={amountError}
            toggleError={() => setAmountError(false)}
            icon={'ios-cash'}
          />
        </View>
        <Divider />
        <Text style={styles.recentText}>{i18n.t('words.recent')}</Text>
        <ScrollView
          style={styles.horizontalScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <RecentsCard />
          <RecentsCard />
          <RecentsCard />
          <RecentsCard />
          <RecentsCard />
          <RecentsCard />
          <View style={styles.addContainer}>
            <View style={styles.addImageContainer}>
              <Icons name={'ios-add'} color={theme.PRIMARY_COLOR} size={35} />
            </View>
            <Text style={styles.addName}>{i18n.t('words.add')}</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.payout')}
            invert={true}
            onPress={() => setVerify(true)}
          />
        </View>
      </ScrollView>
      <VerifyPayout
        verify={verify}
        setVerify={setVerify}
        navigation={navigation}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Payout);
