import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  scrollView: {
    backgroundColor: theme.WHITE_COLOR,
    margin: 0,
    borderRadius: theme.BORDER_IMAGE + 10,
    paddingVertical: 15,
  },
  confirmTitle: {
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    color: theme.DARK_GREY,
  },
  confirmReason: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    marginHorizontal: theme.PAD_HR,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    marginVertical: 14,
    lineHeight: 20,
    color: theme.DARK_GREY,
  },
  transContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.PAD_HR,
    marginTop: 8,
  },
  confirmContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: theme.PAD_HR,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default styles;
