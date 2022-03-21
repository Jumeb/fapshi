import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR,
    marginTop: 30,
  },
  headerContainer: {
    height: 180,
    backgroundColor: theme.PRIMARY_COLOR_MONO,
    position: 'absolute',
  },
  roundContainer: {
    marginTop: -190,
    marginLeft: -100,
    height: theme.WIDTH_100 + 150,
    width: theme.WIDTH_100 + 150,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 400,
    backgroundColor: theme.PRIMARY_COLOR,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  logoBackground: {
    height: 350,
    tintColor: theme.PRIMARY_COLOR,
    resizeMode: 'center',
    alignSelf: 'center',
    marginLeft: 30,
    marginBottom: -18,
  },
});

export default styles;
