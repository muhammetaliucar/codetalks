import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Input.style';

const Input = ({placeHolder, onChangeText, value}) => {
  return (
    <View style={styles.view}>
      <TextInput
        autoCapitalize="none"
        value={value}
        style={styles.container}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        placeholderTextColor={'gray'}
      />
    </View>
  );
};

export default Input;
