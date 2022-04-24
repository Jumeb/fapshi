import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.WHITE_COLOR,
  },
  contentContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  formContainer: {
    marginBottom: 15,
  },
  actContainer: {
    paddingHorizontal: theme.PAD_HR + 6,
    paddingVertical: 20,
    marginTop: 50,
    marginBottom: 60,
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
  logoContainer: {
    justifyContent: 'center',
    marginBottom: -30,
  },
  appLogo: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    tintColor: theme.PRIMARY_COLOR,
    alignSelf: 'center',
  },

  signInContainer: {
    marginRight: 'auto',
    borderTopRightRadius: theme.CIRCLE_BORDER_RADIUS,
    borderBottomRightRadius: theme.CIRCLE_BORDER_RADIUS,
    overflow: 'hidden',
  },
  signUpContainer: {
    marginLeft: 'auto',
    borderTopLeftRadius: theme.CIRCLE_BORDER_RADIUS,
    borderBottomLeftRadius: theme.CIRCLE_BORDER_RADIUS,
    overflow: 'hidden',
  },
  levelUp: {
    position: 'absolute',
    top: '15%',
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
