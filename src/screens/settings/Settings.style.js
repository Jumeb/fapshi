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
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: theme.PAD_HR,
    paddingBottom: 5,
    borderBottomWidth: 1.4,
    borderBottomColor: theme.LIGHT_GREY + '66',
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: theme.FONT_SIZE_SMALL + 1,
    color: theme.DARK_GREY,
    letterSpacing: 0.3,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
  functionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.PAD_HR,
    marginTop: 9,
    paddingVertical: 3,
  },
  functionTitle: {
    fontSize: theme.FONT_SIZE_SMALL - 0.5,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
});

export default styles;
