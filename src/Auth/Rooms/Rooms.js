import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import Modal from 'react-native-modal';
import RoomsCard from '../../components/RoomsCard';
import ContentInputModal from '../../components/ContentInputModal/ContentInputModal';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import {useNavigation} from '@react-navigation/native';

const Rooms = () => {
  const [contentList, setContentList] = useState([]);

  React.useEffect(() => {
    firestore()
      .collection('odalar')
      .onSnapshot(documentSnapshot => {
        const parsedData = parsedContentData(
          documentSnapshot.docs.map(x => x.data()) || {},
        );
        setContentList(parsedData, '123');
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const floButton = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleInputToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSendContent = content => {
    setIsModalVisible(!isModalVisible);
    firestore().collection('odalar').doc(content).set({content: content});
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          keyExtractor={item => item.id}
          numColumns={2}
          data={contentList}
          renderItem={({item}) => <RoomsCard text={item.content} item={item} />}
        />
      </View>

      <FloatingButton onPress={floButton} />
      <ContentInputModal
        onClose={handleInputToggle}
        isVisible={isModalVisible}
        onSend={handleSendContent}
      />
    </SafeAreaView>
  );
};

export default Rooms;
