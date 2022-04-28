import React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {formatDistance, subDays, parseISO} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({data}) => {
  console.log(data, 'fsgs');

  // React.useEffect(() => {
  //   firestore().collection("users").where(data.uid,"==","userId").onSnapshot(res => )
  // }, []);
  const navigation = useNavigation();
  const deneme = data.author;
  const formattedDate = formatDistance(parseISO(data.date), new Date(), {
    addSuffix: true,
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OtherProfile', deneme);
      }}
      style={{
        backgroundColor: '#ffb69d',
        elevation: 8,
        minHeight: Dimensions.get('window').height * 0.15,
        margin: 15,
        borderRadius: 20,
        flexDirection: 'row',
      }}>
      <Image
        source={{uri: data.profilePhoto}}
        style={{
          height: 50,
          width: 50,
          backgroundColor: 'white',
          borderRadius: 50,
          margin: 20,
        }}></Image>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{data.author}</Text>
        <Text style={{marginEnd: 10}}>{data.content}</Text>

        <Text style={{marginTop: 10, fontStyle: 'italic'}}>
          {formattedDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
