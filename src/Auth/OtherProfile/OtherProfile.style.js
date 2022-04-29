import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

const baseStyle = StyleSheet.create({
  containerUp: {
    height: deviceSize.height * 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomRightRadius: 100,
    borderRightRadius: 100,
  },
});

export default StyleSheet.create({
  light: StyleSheet.create({
    ...baseStyle,
    containerUp: {
      ...baseStyle.containerUp,
      backgroundColor: '#ffb74d',
    },
    containerUpInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerDown: {
      height: deviceSize.height * 1,
      borderTopLeftRadius: 20,
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
  }),
  dark: StyleSheet.create({
    ...baseStyle,
    containerUp: {
      ...baseStyle.containerUp,
      backgroundColor: 'gray',
    },
    containerUpInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerDown: {
      height: deviceSize.height * 1,
      borderTopLeftRadius: 20,
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
  }),
});
