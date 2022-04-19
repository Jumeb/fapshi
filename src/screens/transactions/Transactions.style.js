import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.WHITE_COLOR,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    paddingTop: 70,
  },
  centralize: {
    height: theme.HEIGHT_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.WHITE_COLOR,
    marginHorizontal: theme.PAD_HR,
    borderRadius: theme.BORDER_IMAGE,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
  },
  chartStyle: {
    paddingHorizontal: 0,
    marginHorizontal: theme.PAD_HR,
    borderRadius: theme.BORDER_IMAGE,
    borderWidth: 2,
  },
  chartInnerStyle: {
    alignItems: 'center',
    borderRadius: theme.BORDER_IMAGE,
    marginHorizontal: 'auto',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
    marginBottom: 30,
  },
  filterContainer: {
    paddingLeft: theme.PAD_HR - 5,
    paddingHorizontal: theme.PAD_HR + 10,
    marginTop: 0,
    marginBottom: 15,
  },
  filterContainer2: {
    marginTop: 6,
    marginHorizontal: theme.PAD_HR,
  },
  circleTheme: {
    position: 'absolute',
    height: 250,
    width: 250,
    backgroundColor: theme.LIGHT_BLUE,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    top: -100,
    left: -30,
  },
  detailsContainer: {
    marginHorizontal: theme.PAD_HR,
    marginVertical: 18,
    marginBottom: 180,
    borderRadius: theme.BORDER_IMAGE + 6,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
    paddingVertical: 14,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
});

export default styles;
