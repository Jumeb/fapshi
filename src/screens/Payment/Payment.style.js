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
  cardContainer: {
    marginBottom: 25,
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
  buttonContainer: {
    marginHorizontal: theme.PAD_HR,
    marginTop: 15,
    marginBottom: 130,
  },
});

export default styles;
