import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: theme.WIDTH_100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 2.5,
    zIndex: 9999,
    backgroundColor: theme.PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.PRIMARY_COLOR,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  backIndicator: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
  },
  eventsIndicator: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 14,
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
  },
  eventsCart: {
    flexDirection: 'row',
    marginRight: 14,
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
  },
  eventsCountContainer: {
    height: 18,
    width: 18,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: theme.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    right: -8.25,
    top: -5,
  },
  eventsCount: {
    fontSize: 11,
    color: theme.WHITE_COLOR,
  },
  marginLeft: {
    marginLeft: 'auto',
    marginRight: 6,
  },
  marginRight: {
    marginRight: 'auto',
    marginLeft: 6,
  },
  actionIndicator: {
    marginRight: 6,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    borderRadius: theme.BORDER_IMAGE,
    backgroundColor: theme.TRANSPARENT,
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
});

export default styles;
