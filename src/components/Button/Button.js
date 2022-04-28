import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './Button.style';

const Button = ({title, onPress, theme}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].container}>
      <Text style={styles[theme].text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
