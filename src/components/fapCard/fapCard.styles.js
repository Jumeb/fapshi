import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: theme.PAD_HR,
    backgroundColor: theme.PRIMARY_COLOR,
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
  cardLogo: {
    height: 20,
    resizeMode: 'center',
    tintColor: theme.WHITE_COLOR,
    position: 'absolute',
    top: 10,
    left: -30,
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
  cardCurrency: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    marginRight: 7,
    marginBottom: 3,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.WHITE_COLOR,
  },
  cardId: {
    letterSpacing: 1.5,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  cardIdHidden: {
    marginRight: 4,
    letterSpacing: 1.5,
    marginBottom: -3,
  },
  cardIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardAmount: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 7,
    color: theme.WHITE_COLOR,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
  circleTheme: {
    position: 'absolute',
    height: 250,
    width: 250,
    backgroundColor: theme.PRIMARY_COLOR_MONO,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 200,
    bottom: -100,
    right: -100,
  },
  expireContainer: {
    marginTop: 10,
  },
  expiresText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
});

export default styles;
