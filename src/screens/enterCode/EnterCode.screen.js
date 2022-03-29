import React from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';

import styles from './EnterCode.styles';
import {NavBar, Text} from '../../components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const EnterCode = props => {
  const {i18n, navigation} = props;

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
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Code</Text>
        </View>
        <View style={styles.bubbleContainer}>
          <View style={styles.bubble} />
          <View style={styles.bubble} />
          <View style={styles.bubble} />
          <View style={styles.bubble} />
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
