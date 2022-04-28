import React from 'react';
import {View, SafeAreaView, Text, FlatList, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import UsersCard from '../../components/UsersCard';
import UserContext from '../../context/UserContext';
import {Tabs} from 'react-native-collapsible-tab-view';

const Users = () => {
  const [usersList, setUsersList] = React.useState();

  React.useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(res => {
        const parsedData = parsedContentData(res.docs.map(x => x.data()));
        setUsersList(parsedData);
      });
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          padding: 20,
          backgroundColor: '#ffb71d',
          width: Dimensions.get('window').width * 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          USERS
        </Text>
      </View>
      <Tabs.Container>
        <Tabs.Tab name="A">
          <Tabs.FlatList
            data={usersList}
            numColumns={2}
            renderItem={({item}) => <UsersCard usersData={item} />}
          />
        </Tabs.Tab>
        <Tabs.Tab name="B">
          <Tabs.FlatList
            data={usersList}
            numColumns={2}
            renderItem={({item}) => <UsersCard usersData={item} />}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

export default Users;
