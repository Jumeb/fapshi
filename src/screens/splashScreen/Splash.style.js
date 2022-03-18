import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR,
  },
  logoContainer: {
    justifyContent: 'center',
    // marginBottom: -80,
  },
  appLogo: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    tintColor: theme.PRIMARY_COLOR,
    alignSelf: 'center',
  },
  topBannerContainer: {
    position: 'relative',
    backgroundColor: theme.PRIMARY_COLOR_MONO,
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
    // marginLeft: 10,
  },
  appNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appNameF: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
  },
  appNameA: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 2,
  },
  appNameP: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 2,
  },
  appNameS: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 2,
  },
  appNameH: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
    marginHorizontal: 2,
  },
  appNameI: {
    position: 'relative',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.PRIMARY_COLOR,
  },
  bottomBannerContainer: {
    position: 'relative',
    backgroundColor: theme.PRIMARY_COLOR_MONO,
    opacity: 5,
    height: 190,
    width: 190,
    borderRadius: 100,
    right: 25,
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBannerBold: {
    backgroundColor: theme.PRIMARY_COLOR,
    height: 165,
    width: 165,
    borderRadius: 100,
    // marginLeft: 10,
  },
});

export default styles;
