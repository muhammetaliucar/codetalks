import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import Button from '../Button';
import styles from './RoomsCard.style';
import {useNavigation} from '@react-navigation/native';

const RoomsCard = ({text, item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MessageRoom', item.content)}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoomsCard;
