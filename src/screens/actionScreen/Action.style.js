import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.WHITE_COLOR,
  },
  scrollContainer: {
    marginTop: -30,
  },
  formContainer: {
    marginBottom: 15,
  },
  actContainer: {
    paddingHorizontal: theme.PAD_HR + 6,
    paddingVertical: 20,
    marginVertical: 16,
    marginBottom: 26,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 12,
    width: theme.WIDTH_100 * 0.85,
    // borderWidth: 2,
  },
  actText: {
    color: theme.DARK_ACCENT,
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 2,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    marginBottom: 35,
  },
  topBannerContainer: {
    position: 'relative',
    backgroundColor: theme.PRIMARY_COLOR_MONO + '99',
    opacity: 5,
    height: 190,
    width: 190,
    borderRadius: 100,
    left: 25,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBannerBold: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 165,
    width: 165,
    borderRadius: 100,
    marginRight: 68,
    marginTop: 28,
  },
  bottomBannerContainer: {
    position: 'absolute',
    backgroundColor: theme.PRIMARY_COLOR_MONO + '99',
    opacity: 5,
    bottom: -20,
    height: 190,
    width: 190,
    borderRadius: 100,
    left: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBannerBold: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 165,
    width: 165,
    borderRadius: 100,
    marginLeft: 68,
    marginBottom: 28,
    // marginLeft: 10,
  },
  signInContainer: {
    marginRight: 'auto',
    marginTop: 50,
    borderTopRightRadius: theme.CIRCLE_BORDER_RADIUS,
    borderBottomRightRadius: theme.CIRCLE_BORDER_RADIUS,
    overflow: 'hidden',
  },
  signUpContainer: {
    marginLeft: 'auto',
    // marginBottom: 50,
    borderTopLeftRadius: theme.CIRCLE_BORDER_RADIUS,
    borderBottomLeftRadius: theme.CIRCLE_BORDER_RADIUS,
    overflow: 'hidden',
  },
  levelUp: {
    position: 'absolute',
    top: 0,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  optionText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.LIGHT_GREY,
  },
  optionTextSmall: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.LIGHT_GREY,
  },
  optionAction: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 4,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
  circleThemeSign: {
    position: 'absolute',
    height: 500,
    width: 500,
    backgroundColor: theme.LIGHT_BLUE,
    zIndex: -999,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 200,
    bottom: -150,
    right: -190,
  },
  circleThemeLog: {
    position: 'absolute',
    height: 450,
    width: 450,
    backgroundColor: theme.LIGHT_BLUE,
    zIndex: -999,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 200,
    bottom: -150,
    left: -200,
  },
});

export default styles;
