import React from 'react';
import {SafeAreaView, View, ScrollView, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styles from './verifyTrans.style';
import {NavBar, Text} from '../../components';
import theme from '../../utils/theme';

const VerifyTrans = props => {
  const {i18n, navigation} = props;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        navigation={navigation}
        screen="Verify Transaction"
        show={true}
        pop={true}
        search={true}
      />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.transTitle}>Confirm Payment</Text>
        <Text style={styles.transFrom}>Transfer From</Text>
        <View style={styles.transContainer}>
          <Text>1234</Text>
          <Text> **** </Text>
          <Text> **** </Text>
          <Text>7890</Text>
        </View>
        <Text>Transfer From</Text>
        <View />
        <Text>Transfer From</Text>
        <View style={styles.transContainer}>
          <Text>Confirm Payment</Text>
          <Text>Confirm Payment</Text>
          <Text>Confirm Payment</Text>
          <Text>Confirm Payment</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyTrans);
