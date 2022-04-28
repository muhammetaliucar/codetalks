import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './Profile.style';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import PostCard from '../../components/PostCard';

const Profile = () => {
  const [uid, setUid] = React.useState('');
  const [contentList, setContentList] = React.useState({});

  React.useEffect(() => {
    console.log(
      firestore()
        .collection('posts')
        .where('author', '==', auth().currentUser.displayName)
        .onSnapshot(documentSnapshot => {
          const parsedData = parsedContentData(
            documentSnapshot.docs.map(x => x.data()) || {},
          );
          setContentList(parsedData);
          console.log(contentList);
        }),
    );
  }, []);

  React.useEffect(() => {
    firestore()
      .collection('users')
      .where('name', '==', auth().currentUser.displayName)
      .get()
      .then(res => {
        setUid(res.docs.map(x => x.id));
        console.log(uid);
      });
  }, [setUid]);

  const deneme = auth().currentUser.photoURL;

  const [downloadUrl, setDownloadUrl] = React.useState();
  const [uploadTask, setUploadTask] = React.useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = React.useState({});

  const onTakePhoto = () => {
    launchCamera({mediaType: 'photo'}, onMediaSelect);
  };

  const onSelectImagePress = () => {
    launchImageLibrary({mediaType: 'photo'}, onMediaSelect);
  };

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      const reference = storage().ref(
        'profilePhotos/' + media.assets[0].fileName,
      );
      const task = reference.putFile(media.assets[0].uri);
      setUploadTask(task);
      task.on('state_changed', taskSnapshot => {
        setUploadTaskSnapshot(taskSnapshot);
      });

      task.then(async () => {
        const downloadUrl = await reference.getDownloadURL();
        setDownloadUrl(downloadUrl);
        await auth().currentUser.updateProfile({
          photoURL: downloadUrl,
        });

        setUploadTaskSnapshot({});
      });
    }
  };

  const MyProfileHeader = () => {
    return (
      <View style={styles.containerUp}>
        <View style={styles.containerUpInnerContainer}>
          <View>
            <Image style={styles.image} source={{uri: deneme}} />
            <View style={styles.photoButtonArea}>
              <TouchableOpacity onPress={onTakePhoto}>
                <Feather
                  style={{marginEnd: 10}}
                  name="camera"
                  color={'white'}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onSelectImagePress}>
                <FontAwesome
                  style={{marginStart: 20, marginEnd: 10}}
                  name="photo"
                  color={'white'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{fontSize: 30, color: 'white', marginStart: 20}}>
              {auth().currentUser.displayName}
            </Text>
            <Text style={{fontSize: 18, color: 'white', marginStart: 20}}>
              {auth().currentUser.email}
            </Text>
            <Text style={{fontSize: 18, color: 'white', marginStart: 20}}>
              Post Sayısı:{Object.keys(contentList).length}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.containerDown}>
        {Object.keys(contentList).length === 0 ? (
          <View style={{flex: 1}}>
            <MyProfileHeader />
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Hiç post yok.</Text>
            </View>
          </View>
        ) : (
          <View style={{flex: 0.9}}>
            <FlatList
              style={{flex: 1}}
              ListHeaderComponent={<MyProfileHeader />}
              data={[...contentList].reverse()}
              renderItem={({item}) => <PostCard data={item} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
