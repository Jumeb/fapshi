import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: theme.WHITE_COLOR,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    paddingTop: 60,
  },
  cardContainer: {
    marginBottom: 25,
    marginTop: 10,
  },
  originText: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 5,
    backgroundColor: theme.WHITE_COLOR,
  },
  detailsContainer: {
    marginHorizontal: theme.PAD_HR,
    marginTop: 18,
  },
  recentText: {
    marginTop: -19,
    backgroundColor: theme.WHITE_COLOR,
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonContainer: {
    marginHorizontal: theme.PAD_HR,
    marginTop: 18,
    marginBottom: 130,
  },
  horizontalScroll: {
    paddingHorizontal: theme.PAD_HR,
    marginTop: 18,
  },
  addContainer: {
    marginRight: 4,
    width: 70,
  },
  addImageContainer: {
    height: 45,
    width: 45,
    borderRadius: theme.BORDER_IMAGE,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  addName: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
});

export default styles;
