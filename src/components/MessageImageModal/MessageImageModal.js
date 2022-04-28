import React from 'react';
import {View, Text, Dimensions, TextInput, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './MessageImageModal.style';
import Button from '../Button';
import Input from '../Input';

const MessageImageModal = ({isVisible, onClose, route, foto}) => {
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      onSwipeComplete={onClose}
      style={styles.container}>
      <View style={styles.modalView}>
        <Image source={{uri: foto}} style={styles.image} />
      </View>
    </Modal>
  );
};

export default MessageImageModal;
