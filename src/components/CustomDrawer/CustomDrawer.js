import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../../context/UserContext';

const CustomDrawer = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const {theme, setTheme} = React.useContext(UserContext);
  const {data, setData} = React.useContext(UserContext);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (isEnabled === true) {
      setTheme({theme: 'dark'});
    } else {
      setTheme({theme: 'light'});
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
        <Image
          source={{uri: data.photoUrl}}
          style={{height: 100, width: 100, borderRadius: 100}}
        />
        <View style={{justifyContent: 'center', marginStart: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#ffb71d'}}>
            {data.name}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginStart: 20,
          }}>
          <FontAwesome size={30} color="#ffb71d" name="edit" />
          <Text style={{fontSize: 20, marginStart: 10, color: '#ffb71d'}}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => auth().signOut()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginStart: 20,
          }}>
          <FontAwesome size={30} color="#ffb71d" name="sign-out" />
          <Text style={{fontSize: 20, marginStart: 10, color: '#ffb71d'}}>
            Sign Out
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginStart: 20,
          }}>
          <Ionicons name="moon" size={20} color="black" />
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#ffb71d' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{marginRight: 5, marginLeft: 5}}
          />
          <Ionicons name="md-sunny" size={20} color="#ffb71d" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
