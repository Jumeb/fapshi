import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.PAD_HR - 4,
    paddingVertical: 7,
    borderBottomWidth: 1.3,
    borderBottomColor: theme.DARK_OVERLAYS,
    marginVertical: 4,
    zIndex: 999,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  amountCurrency: {
    marginRight: 2,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.6,
  },
  amountValue: {
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    letterSpacing: 0.6,
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
    alignItems: 'flex-end',
  },
  dateValue: {
    alignSelf: 'baseline',
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  status: {
    position: 'absolute',
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 2,
    top: -5,
    left: -5,
    transform: [{rotateZ: '-20deg'}],
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
