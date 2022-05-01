import React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {formatDistance, subDays, parseISO} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';

const PostCard = ({data}) => {
  const [trial, setTrial] = React.useState();

  console.log(data, 'vdfg');

  React.useEffect(() => {
    firestore()
      .collection('users')
      .where('userId', '==', data.uid)
      .onSnapshot(res => {
        const parsedData = parsedContentData(res.docs.map(x => x.data()));
        setTrial(parsedData);
      });
  }, []);

  const navigation = useNavigation();

  const formattedDate = formatDistance(parseISO(data.date), new Date(), {
    addSuffix: true,
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OtherProfile', data.author);
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
        }}
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{data.author}</Text>
        <Text style={{marginEnd: 10}}>{data.content}</Text>
        {data.image === undefined ? null : (
          <Image
            style={{height: 100, width: 100, borderRadius: 10}}
            source={{uri: data.image}}
          />
        )}

        <Text style={{marginTop: 10, fontStyle: 'italic'}}>
          {formattedDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
