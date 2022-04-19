import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.WHITE_COLOR,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    paddingTop: 70,
  },
  centralize: {
    height: theme.HEIGHT_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
