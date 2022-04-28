import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomDrawer = () => {
  return (
    <SafeAreaView>
      <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
        <Image
          source={{uri: auth().currentUser.photoURL}}
          style={{height: 100, width: 100, borderRadius: 100}}
        />
        <View style={{justifyContent: 'center', marginStart: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#ffb71d'}}>
            {auth().currentUser.displayName}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
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
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <FontAwesome size={30} color="#ffb71d" name="sign-out" />
          <Text style={{fontSize: 20, marginStart: 10, color: '#ffb71d'}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
