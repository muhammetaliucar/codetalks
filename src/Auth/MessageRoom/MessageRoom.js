import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './MessageRoom.style';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import Messages from '../../components/Messages';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SkeletonMessageRoom from './SkeletonMessageRoom';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import MessageImageModalStyle from '../../components/MessageImageModal/MessageImageModal';

const MessageRoom = ({route}) => {
  const [contentMessage, setContentMessage] = React.useState('');
  const [messagesList, setMessagesList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    firestore()
      .collection('odalar')
      .doc(rom)
      .collection('mesajlar')
      .onSnapshot(documentSnapshot => {
        const parsedData = parsedContentData(
          documentSnapshot.docs.map(x => x.data()) || {},
        );
        setMessagesList(parsedData);
      });
    setLoading(false);
  }, []);

  const rom = route.params;

  const handleSend = () => {
    firestore()
      .collection('odalar')
      .doc(rom)
      .collection('mesajlar')
      .add({
        content: contentMessage,
        name: auth().currentUser.email.split('@')[0],
        date: new Date().toISOString(),
        image: null,
      });
    setContentMessage('');
  };
  ///////
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
        'messagesPhotos/' + media.assets[0].fileName,
      );
      console.error(reference, 'reged');
      const task = reference.putFile(media.assets[0].uri);
      setUploadTask(task);
      task.on('state_changed', taskSnapshot => {
        setUploadTaskSnapshot(taskSnapshot);
      });

      task.then(async () => {
        const downloadUrl = await reference.getDownloadURL();
        setDownloadUrl(downloadUrl);
        await firestore()
          .collection('odalar')
          .doc(rom)
          .collection('mesajlar')
          .add({
            content: contentMessage,
            name: auth().currentUser.email.split('@')[0],
            date: new Date().toISOString(),
            image: downloadUrl,
          });
        setUploadTaskSnapshot({});
      });
    }
  };

  ///////////////////

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios' ? true : false}
      style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={{color: 'white', fontSize: 18}}>{rom} odası kuruldu!</Text>
      </View>
      <View></View>
      <View style={{flex: 0.95}}>
        {loading ? (
          <SkeletonMessageRoom />
        ) : (
          <FlatList
            inverted
            data={[...messagesList].reverse()}
            renderItem={({item}) => <Messages data={item} />}
          />
        )}
      </View>
      <View
        style={{
          borderWidth: 1,
          marginHorizontal: 5,
          borderRadius: 10,
          borderColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.9, padding: 5}}>
          <TextInput
            multiline
            value={contentMessage}
            style={{color: 'white'}}
            onChangeText={setContentMessage}
            placeholder='"metni giriniz..'
            placeholderTextColor={'white'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleSend}>
            <Feather
              style={{marginEnd: 10}}
              name="send"
              color={'white'}
              size={30}
            />
          </TouchableOpacity>
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
              style={{marginEnd: 10}}
              name="photo"
              color={'white'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageRoom;
