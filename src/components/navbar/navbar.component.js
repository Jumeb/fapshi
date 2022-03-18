import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Text} from '..';
import styles from './navbar.styles';

const NavBar = props => {
  const {navigation} = props;

  return (
    <View>
      <Text>NavBar</Text>
    </View>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
