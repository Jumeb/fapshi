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
    paddingTop: 50,
  },
  selectTitle: {
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_LARGE,
    marginTop: 8,
    marginHorizontal: theme.PAD_HR,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginBottom: 10,
  },
});

export default styles;
