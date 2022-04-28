import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  dis: {
    flex: 1,
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  container: {
    minHeight: deviceSize.height * 0.05,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    minWidth: deviceSize.width * 0.4,
    maxWidth: deviceSize.width * 0.5,
  },
  dis2: {
    flex: 1,
    alignItems: 'flex-start',
    marginVertical: 10,
  },
});
