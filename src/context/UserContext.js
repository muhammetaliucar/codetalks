import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [data, setData] = React.useState({
    name: '',
    photoUrl: '',
    email: '',
    userId: '',
  });

  const [theme, setTheme] = React.useState({
    theme: 'light',
  });

  return (
    <UserContext.Provider value={{data, setData, theme, setTheme}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
