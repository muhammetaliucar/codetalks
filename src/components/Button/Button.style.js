import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

const baseStyle = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderRadius: 7,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa040',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StyleSheet.create({
  primary: StyleSheet.create({
    ...baseStyle,
    container: {
      ...baseStyle.container,
      backgroundColor: '#ffa040',
    },
    text: {
      ...baseStyle.text,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...baseStyle,
    container: {
      ...baseStyle.container,
      backgroundColor: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...baseStyle,
    container: {
      ...baseStyle.container,
      backgroundColor: 'white',
    },
    text: {
      ...baseStyle.text,
      color: '#ffa040',
    },
  }),
});
