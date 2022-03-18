import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR,
    marginTop: 30,
  },
  headerContainer: {
    height: 180,
    backgroundColor: theme.PRIMARY_COLOR_MONO,
    position: 'absolute',
  },
  roundContainer: {
    marginTop: -190,
    marginLeft: -100,
    height: theme.WIDTH_100 + 150,
    width: theme.WIDTH_100 + 150,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 400,
    backgroundColor: theme.PRIMARY_COLOR,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  logoBackground: {
    height: 350,
    tintColor: theme.PRIMARY_COLOR,
    resizeMode: 'center',
    alignSelf: 'center',
    marginLeft: 30,
    marginBottom: -18,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    paddingTop: 150,
    // paddingBottom: 150,
    // padding: theme.PAD_HR,
  },
  title: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.WHITE_COLOR,
    textAlign: 'center',
    marginVertical: 5,
  },
  header: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -50}],
    marginTop: 20,
    marginBottom: 80,
    // zIndex: 999,
  },
  funcContainer: {
    paddingLeft: theme.PAD_HR - 5,
    paddingHorizontal: theme.PAD_HR + 10,
    marginTop: 10,
  },
  dateContainer: {
    marginHorizontal: theme.PAD_HR,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    marginHorizontal: theme.PAD_HR,
    // marginTop: 8,
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
    maxHeight: 340,
    overflow: 'hidden',
  },
  detailButton: {
    flexDirection: 'row',
  },
  detailText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.WHITE_COLOR,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginRight: 6,
  },
  dateTitle: {
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.BORDER_IMAGE,
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
  filterContainer: {
    marginTop: 16,
    marginHorizontal: theme.PAD_HR,
  },
});

export default styles;