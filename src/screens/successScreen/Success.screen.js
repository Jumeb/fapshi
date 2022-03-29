import React from 'react';
import {ScrollView, SafeAreaView, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './Success.styles';
import {Button, Text} from '../../components';
import theme from '../../utils/theme';

const Success = props => {
  const {i18n, navigation} = props;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentStyle}>
        <View style={styles.checkContainer}>
          <Icons name="ios-checkmark" size={100} color={theme.WHITE_COLOR} />
        </View>
        <Text style={styles.msgTitle}>{i18n.t('phrases.fundsTransfered')}</Text>
        <Text style={styles.msgAmount}>5,000 XAF</Text>
        <Text style={styles.msgTo}>{i18n.t('words.to')} Jume Brice</Text>
        <View style={styles.buttonContainer}>
          <Button title={i18n.t('phrases.transferFunds')} />
          <Button
            title={i18n.t('phrases.returnHome')}
            invert={true}
            onPress={() => navigation.navigate('Home')}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Success);
