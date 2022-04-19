import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    margin: theme.PAD_HR,
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: theme.WHITE_COLOR,
    margin: 0,
    borderRadius: theme.BORDER_IMAGE + 10,
    paddingVertical: 15,
  },
  transTitle: {
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    color: theme.DARK_GREY,
  },
  transFrom: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    marginHorizontal: theme.PAD_HR,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    textTransform: 'uppercase',
    marginTop: 14,
  },
  transContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.PAD_HR,
    marginTop: 8,
  },
  cardNumber: {
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_NORMAL + 2,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    letterSpacing: 1,
  },
  cardNumberHidden: {
    letterSpacing: 1.4,
    marginTop: 3,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    marginHorizontal: 2,
  },
  summaryContainer: {
    backgroundColor: theme.WHITE_COLOR,
    borderRadius: theme.BORDER_IMAGE,
    paddingHorizontal: theme.PAD_HR,
    paddingVertical: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    margin: theme.PAD_HR,
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
  originText: {
    marginHorizontal: theme.PAD_HR,
    textTransform: 'capitalize',
    marginTop: 8,
    marginBottom: 6,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 1,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 5,
    marginBottom: -15,
  },
});

export default styles;
