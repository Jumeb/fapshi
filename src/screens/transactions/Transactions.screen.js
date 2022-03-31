import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit';

import styles from './Transactions.style';
import {scrolling} from '../../redux/actions/ScrollActions';
import {Detail, Filter, Filters, NavBar, Text} from '../../components';
import theme from '../../utils/theme';

const Transaction = props => {
  const {i18n, navigation, yOffset} = props;

  const [text, setText] = useState('');

  const data = {
    labels: [
      i18n.t('words.monday').substr(0, 3),
      i18n.t('words.tuesday').substr(0, 3),
      i18n.t('words.wednesday').substr(0, 3),
      i18n.t('words.thursday').substr(0, 3),
      i18n.t('words.friday').substr(0, 3),
      i18n.t('words.saturday').substr(0, 3),
      i18n.t('words.sunday').substr(0, 3),
    ],
    datasets: [
      {
        data: [25, 45, 28, 102, 40, 20, 110],
        color: (opacity = 1) => theme.MINT_COLOR,
        strokeWidth: 2,
      },
      {
        data: [5, 10, 4, 80, 34, 15, 50],
        color: (opacity = 1) => theme.VIOLET_COLOR,
        strokeWidth: 2,
      },
      {
        data: [2, 20, 14, 10, 6, 0, 10],
        color: (opacity = 1) => theme.GREEN_COLOR,
        strokeWidth: 2,
      },
      {
        data: [3, 2, 1, 5, 10, 0.5, 10],
        color: (opacity = 1) => theme.PURPLE_COLOR,
        strokeWidth: 2,
      },
    ],
    legend: [
      i18n.t('phrases.topUps'),
      i18n.t('words.sent'),
      i18n.t('words.withdraws'),
      i18n.t('words.airtime'),
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: theme.WHITE_COLOR,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: theme.WHITE_COLOR,
    backgroundGradientToOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.PRIMARY_COLOR_MONO,
    style: styles.chartStyle,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR} />
      <NavBar
        screen={'Transactions'}
        show={true}
        pop={true}
        search={true}
        navigation={navigation}
        setText={setText}
      />
      <ScrollView
        horizontal={false}
        onScroll={e => props.scrolling(e)}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          <Filters title={i18n.t('phrases.days7')} active={true} />
          <Filters title={i18n.t('phrases.months6')} />
          <Filters title={i18n.t('phrases.year1')} />
          <Filters title={i18n.t('phrases.years5')} />
        </ScrollView>
        <LineChart
          data={data}
          width={theme.WIDTH_100 * 0.94}
          height={200}
          withInnerLines={false}
          // withHorizontalLabels={false}
          withOuterLines={false}
          // yLabelsOffset={0}
          verticalLabelRotation={0}
          chartConfig={chartConfig}
          bezier
          style={styles.chartInnerStyle}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer2}>
          <Filter title={i18n.t('words.all')} active={true} />
          <Filter title={i18n.t('words.transfers')} />
          <Filter title={i18n.t('phrases.topUp')} />
          <Filter title={i18n.t('words.withdraw')} />
          <Filter title={i18n.t('words.payments')} />
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
            icon="ios-navigate"
            color={theme.VIOLET_COLOR}
            navigation={navigation}
          />
          <Detail
            icon="ios-navigate"
            color={theme.VIOLET_COLOR}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n, scroll}) => {
  return {
    i18n: i18n.i18n,
    yOffset: scroll.yOffset,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({scrolling}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
