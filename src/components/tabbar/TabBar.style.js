import {StyleSheet} from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 0,
    marginBottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'transparent',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowColor: theme.LIGHT_GREY,
    // shadowRadius: 8,
    // elevation: 2,
  },
  tabTab: {
    justifyContent: 'center',
    width: 50,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  tabTabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    paddingHorizontal: 4,
    borderRadius: theme.BORDER_IMAGE,
    marginTop: -18,
    width: 50,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  tabTabText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 4,
    color: theme.SECONDARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    marginTop: 1,
    flexWrap: 'nowrap',
  },
  tabTabTextSelected: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL - 4,
    color: theme.WHITE_COLOR,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    marginTop: 1.5,
    flexWrap: 'nowrap',
  },
});

export default styles;
