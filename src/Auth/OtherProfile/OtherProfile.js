import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './OtherProfile.style';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import PostCard from '../../components/PostCard';
import Header from '../../components/Header/Header';

const OtherProfile = ({route}) => {
  const id = route.params;
  const [contentList, setContentList] = React.useState({});

  React.useEffect(() => {
    firestore()
      .collection('posts')
      .where('author', '==', id)
      .onSnapshot(documentSnapshot => {
        const parsedData = parsedContentData(
          documentSnapshot.docs.map(x => x.data()) || {},
        );
        setContentList(parsedData);
      });
  }, []);

  React.useEffect(() => {
    firestore()
      .collection('users')
      .where('name', '==', id)
      .onSnapshot(documentSnapshot => {
        const parsedData1 = parsedContentData(
          documentSnapshot.docs.map(x => x.data()),
        );
        setOtherProfileUrl(parsedData1[0].profilphoto);
      });
  }, [otherProfileUrl]);

  const [otherProfileUrl, setOtherProfileUrl] = React.useState();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.containerDown}>
        {Object.keys(contentList).length === 0 ? (
          <View style={{flex: 1}}>
            <Header data={contentList} otpu={otherProfileUrl} name={id} />

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Hiç post yok.</Text>
            </View>
          </View>
        ) : (
          <View>
            <FlatList
              ListHeaderComponent={
                <Header data={contentList} otpu={otherProfileUrl} name={id} />
              }
              data={[...contentList].reverse()}
              renderItem={({item}) => <PostCard data={item} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OtherProfile;
