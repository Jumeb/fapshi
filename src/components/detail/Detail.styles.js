import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: theme.PAD_HR,
    backgroundColor: theme.WHITE_COLOR,
    zIndex: 999,
    paddingHorizontal: 8,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginVertical: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dataContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    borderLeftWidth: 1.8,
    borderLeftColor: theme.PRIMARY_COLOR,
  },
  amountCurrency: {
    marginRight: 2,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.6,
  },
  amountValue: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.6,
  },
  infoText: {
    color: theme.LIGHT_GREY,
    letterSpacing: 0.6,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  iconContainer: {
    borderRadius: theme.BORDER_IMAGE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginLeft: -40,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -40,
  },
  personImage: {
    height: 15,
    width: 15,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    resizeMode: 'contain',
    marginRight: 3,
  },
  personInitials: {
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_SMALL,
    letterSpacing: 1.5,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
  dateContainer: {
    justifyContent: 'flex-end',
  },
  dateValue: {
    textAlign: 'right',
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  status: {
    position: 'absolute',
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 2,
    top: 10,
    right: 10,
    // transform: [{rotateZ: '-20deg'}],
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: theme.BORDER_IMAGE,
  },
  statusFailed: {
    backgroundColor: theme.DANGER_COLOR,
  },
  statusSuccess: {
    backgroundColor: theme.GREEN_COLOR,
  },
});

export default styles;
