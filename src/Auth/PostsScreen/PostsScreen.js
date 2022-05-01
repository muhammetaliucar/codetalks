import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Button,
  RefreshControl,
} from 'react-native';
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

  const fetchData = async () => {
    await firestore()
      .collection('posts')
      .onSnapshot(documentSnapshot => {
        const parsedData = parsedContentData(
          documentSnapshot.docs.map(x => x.data()) || {},
        );
        setPostsData(parsedData);
      });

    await firestore()
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
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const [isFetching, setIsFetching] = React.useState(false);

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
    setIsFetching(false);
  };

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const floButton = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleInputToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSendContent = async content1 => {
    setIsModalVisible(!isModalVisible);
    console.log(content1, 'regdrfg');
    await firestore().collection('posts').add({
      author: data.name,
      content: content1.content,
      profilePhoto: auth().currentUser.photoURL,
      date: new Date().toISOString(),
      uid: data.userId,
      image: content1.image,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.theme === 'light' ? 'white' : 'gray',
      }}>
      <FlatList
        style={{marginBottom: 65}}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
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
