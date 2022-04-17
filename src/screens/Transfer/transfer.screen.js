import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './transfer.style';
import {
  Button,
  Divider,
  FapCard,
  NavBar,
  Notification,
  RecentsCard,
  SquareInput,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {AddTransfer, VerifyTrans} from '../../section';
import {AuthMail, AuthNumber} from '../../utils';

const Transfer = props => {
  const {i18n, navigation} = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [add, setAdd] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  const ShowSummary = () => {
    let hasError = false;

    if (!AuthMail(email.trim())) {
      hasError = true;
      setEmailError(true);
    }

    if (note.length < 5) {
      hasError = true;
      setNoteError(true);
    }

    if (!AuthNumber(amount) || amount.length < 1) {
      hasError = true;
      setAmountError(true);
    }

    if (hasError) {
      setNotifyMsg({
        msg: i18n.t('phrases.invalidDataEntry'),
        type: 'danger',
      });
      setNotify(true);
      setLoading(false);
      return;
    }
    const body = {
      amount,
      note,
      email,
    };
    setData(body);
    setVerify(true);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen={'Transfer'}
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
          <SquareInput
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
          />
          <SquareInput
            title={i18n.t('words.amount')}
            holder={'5000'}
            type={'numeric'}
            capitalize={'none'}
            secure={false}
            value={amount}
            setValue={text => setAmount(text)}
            errorMessage={i18n.t('phrases.amountInvalid')}
            error={amountError}
            toggleError={() => setAmountError(false)}
            icon={'ios-cash'}
          />
          <SquareInput
            title={i18n.t('words.note')}
            holder={'Ex: Money for bills'}
            type={'default'}
            capitalize={'none'}
            secure={false}
            value={note}
            setValue={text => setNote(text)}
            errorMessage={i18n.t('phrases.noteInvalid')}
            error={noteError}
            toggleError={() => setNoteError(false)}
            icon={'ios-document-text'}
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAdd(true)}
            style={styles.addContainer}>
            <View style={styles.addImageContainer}>
              <Icons name={'ios-add'} color={theme.PRIMARY_COLOR} size={35} />
            </View>
            <Text style={styles.addName}>{i18n.t('words.add')}</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('words.transfer')}
            invert={true}
            onPress={() => ShowSummary()}
          />
        </View>
      </ScrollView>
      <VerifyTrans
        verify={verify}
        setVerify={setVerify}
        navigation={navigation}
        summary={data}
      />
      <AddTransfer add={add} setAdd={setAdd} i18n={i18n} />
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);