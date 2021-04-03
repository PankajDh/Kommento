import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import DrawerNavigator from './navigation/DrawerNavigator';
import StackNavigatorLogin from './navigation/StackNavigatorLogin';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigatorLogin />
    </NavigationContainer>
  );
  // return(
  //   <SendSms />
  // )
};



export default App;