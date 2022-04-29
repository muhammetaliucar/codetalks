import React from 'react';
import {
  View,
  SafeAreaView,
  CheckBox,
  Text,
  FlatList,
  Dimensions,
  Switch,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import parsedContentData from '../../utils/parsedContentData';
import UsersCard from '../../components/UsersCard';
import UserContext from '../../context/UserContext';
import MasonryList from '@react-native-seoul/masonry-list';

const Users = () => {
  const [usersList, setUsersList] = React.useState();
  const {theme, setTheme} = React.useContext(UserContext);

  console.log(theme, 'bgfgbd');

  React.useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(res => {
        const parsedData = parsedContentData(res.docs.map(x => x.data()));

        setUsersList(parsedData);
      });
  }, []);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    console.log(isEnabled);
    if (isEnabled === true) {
      setTheme({theme: 'dark'});
    } else {
      setTheme({theme: 'light'});
    }
    console.log(theme.theme, 'key');
    console.log(theme.theme === 'dark', ' tema');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.theme === 'light' ? 'white' : 'gray',
      }}>
      <View
        style={{
          padding: 20,
          backgroundColor: theme.theme === 'light' ? '#ffb71d' : 'black',
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
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <FlatList
        data={usersList}
        numColumns={2}
        renderItem={({item}) => <UsersCard usersData={item} />}
      />
    </SafeAreaView>
  );
};

export default Users;
