import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Sign.style';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const initialFormValues = {
  email: '',
  password: '',
  name: '',
};

const Sign = () => {
  const makeId = () => {
    let ID = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 12; i++) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
  };

  const navigation = useNavigation();

  const [passW, setPassw] = useState('');

  const handleFormValues = async values => {
    if (passW === values.password) {
      try {
        await auth().createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
        firestore().collection('users').add({
          email: values.email,
          password: values.password,
          profilphoto: downloadUrl,
          name: values.name,
          userId: makeId(),
        });

        showMessage({
          message: 'Kayıt oldunuz!',
          type: 'success',
        });
        auth().currentUser.updateProfile({
          displayName: values.name,
          photoURL: downloadUrl,
        });
        navigation.navigate('Login');
      } catch (error) {
        showMessage({
          message: error.code,
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Şifreler aynı değil.',
        type: 'danger',
      });
    }
  };

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

        setUploadTaskSnapshot({});
      });
    }
  };

  const [photo, setPhoto] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>codetalks</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            backgroundColor: 'white',
            marginBottom: 20,
          }}
          source={{uri: downloadUrl}}
        />
        <View style={{flexDirection: 'row'}}>
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
      <Formik onSubmit={handleFormValues} initialValues={initialFormValues}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.loginButtons}>
            <Input
              value={values.name}
              onChangeText={handleChange('name')}
              placeHolder={'isminizi giriniz..'}
            />
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              placeHolder={'emailinizi giriniz..'}
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeHolder={'parolanızı giriniz..'}
            />
            <Input
              onChangeText={setPassw}
              placeHolder={'parolanızı tekrar giriniz..'}
            />
            <Button
              theme={'primary'}
              title={'Kayıt Ol'}
              onPress={handleSubmit}
            />
            <Button
              theme={'secondary'}
              title={'Geri Dön'}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Sign;
