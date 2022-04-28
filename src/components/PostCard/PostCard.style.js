import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    minHeight: deviceSize.height / 7,
    backgroundColor: 'gray',
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'black',
    elevation: 8,
    flex: 1,
  },
  content: {
    flex: 0.33,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  inner_container: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  author: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0.5,
    marginEnd: 10,
    marginBottom: 10,
  },
  like_dislike: {},
  author_text: {
    fontStyle: 'italic',
    color: 'white',
  },
  date: {
    color: 'white',
    fontStyle: 'italic',
    opacity: 0.7,
  },
});
