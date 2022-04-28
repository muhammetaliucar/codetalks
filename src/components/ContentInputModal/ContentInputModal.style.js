import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  modalView: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',

    minHeight: Dimensions.get('window').height * 0.3,
  },
});
