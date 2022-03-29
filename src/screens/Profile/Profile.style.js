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
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginTop: 23,
  },
});

export default styles;
