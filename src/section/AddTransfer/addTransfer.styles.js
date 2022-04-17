import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    margin: theme.PAD_HR,
    justifyContent: 'center',
  },
  transferText: {
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    color: theme.DARK_GREY,
    marginBottom: 10,
  },
  transferContainer: {
    paddingHorizontal: theme.PAD_HR,
    backgroundColor: theme.WHITE_COLOR,
    margin: 0,
    borderRadius: theme.BORDER_IMAGE + 10,
    paddingVertical: 15,
  },
  transferButtonContainer: {
    flexDirection: 'row',
  },
});

export default styles;
