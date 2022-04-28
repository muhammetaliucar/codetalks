import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: deviceSize.height / 4,
    width: deviceSize.width * 0.4,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb69d',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
});
