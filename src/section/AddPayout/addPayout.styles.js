import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    margin: theme.PAD_HR,
    justifyContent: 'center',
  },
  cashoutText: {
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginBottom: 10,
    color: theme.DARK_GREY,
  },
  cashoutContainer: {
    paddingHorizontal: theme.PAD_HR,
    backgroundColor: theme.WHITE_COLOR,
    margin: 0,
    borderRadius: theme.BORDER_IMAGE + 10,
    paddingVertical: 15,
  },
  cashoutButtonContainer: {
    flexDirection: 'row',
  },
});

export default styles;
