import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './FloatingButton.style';

const FloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name="plus" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
