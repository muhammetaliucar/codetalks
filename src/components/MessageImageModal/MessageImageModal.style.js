import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    margin: 0,
    marginHorizontal: 10,
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height * 0.5,
  },
  image: {
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 1,
    resizeMode: 'contain',
  },
});
