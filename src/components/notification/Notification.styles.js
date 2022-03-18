import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.TRANSPARENT,
    maxHeight: 50,
    margin: 0,
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginBottom: 10,
    bottom: 0,
  },
  notifyContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.LIGHT_GREY,
    shadowRadius: 8,
    shadowOpacity: 0.6,
    elevation: 3,
  },
  notifyText: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
  },
  success: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  danger: {
    backgroundColor: theme.DANGER_COLOR,
  },
});

export default styles;
