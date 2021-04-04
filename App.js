import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import StackNavigatorLogin from './navigation/StackNavigatorLogin';
import codePush from 'react-native-code-push';

let App = () => {
  return (
    <NavigationContainer>
      <StackNavigatorLogin />
    </NavigationContainer>
  );
};
App = codePush(App);
export default App;
