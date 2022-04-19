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
  checkContainer: {
    width: 200,
    height: 200,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: theme.CIRCLE_BORDER_RADIUS + 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 20,
  },
  contentStyle: {
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  msgTitle: {
    textAlign: 'center',
    marginTop: 10,
    // fontSize: theme.FONT_SIZE_LARGE,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  msgAmount: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: theme.FONT_SIZE_EXTRA_LARGE + 6,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  msgTo: {
    textAlign: 'center',
    marginTop: 2,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.LIGHT_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    textTransform: 'uppercase',
  },
  informMsg: {
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: theme.PAD_HR,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.LIGHT_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  buttonContainer: {
    marginHorizontal: 100,
    marginTop: 15,
  },
});

export default styles;
