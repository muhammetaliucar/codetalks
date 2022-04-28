import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/Input';
import styles from './Login.style';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import parsedContentData from '../../utils/parsedContentData';
import UserContext from '../../context/UserContext';

const initialFormValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigation = useNavigation();
  const {data, setData} = React.useContext(UserContext);
  const [deneme, setDeneme] = React.useState();

  const handleSubmitFormValues = async values => {
    if (values.email == '' || values.password == '') {
      try {
        await auth().signInWithEmailAndPassword('ali@mail.com', '123123');
        showMessage({
          message: 'Başarıyla giriş yaptınız',
          type: 'success',
        });
        firestore()
          .collection('users')
          .where('email', '==', 'ali@mail.com')
          .onSnapshot(res => {
            const parsedData = parsedContentData(res.docs.map(x => x.data()));
            setData({
              name: parsedData[0].name,
              userId: parsedData[0].userId,
              email: parsedData[0].email,
            });
          });
      } catch (error) {
        showMessage({
          message: error.code,
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Parola veya e-maili girmediniz..',
        type: 'danger',
      });
    }
  };

  const [secure, setSecure] = React.useState(true);
  const [icon, setIcon] = React.useState('eye');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>codetalks</Text>
      </View>
      <Formik
        onSubmit={handleSubmitFormValues}
        initialValues={initialFormValues}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.loginButtons}>
            <View style={{flex: 0}}>
              <Input
                onChangeText={handleChange('email')}
                value={values.email}
                placeHolder={'e-postanızı giriniz..'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'white',
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                padding: 6,
                backgroundColor: 'white',
              }}>
              <TextInput
                onChangeText={handleChange('password')}
                placeholder="parolanızı giriniz.."
                placeholderTextColor={'gray'}
                secureTextEntry={secure}
                style={{
                  flex: 1,
                  color: 'gray',
                  marginStart: -4,

                  marginHorizontal: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => setSecure(!secure)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginEnd: 18,
                }}>
                <Feather
                  name={secure ? 'eye' : 'eye-off'}
                  color={'gray'}
                  size={30}
                />
              </TouchableOpacity>
            </View>

            <Button
              onPress={handleSubmit}
              theme={'primary'}
              title={'Giriş Yap'}
            />
            <Button
              theme={'secondary'}
              title={'Kayıt Ol'}
              onPress={() => navigation.navigate('Sign')}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
