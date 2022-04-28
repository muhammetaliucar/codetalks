import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import styles from './Messages.style';
import auth from '@react-native-firebase/auth';
import {format, formatDistance, parseISO} from 'date-fns';
import MessageImageModal from '../MessageImageModal/MessageImageModal';

const Messages = ({data}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalIsVisible2, setModalIsVisible2] = useState(false);

  const deneme = data.image;
  const currentUserInfo = auth().currentUser.email.split('@')[0];
  const formmattedDate = formatDistance(parseISO(data.date), new Date(), {
    addSuffix: true,
  });

  const handleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  const handleModalClose = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <View>
      {currentUserInfo === data.name ? (
        <View style={styles.dis}>
          <View style={styles.container}>
            <Text style={{color: 'black'}}>{data.content}</Text>
            {data.image === null ? null : (
              <TouchableOpacity onPress={handleModal}>
                <Image
                  source={{uri: data.image}}
                  style={{width: 150, height: 150, borderRadius: 10}}
                />
              </TouchableOpacity>
            )}

            <Text
              style={{textAlign: 'right', marginTop: 5, fontStyle: 'italic'}}>
              {formmattedDate}
            </Text>
            <MessageImageModal
              foto={deneme}
              onClose={handleModalClose}
              isVisible={modalIsVisible}
            />
          </View>
        </View>
      ) : (
        <View style={styles.dis2}>
          <View style={styles.container}>
            <View style={{borderBottomWidth: 1}}>
              <Text style={{fontStyle: 'italic'}}>{data.name}</Text>
            </View>

            <Text style={{color: 'black'}}>{data.content}</Text>
            {data.image === null ? null : (
              <TouchableOpacity onPress={handleModal}>
                <Image
                  source={{uri: data.image}}
                  style={{width: 150, height: 150, borderRadius: 10}}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                textAlign: 'right',
                marginTop: 5,
                fontStyle: 'italic',
                color: 'gray',
              }}>
              {formmattedDate}
            </Text>
          </View>
          <MessageImageModal
            foto={deneme}
            onClose={handleModalClose}
            isVisible={modalIsVisible}
          />
        </View>
      )}
    </View>
  );
};

export default Messages;
