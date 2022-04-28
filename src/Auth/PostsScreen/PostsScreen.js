import React from 'react';
import {View, SafeAreaView, Text, FlatList, Button} from 'react-native';
import PostCard from '../../components/PostCard';
import FloatingButton from '../../components/FloatingButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import PostInputModal from '../../components/PostInputModal';

const PostsScreen = () => {
  const [postsData, setPostsData] = React.useState([]);
  const [deneme, setDeneme] = React.useState();
  const [uid, setUid] = React.useState();

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    firestore()
      .collection('posts')
      .onSnapshot(documentSnapshot => {
        const parsedData = parsedContentData(
          documentSnapshot.docs.map(x => x.data()) || {},
        );
        setPostsData(parsedData);
      });

    firestore()
      .collection('users')
      .where('name', '==', auth().currentUser.displayName)
      .onSnapshot(res => {
        const parsedData = parsedContentData(res.docs.map(x => x.data()));
        setUid(parsedData[0].userId, 'parsed');
        console.log(uid);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const floButton = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleInputToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSendContent = async content1 => {
    setIsModalVisible(!isModalVisible);
    await firestore().collection('posts').add({
      author: auth().currentUser.displayName,
      content: content1,
      profilePhoto: auth().currentUser.photoURL,
      date: new Date().toISOString(),
      uid: uid,
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={[...postsData].reverse()}
        renderItem={({item}) => <PostCard data={item} />}
      />
      <FloatingButton onPress={floButton} />
      <PostInputModal
        onClose={handleInputToggle}
        isVisible={isModalVisible}
        onSend={handleSendContent}
      />
    </SafeAreaView>
  );
};

export default PostsScreen;
