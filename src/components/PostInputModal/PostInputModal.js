import React from 'react';
import {View, Text, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import styles from './PostInputModal.style';
import Button from '../Button';
import Input from '../Input';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const PostInputModal = ({isVisible, onClose, onSend}) => {
  const [deneme, setDeneme] = React.useState(null);
  const [obj, setObj] = React.useState({});

  const [downloadUrl1, setDownloadUrl1] = React.useState();
  const [uploadTask, setUploadTask] = React.useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = React.useState({});

  const onTakePhoto = () => {
    launchCamera({mediaType: 'photo'}, onMediaSelect);
  };

  const onSelectImagePress = async () => {
    launchImageLibrary({mediaType: 'photo'}, await onMediaSelect);
  };

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      const reference = storage().ref(media.assets[0].fileName);
      const task = reference.putFile(media.assets[0].uri);
      setUploadTask(task);
      task.on('state_changed', taskSnapshot => {
        setUploadTaskSnapshot(taskSnapshot);
      });

      task.then(async () => {
        const downloadUrl = await reference.getDownloadURL();
        setDownloadUrl1(downloadUrl);
        console.log(downloadUrl1, 'fsgsd');

        setUploadTaskSnapshot({});
      });
    }
  };

  const [sender, setSender] = React.useState({});

  const handleSend = () => {
    setSender({content: deneme, image: downloadUrl1});
    () => onSend(sender);
  };

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      style={styles.container}>
      <View style={styles.modalView}>
        <TextInput
          multiline
          style={{fontSize: 20}}
          placeholder="Mesajınızı giriniz"
          onChangeText={setDeneme}
        />

        <Button title={'Gönder'} theme={'primary'} onPress={handleSend} />
        <View>
          <Button
            title="yükle"
            theme={'secondary'}
            onPress={onSelectImagePress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PostInputModal;
