import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
7;
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './Profile.style';
import {
  Button,
  DataCard,
  Header,
  NavBar,
  Notification,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import {BASE_URL} from '../../utils';
import {setUser, signOut} from '../../redux/actions/AuthActions';
import {ChangePassword} from '../../section';

const Profile = props => {
  const {i18n, navigation, setUser, user, token} = props;

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [tel, setTel] = useState('');
  const [telError, setTelError] = useState(false);
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [soLoading, setSOLoading] = useState(false);
  const [configurePassword, setConfigurePassword] = useState(false);

  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    msg: i18n.t('phrases.errorHandlingInput'),
    type: 'danger',
  });

  useEffect(() => {
    setName(user.fullname);
    setEmail(user?.email);
    setTel(user?.phone);
    setAddress(user?.address);
    setCountry(user?.country);
  }, []);

  const SignOut = () => {
    setSOLoading(true);
    setTimeout(() => {
      BackHandler.exitApp();
      props.signOut();
    }, 4000);
  };

  const Authenticate = () => {
    let hasError = false;
    setLoading(true);

    if (name && name.length < 5) {
      hasError = true;
      setNameError(true);
    }

    if (tel.length < 9) {
      hasError = true;
      setTelError(false);
    }

    if (address.length < 5) {
      hasError = true;
      setAddressError(true);
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
      fullname: name,
      phone: tel,
      address,
    };

    let statusCode, responseJson;
    fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
        Host: 'api.fapshi.com',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        statusCode = res.status;
        responseJson = res.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(res => {
        setLoading(false);
        statusCode = res[0];
        responseJson = res[1];

        if (statusCode === 200) {
          setUser(responseJson);
          setNotify(true);
          setNotifyMsg({
            type: 'success',
            msg: i18n.t('phrases.profilUpdated'),
          });

          return setEdit(false);
        }

        if (statusCode === 400) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.inValidEmailOrPassword'),
          });
          return false;
        }

        if (statusCode === 500) {
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            msg: i18n.t('phrases.unexpectedError'),
          });
          return false;
        }
      })
      .catch(err => {
        if (err) {
          setLoading(false);
          setNotify(true);
          setNotifyMsg({
            type: 'error',
            title: 'Unexpected Error',
            msg: i18n.t('phrases.pleaseCheckInternet'),
          });
        }
      });
  };

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
          holder={i18n.t('words.email')}
          type="email-address"
          capitalize="none"
          secureText={false}
          edit={false}
          value={email}
          setValue={text => setEmail(text)}
        />
        <DataCard
          holder={i18n.t('phrases.fullNames')}
          type="default"
          capitalize="words"
          secureText={false}
          edit={edit}
          value={name}
          setValue={text => setName(text)}
        />
        <DataCard
          holder={i18n.t('phrases.phoneNumber')}
          type="phone-pad"
          capitalize="words"
          secureText={false}
          edit={edit}
          value={tel}
          setValue={text => setTel(text)}
        />
        <DataCard
          holder={i18n.t('words.country')}
          type="default"
          capitalize="none"
          secureText={false}
          edit={false}
          value={country}
          setValue={text => setCountry(text)}
        />
        <DataCard
          holder={i18n.t('phrases.streetAddress')}
          type="default"
          capitalize="none"
          secureText={false}
          edit={edit}
          value={address}
          setValue={text => setAddress(text)}
        />
        {/* <TouchableOpacity
          style={styles.changePasswordContainer}
          activeOpacity={0.8}
          onPress={() => setConfigurePassword(true)}>
          <Text style={styles.passwordText}>
            {i18n.t('phrases.changePassword')}
          </Text>
          <Icons name={'ios-eye-off'} size={16} color={theme.PRIMARY_COLOR} />
        </TouchableOpacity> */}
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t('phrases.editProfile')}
            invert={false}
            onPress={() => setEdit(!edit)}
          />
          <Button
            title={i18n.t('phrases.saveChanges')}
            invert={true}
            loading={loading}
            onPress={() => Authenticate()}
          />
        </View>
        <View style={styles.signOutButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signOutButton}
            onPress={() => setConfigurePassword(true)}>
            <Text style={styles.signOutButtonText}>
              {i18n.t('phrases.changePassword')}
            </Text>
            <Icons name={'ios-eye-off'} size={16} color={theme.PRIMARY_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signOutButton}
            onPress={() => SignOut()}>
            <Text style={styles.signOutButtonText}>
              {i18n.t('phrases.signOut')}
            </Text>
            {soLoading ? (
              <ActivityIndicator color={theme.PRIMARY_COLOR} size={'small'} />
            ) : (
              <Icons name={'ios-power'} size={16} color={theme.PRIMARY_COLOR} />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Notification notify={notify} setNotify={setNotify} info={notifyMsg} />
      <ChangePassword
        configurePassword={configurePassword}
        setConfigurePassword={setConfigurePassword}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
    token: auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setUser, signOut}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
