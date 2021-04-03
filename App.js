import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import DrawerNavigator from './navigation/DrawerNavigator';
import StackNavigatorLogin from './navigation/StackNavigatorLogin';
import Highlights from './screens/Highlights';
import {Button, Text, View} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigatorLogin />
    </NavigationContainer>
  );
};

export default App;
