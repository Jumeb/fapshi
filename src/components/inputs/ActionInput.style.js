import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 28,
  },
  titleText: {
    position: 'absolute',
    paddingHorizontal: theme.PAD_HR + 5,
    color: theme.DARK_GREY,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: theme.TRANSPARENT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 3,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.WHITE_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 9999,
  },
  inputText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: theme.DARK_GREY,
    flex: 1,
  },
  errorText: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: theme.DANGER_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  secureText: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
  },
  borderError: {
    borderColor: theme.DANGER_COLOR,
  },
});

export default styles;
