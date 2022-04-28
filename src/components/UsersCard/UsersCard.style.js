import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: deviceSize.width * 0.4,
    height: deviceSize.height * 0.2,
    backgroundColor: '#ffb69d',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 75,
  },
  nameText: {
    fontWeight: 'bold',
  },
});
