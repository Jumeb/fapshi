import React, {useState} from 'react';
import {ScrollView, SafeAreaView, View, Keyboard} from 'react-native';

import styles from './EnterCode.styles';
import {Button, NavBar, SquareInput, Text} from '../../components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const EnterCode = props => {
  const {i18n, navigation} = props;
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [focus, setFocus] = useState(true);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavBar
        screen={'Enter Code'}
        show={false}
        pop={true}
        search={false}
        navigation={navigation}
        // setText={setText}
      />
      <ScrollView
        horizontal={false}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setFocus(true)}>
            <Text style={styles.title}>{i18n.t('phrases.enterPin')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hiddenInput}>
          <SquareInput
            title={i18n.t('words.pin')}
            holder={'5000'}
            type={'default'}
            capitalize={'none'}
            secure={true}
            autoFocus={focus}
            value={pin}
            maxLength={5}
            setValue={text => setPin(text)}
            errorMessage={i18n.t('phrases.pinInvalid')}
            error={pinError}
            toggleError={() => setPinError(false)}
            icon={'ios-cash'}
          />
        </View>
        <View style={styles.bubbleContainer}>
          <View
            style={[styles.bubble, pin.length >= 1 && styles.filledBuble]}
          />
          <View
            style={[styles.bubble, pin.length >= 2 && styles.filledBuble]}
          />
          <View
            style={[styles.bubble, pin.length >= 3 && styles.filledBuble]}
          />
          <View
            style={[styles.bubble, pin.length >= 4 && styles.filledBuble]}
          />
          <View
            style={[styles.bubble, pin.length >= 5 && styles.filledBuble]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title={i18n.t('words.submit')} />
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnterCode);
