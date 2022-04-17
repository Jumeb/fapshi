import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: theme.PAD_HR,
    paddingVertical: 5,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.WHITE_COLOR,
    margin: 5,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
  },
  operatorImage: {
    height: 30,
    width: 60,
    resizeMode: 'cover',
  },
  activeOperator: {
    backgroundColor: theme.PRIMARY_COLOR_MONO,
  },
});

export default styles;
