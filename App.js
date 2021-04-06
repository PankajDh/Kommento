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

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 5,
  updateDialog: true,
};

App = codePush(App);
export default App;
