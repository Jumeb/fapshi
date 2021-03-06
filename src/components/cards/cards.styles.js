import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  //  Notification Card
  noticationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.WHITE_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 14,
    marginHorizontal: theme.PAD_HR,
    borderRadius: theme.BORDER_IMAGE + 1,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 12,
    marginBottom: 14,
    overflow: 'hidden',
  },
  containerText: {
    flex: 1,
    paddingHorizontal: theme.PAD_HR,
    alignSelf: 'center',
  },
  notificationImageContainer: {
    height: 65,
    width: 65,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 6,
  },
  notificationIcon: {
    height: 65,
    width: 65,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationImageS: {
    height: 65,
    width: 65,
    resizeMode: 'contain',
  },
  notificationTime: {
    position: 'absolute',
    bottom: 3.5,
    left: 98,
    color: theme.DARK_OVERLAYS,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  notificationTitle: {
    lineHeight: 18,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    textAlign: 'left',
  },
  notificationText: {
    fontSize: theme.FONT_SIZE_SMALL - 1,
    lineHeight: 18,
    color: theme.DARK_GREY,
  },
  bold: {
    color: theme.DARK_ACCENT,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    fontSize: theme.FONT_SIZE_SMALL - 1,
  },
  noticationButton: {
    backgroundColor: theme.PURPLE_COLOR,
    paddingHorizontal: theme.PAD_HR + 1,
    paddingVertical: 2,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationButtonContainer: {
    alignSelf: 'center',
    paddingRight: theme.PAD_HR,
  },
  notificationButtonText: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  circleTheme: {
    zIndex: -999,
    height: 130,
    width: 130,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    backgroundColor: theme.LIGHT_BLUE,
    position: 'absolute',
    top: -70,
    right: -40,
  },
  circleThemeUp: {
    zIndex: -999,
    height: 130,
    width: 130,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    backgroundColor: theme.LIGHT_BLUE,
    position: 'absolute',
    bottom: -70,
    right: -40,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 4.5,
    right: 10,
    color: theme.DARK_OVERLAYS,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    height: 35,
    width: 35,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    backgroundColor: theme.WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Data Card
  dataCardContainer: {
    marginHorizontal: theme.PAD_HR,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginBottom: 10,
  },
  fieldText: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
  fieldValue: {
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    fontSize: theme.FONT_SIZE_NORMAL + 1,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.3,
    paddingRight: 4,
    borderBottomColor: theme.TRANSPARENT,
  },
  editFieldValue: {
    borderBottomWidth: 1.3,
    borderBottomColor: theme.DARK_GREY,
  },

  //   Language Card
  lanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: theme.PAD_HR,
    marginVertical: 1,
  },
  lanTitle: {
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_SMALL + 1,
  },

  //  Recent Card
  recentContainer: {
    marginRight: 4,
    width: 120,
    marginVertical: 10,
  },
  recentImageContainer: {
    height: 70,
    width: 70,
    borderRadius: theme.BORDER_IMAGE,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  activePayout: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  recentImage: {
    height: 45,
    width: 45,
    borderRadius: theme.BORDER_IMAGE,
  },
  recentName: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  recentRemove: {
    position: 'absolute',
    top: -10,
    right: 15,
    height: 25,
    width: 25,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    backgroundColor: theme.DANGER_COLOR,
  },
});

export default styles;
