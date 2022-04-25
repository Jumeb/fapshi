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
  },
  buttonContainer2: {
    marginHorizontal: theme.PAD_HR,
    marginTop: 15,
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
  operatorContainer: {
    paddingHorizontal: theme.PAD_HR,
    paddingVertical: 5,
  },
  table: {
    marginHorizontal: theme.PAD_HR,
    marginVertical: 25,
  },
  headerStyle: {
    borderBottomColor: theme.DARK_GREY,
    borderBottomWidth: 1.5,
  },
  headerText: {
    textAlign: 'left',
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_BOLD,
    fontSize: theme.FONT_SIZE_SMALL,
    minWidth: 100,
    maxWidth: 100,
  },
  dataStyle: {
    height: 50,
    // justifyContent: ,
  },
  dataText: {
    textAlign: 'left',
    color: theme.DARK_GREY,
    fontWeight: theme.FONT_WEIGHT_NORMAL_,
    fontSize: theme.FONT_SIZE_SMALL,
    maxWidth: 100,
    minWidth: 100,
  },
  rowData: {
    flexDirection: 'row',
  },
  signOutButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.WHITE_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 6,
    borderRadius: theme.BORDER_IMAGE,
    shadowOffset: {width: 0, height: 2},
    shadowColor: theme.DARK_GREY,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: 100,
    minWidth: 100,
  },
  signOutButtonText: {
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
  },
});

export default styles;
