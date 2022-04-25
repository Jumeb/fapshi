import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: theme.PAD_HR,
    backgroundColor: theme.WHITE_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: 'center',
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
    overflow: 'hidden',
  },
  cardDetailsContainer: {
    zIndex: 999,
    marginTop: 30,
    marginBottom: 5,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  cardBalanceText: {
    marginTop: -10,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.DARK_OVERLAYS,
    marginBottom: 10,
  },
  cardCurrency: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    marginLeft: 7,
    marginBottom: 3,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.DARK_GREY,
  },
  cardAmount: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 7,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
  expireContainer: {
    marginTop: 10,
  },
  expiresText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  pinButton: {
    flexDirection: 'row',
    backgroundColor: theme.WHITE_COLOR,
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 75,
    paddingHorizontal: 7,
    borderRadius: theme.BORDER_IMAGE,
    paddingVertical: 4,
  },
  pinText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.PRIMARY_COLOR,
  },
});

export default styles;
