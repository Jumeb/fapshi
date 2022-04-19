import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: theme.WHITE_COLOR,
  },
  scrollview: {
    flex: 1,
    position: 'relative',
    paddingTop: 60,
  },
  centralize: {
    height: theme.HEIGHT_100 - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.LIGHT_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: theme.WHITE_COLOR,
  },
  operatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  operatorButtonText: {
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_SMALL + 2,
  },
  operatorImage: {
    height: 40,
    width: 60,
  },
  operatorDetail: {
    color: theme.PRIMARY_COLOR,
    backgroundColor: theme.PRIMARY_COLOR_MONO + '99',
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    borderRadius: theme.BORDER_IMAGE,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  operatorDetailNot: {
    color: theme.DANGER_COLOR,
    backgroundColor: theme.DANGER_COLOR + '77',
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    borderRadius: theme.BORDER_IMAGE,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  isOperator: {
    fontSize: theme.FONT_SIZE_LARGE - 2.5,
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    // textAlign: 'center',
    // margin: 8,
    marginBottom: 35,
  },
  loadingLang: {
    // marginLeft: 12,
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.LIGHT_GREY,
  },
  loadingContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 12,
    marginHorizontal: theme.PAD_HR,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowColor: theme.PRIMARY_COLOR,
    elevation: 3,
  },
  topUpButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.PAD_HR - 8,
    // marginTop: 23,
  },
  topUpContainer: {
    marginHorizontal: theme.PAD_HR,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  amountText: {
    fontSize: theme.FONT_SIZE_SMALL - 2,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  amountValue: {
    fontSize: theme.FONT_SIZE_SMALL - 2,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    color: theme.DARK_GREY,
  },
  amountTotal: {
    fontSize: theme.FONT_SIZE_SMALL - 2,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginTop: 20,
  },
});

export default styles;
