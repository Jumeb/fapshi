import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: theme.WIDTH_100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2.5,
    zIndex: 9999,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 50,
  },
  backIndicator: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
  },
  marginLeft: {
    marginLeft: 'auto',
    marginRight: 6,
  },
  marginRight: {
    marginRight: 'auto',
    marginLeft: 6,
  },
  searchIndicator: {
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTextInputContainer: {
    marginRight: 6,
    flexDirection: 'row',
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
    marginLeft: 'auto',
  },
  searchBar: {
    fontSize: theme.FONT_SIZE_SMALL,
    // borderWidth: 2,
    paddingVertical: 2,
    color: theme.DARK_GREY,
    paddingHorizontal: 0,
  },
  showSearch: {
    width: 180,
    paddingLeft: 6,
  },
  hideSearch: {
    width: 0,
    paddingLeft: 0,
  },
  pageNameContainer: {
    position: 'absolute',
    width: theme.WIDTH_100,
  },
  pageName: {
    textAlign: 'center',
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_LARGE - 2,
    letterSpacing: 0.5,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
  },
});

export default styles;
