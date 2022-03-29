import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icons from 'react-native-vector-icons/Ionicons';

import {
  Detail,
  FapCard,
  Filter,
  Function,
  Header,
  Text,
} from '../../components';
import theme from '../../utils/theme';
import styles from './Home.style';

const Home = props => {
  const {i18n, navigation} = props;
  return (
    <SafeAreaView style={styles.mainConatiner}>
      <StatusBar backgroundColor={theme.TRANSPARENT} />
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('phrases.myDashboard')}</Text>
      </View>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <FapCard />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.funcContainer}>
          <Function
            navigation={navigation}
            title={i18n.t('words.transfer')}
            icon="ios-navigate"
            color={theme.VIOLET_COLOR}
            onPress={() => navigation.navigate('Success')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('phrases.topUp')}
            icon="ios-trending-up"
            color={theme.MINT_COLOR}
            onPress={() => navigation.navigate('Enter Code')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('words.withdraw')}
            icon="ios-cash"
            color={theme.GREEN_COLOR}
            onPress={() => navigation.navigate('Verify Transaction')}
          />
          <Function
            navigation={navigation}
            title={i18n.t('words.payment')}
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
          />
        </ScrollView>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>{i18n.t('words.transactions')}</Text>
          <LinearGradient
            style={styles.button}
            colors={[theme.VIOLET_COLOR + 'af', theme.PRIMARY_COLOR]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigation.navigate('Transaction')}>
              <Text style={styles.detailText}>{i18n.t('phrases.viewAll')}</Text>
              <Icons
                name="ios-document-text"
                color={theme.WHITE_COLOR}
                size={16}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          <Filter yOffset={10} title={i18n.t('words.all')} active={true} />
          <Filter yOffset={10} title={i18n.t('words.transfers')} />
          <Filter yOffset={10} title={i18n.t('phrases.topUps')} />
          <Filter yOffset={10} title={i18n.t('words.withdraws')} />
          <Filter yOffset={10} title={i18n.t('words.payments')} />
        </ScrollView>
        <View style={styles.detailsContainer}>
          <View style={styles.circleTheme} />
          <Detail
            icon="ios-cash"
            color={theme.GREEN_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-navigate"
            color={theme.VIOLET_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-navigate"
            color={theme.VIOLET_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-trending-up"
            color={theme.MINT_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-cellular"
            color={theme.PURPLE_COLOR}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, auth}) => {
  return {
    i18n: i18n.i18n,
    user: auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
