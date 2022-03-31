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
  titleContainer: {
    marginTop: 120,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 3,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  bubble: {
    height: 15,
    width: 15,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: theme.LIGHT_GREY,
  },
  filledBuble: {
    backgroundColor: theme.LIGHT_GREY,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginHorizontal: 95,
    justifyContent: 'space-between',
    marginTop: 60,
  },
  hiddenInput: {
    display: 'none',
  },
  buttonContainer: {
    marginTop: 60,
    marginHorizontal: theme.PAD_HR,
  },
});

export default styles;
