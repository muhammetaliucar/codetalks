import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  containerUp: {
    backgroundColor: '#ffb74d',
    height: Dimensions.get('window').height * 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomRightRadius: 100,
    borderRightRadius: 100,
  },
  containerUpInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDown: {
    height: Dimensions.get('window').height,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
    marginStart: 20,
  },
  photoButtonArea: {
    flexDirection: 'row',
    marginTop: 10,
    marginStart: 20,
    justifyContent: 'center',
  },
  downButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
