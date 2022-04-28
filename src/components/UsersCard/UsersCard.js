import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './UsersCard.style';
import {useNavigation} from '@react-navigation/native';

const UsersCard = ({usersData}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OtherProfile', usersData.name)}
      style={styles.container}>
      <Image source={{uri: usersData.profilphoto}} style={styles.image} />
      <Text style={styles.nameText}>{usersData.name}</Text>
    </TouchableOpacity>
  );
};

export default UsersCard;
