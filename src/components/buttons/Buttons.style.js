import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  //Action Button,
  actContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    backgroundColor: theme.DARK_ACCENT,
  },
  actText: {
    textAlign: 'center',
    color: theme.WHITE_COLOR,
    textTransform: 'uppercase',
  },
  actContainerI: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    backgroundColor: theme.WHITE_COLOR,
  },
  actTextI: {
    textAlign: 'center',
    color: theme.DARK_ACCENT,
    textTransform: 'uppercase',
  },
  //Submit Button
  subContainer: {
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 12,
  },
  subText: {
    textAlign: 'center',
    color: theme.WHITE_COLOR,
    textTransform: 'uppercase',
  },
  subContainerI: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 12,
  },
  subTextI: {
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    textTransform: 'uppercase',
  },

  // Function
  funcContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: theme.WHITE_COLOR,
    marginRight: 10,
    marginLeft: 5,
    marginVertical: 4,
    borderRadius: theme.BORDER_IMAGE,
    width: 160,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  funcIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3.5,
    borderRadius: theme.BORDER_IMAGE,
    marginRight: 'auto',
    marginLeft: 3,
    zIndex: 99,
  },
  funcTitle: {
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: -10,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL + 1,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.8,
    zIndex: 99,
  },
  circleTheme: {
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: -30,
    right: -18,
    backgroundColor: theme.LIGHT_BLUE,
    borderRadius: theme.LARGE_BORDER_RADIUS,
    zIndex: -999,
  },
  circleThemeI: {
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: -30,
    right: -18,
    backgroundColor: theme.LIGHT_BLUE + '99',
    borderRadius: theme.LARGE_BORDER_RADIUS,
    zIndex: -999,
  },

  // Filter Buttons
  filterContainer: {
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderBottomWidth: 1.8,
    borderBottomColor: theme.TRANSPARENT,
  },
  filterText: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },

  //Filters Button
  filtersContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  filterCircleTheme: {
    position: 'absolute',
    height: 60,
    width: 60,
    bottom: -35,
    right: 20,
    backgroundColor: theme.LIGHT_BLUE,
    borderRadius: theme.LARGE_BORDER_RADIUS,
    zIndex: -99,
  },
  filterTitle: {
    textAlign: 'center',
    marginRight: 'auto',
    fontSize: theme.FONT_SIZE_EXTRA_SMALL + 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.8,
    zIndex: 99,
  },

  //    Button
  buttonContainerI: {
    borderWidth: 1.4,
    borderColor: theme.PRIMARY_COLOR,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: theme.BORDER_IMAGE,
    paddingHorizontal: 8,
    paddingVertical: 7,
    marginVertical: 5,
    flex: 1,
    width: 'auto',
    marginHorizontal: 7,
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  buttonContainer: {
    borderWidth: 1.4,
    borderColor: theme.PRIMARY_COLOR,
    backgroundColor: theme.WHITE_COLOR,
    borderRadius: theme.BORDER_IMAGE,
    paddingHorizontal: 8,
    paddingVertical: 7,
    marginVertical: 5,
    justifyContent: 'center',
    flex: 1,
    width: 'auto',
    marginHorizontal: 7,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  buttonTextI: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.WHITE_COLOR,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
  },

  // Switch Button

  switchButton: {
    width: 30,
    height: 12,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
  },
  switch: {
    height: 16.5,
    width: 16.5,
    marginTop: -2.5,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    overflow: 'hidden',
  },
  switchContainerI: {
    backgroundColor: theme.LIGHT_GREY + '77',
  },
  switchContainer: {
    backgroundColor: theme.PRIMARY_COLOR + '77',
  },
  switchThemeI: {
    backgroundColor: theme.LIGHT_GREY,
  },
  switchTheme: {
    backgroundColor: theme.PRIMARY_COLOR,
    marginLeft: 'auto',
  },

  //  Refresh button
  refreshButtonContainer: {
    height: theme.HEIGHT_100 - 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshImage: {
    height: 40,
    resizeMode: 'contain',
    tintColor: theme.PRIMARY_COLOR,
  },
  refreshText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginTop: -10,
  },
  refreshInfoText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default styles;
