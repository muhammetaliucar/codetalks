import React from 'react';
import {View, SafeAreaView, Text, FlatList, Button} from 'react-native';
import PostCard from '../../components/PostCard';
import FloatingButton from '../../components/FloatingButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import PostInputModal from '../../components/PostInputModal';
import UserContext from '../../context/UserContext';

const PostsScreen = () => {
  const [postsData, setPostsData] = React.useState([]);
  const {data, setData} = React.useContext(UserContext);
  const {theme, setTheme} = React.useContext(UserContext);

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
      .where('email', '==', auth().currentUser.email)
      .onSnapshot(res => {
        const parsedData = parsedContentData(res.docs.map(x => x.data()));
        setData({
          name: parsedData[0].name,
          userId: parsedData[0].userId,
          email: parsedData[0].email,
          photoUrl: parsedData[0].profilphoto,
        });
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
      author: data.name,
      content: content1,
      profilePhoto: auth().currentUser.photoURL,
      date: new Date().toISOString(),
      uid: data.userId,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.theme === 'light' ? 'white' : 'gray',
      }}>
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
