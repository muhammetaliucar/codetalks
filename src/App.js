import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Public/Login';
import Sign from './Public/Sign';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import Rooms from './Auth/Rooms/Rooms';
import MessageRoom from './Auth/MessageRoom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from './Auth/Profile';
import PostsScreen from './Auth/PostsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import OtherProfile from './Auth/OtherProfile/OtherProfile';
import Users from './Auth/Users/Users';
import {UserProvider} from './context/UserContext';
import UserContext from './context/UserContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const App = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const PublicStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };

  const TopTabAuth = () => {
    return (
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {color: 'white'},
          tabBarStyle: {backgroundColor: '#ffb66d'},
        }}>
        <TopTab.Screen
          options={{title: 'posts'}}
          name="TopTabPostScreen"
          component={PostsScreen}
        />

        <TopTab.Screen
          options={{title: 'ROOMS'}}
          name="TopTabRooms"
          component={Rooms}
        />
      </TopTab.Navigator>
    );
  };

  const DrawerAuth = () => {
    const {theme, setTheme} = React.useContext(UserContext);
    const navigation = useNavigation();

    return (
      <Drawer.Navigator
        drawerContent={(...props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="RoomsDrawer"
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{marginStart: 10}}>
                <FontAwesome name="th-list" size={20} color={'black'} />
              </TouchableOpacity>
            ),
            headerBackgroundContainerStyle: {backgroundColor: 'blue'},
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            title: 'Home',
            drawerStyle: {
              backgroundColor: theme.theme === 'light' ? 'white' : 'gray',
            },
          }}
          component={TopTabAuth}
        />
      </Drawer.Navigator>
    );
  };

  const BottomTabAuth = () => {
    const {theme, setTheme} = React.useContext(UserContext);
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderRadius: 20,
            right: 20,
            left: 20,
            backgroundColor: theme.theme === 'light' ? '#ffb74d' : 'gray',
            bottom: 10,
          },
        }}>
        <BottomTab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <AntDesign
                  name="home"
                  size={30}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            ),
          }}
          name="MessageRooms"
          component={DrawerAuth}
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                name="users"
                size={30}
                color={focused ? 'white' : 'black'}
              />
            ),
          }}
          name="UsersBottom"
          component={Users}
        />
        <BottomTab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome
                name="user-circle"
                size={30}
                color={focused ? 'white' : 'black'}
              />
            ),
          }}
          name="ProfileBottom"
          component={Profile}
        />
      </BottomTab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Rooms" component={BottomTabAuth} />
        <Stack.Screen
          name="MessageRoom"
          component={MessageRoom}
          options={({route}) => ({
            headerTintColor: '#ffb74d',
            headerTitleAlign: 'center',
            headerTitle: route.params,
            headerShown: true,
            headerRight: () => (
              <Icon
                name="account-arrow-right-outline"
                size={34}
                color="#ffa040"
                style={{marginEnd: 10}}
                onPress={() => auth().signOut()}
              />
            ),
          })}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="Profile"
          component={BottomTabAuth}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: '',
          }}
          name="OtherProfile"
          component={OtherProfile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: '',
          }}
          name="Users"
          component={Users}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          {!userSession ? (
            <Stack.Screen name="PublicStack" component={PublicStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
        <FlashMessage position={'top'} />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
