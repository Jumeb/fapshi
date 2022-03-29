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
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 3,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  bubble: {
    height: 10,
    width: 10,
    borderRadius: theme.CIRCLE_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: theme.LIGHT_GREY,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginHorizontal: 100,
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default styles;
