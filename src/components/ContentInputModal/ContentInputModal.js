import React from 'react';
import {View, Text, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import styles from './ContentInputModal.style';
import Button from '../Button';
import Input from '../Input';

const ContentInputModal = ({isVisible, onClose, onSend}) => {
  const [deneme, setDeneme] = React.useState(null);

  const handleSend = () => {
    onSend(deneme);
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
          style={{fontSize: 34}}
          placeholder="Oda adını giriniz"
          onChangeText={setDeneme}
        />

        <Button title={'Gönder'} theme={'primary'} onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;
