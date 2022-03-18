import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: -30,
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
    marginRight: 68,
    marginTop: 28,
  },
  actionContainer: {
    paddingHorizontal: 14,
    paddingVertical: 35,
    backgroundColor: theme.PRIMARY_COLOR,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.LIGHT_GREY,
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    // marginTop: 10,
  },
  actionTitle: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 5,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    paddingVertical: 5,
  },
  actionText: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 35,
    marginBottom: 7,
  },
});

export default styles;
