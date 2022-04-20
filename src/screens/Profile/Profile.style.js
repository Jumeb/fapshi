import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    paddingTop: 30,
  },
  containerStyle: {
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  profileImg: {
    width: 220,
    height: 220,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    resizeMode: 'cover',
  },
  profileImgContainer: {
    marginVertical: 20,
    width: 220,
    height: 220,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.WHITE_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.PAD_HR - 4,
    marginTop: 23,
  },
  changePasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.PAD_HR,
    marginVertical: 3,
  },
  passwordText: {
    color: theme.DARK_GREY,
  },
  signOutButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    flexDirection: 'row',
  },
  signOutButton: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.WHITE_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 6,
    maxWidth: 200,
    marginVertical: 6,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  signOutButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
    marginRight: 8,
  },
});

export default styles;
