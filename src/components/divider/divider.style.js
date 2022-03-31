import {StyleSheet} from 'react-native';

import theme from '../../utils/theme';

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1.5,
    marginHorizontal: theme.PAD_HR,
    marginVertical: 10,
    borderBottomColor: theme.FAINT_GREY,
  },
});

export default styles;
