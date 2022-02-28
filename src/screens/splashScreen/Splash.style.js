import {StyleSheet} from 'react-native';
import theme from '../../../resources/Colors/theme';

import colorTheme from '../../../resources/Colors/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  appLogo: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    tintColor: colorTheme.WHITE_COLOR,
    alignSelf: 'center',
  },
  appCreatorLogo: {
    resizeMode: 'contain',
    height: 90,
    width: 90,
    tintColor: colorTheme.WHITE_COLOR,
    alignSelf: 'center',
  },
  appName: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.WHITE_COLOR,
    textAlign: 'center',
    letterSpacing: 3,
    marginTop: 3,
    fontWeight: theme.FONT_WEIGHT_BOLD,
  },
  madeText: {
    textAlign: 'center',
    fontSize: colorTheme.FONT_SIZE_SMALL + 1,
    color: colorTheme.WHITE_COLOR,
    fontWeight: '800',
    fontFamily: 'old-english-text-mt',
  },
});

export default styles;
