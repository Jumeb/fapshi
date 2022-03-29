import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Profile.style';
import {Button, DataCard, Header, NavBar, Text} from '../../components';
import theme from '../../utils/theme';

const Profile = props => {
  const {i18n, navigation} = props;

  const [name, setName] = useState('Jume Brice');
  const [tel, setTel] = useState('6781030599');
  const [email, setEmail] = useState('brice@gmail.com');
  const [edit, setEdit] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      {/* <Header /> */}
      <NavBar
        screen={'Profile'}
        show={true}
        pop={false}
        search={false}
        navigation={navigation}
        // setText={setText}
      />
      <ScrollView
        style={styles.scrollView}
        horizontal={false}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.profileImgContainer}>
          <Image
            imageStyle={styles.profileImg}
            style={styles.profileImg}
            source={require('../../utils/images/person2.jpg')}
          />
        </View> */}
        <DataCard
          holder="Username"
          type="default"
          capitalize="words"
          secureText={false}
          edit={edit}
          value={name}
          setValue={text => setName(text)}
        />
        <DataCard
          holder="Phone no."
          type="phone-pad"
          capitalize="words"
          secureText={false}
          edit={edit}
          value={tel}
          setValue={text => setTel(text)}
        />
        <DataCard
          holder="Email"
          type="email-address"
          capitalize="none"
          secureText={false}
          edit={edit}
          value={email}
          setValue={text => setEmail(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Profile"
            invert={false}
            onPress={() => setEdit(!edit)}
          />
          <Button title="Save Changes" invert={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
