import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BarIcon from '../icons/BarIcon';
import BroadcastNotAvailable from '../screens/BroadcastNotAvailable';
import Recorder from '../screens/Recorder';
import ChooseMatchToComment from '../screens/ChooseMatchToComment';

const Stack = createStackNavigator();

export default StackNavigatorBroadcast = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#e83b61',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          // fontWeight: 'bold',
          fontSize: 25,
        },
        headerTitleContainerStyle: {
          left: 50, // distance between three horizontal bars and the main title
        },
        headerLeft: () => <BarIcon navigation={navigation} />,
      })}>
      <Stack.Screen
        name="Broadcast Live"
        component={BroadcastNotAvailable}
        options={{title: 'Broadcast Live'}}
      />
      <Stack.Screen
        name="ChooseMatchToComment"
        component={ChooseMatchToComment}
        options={{title: 'Broadcast Live'}}
      />
      <Stack.Screen
        name="Recorder"
        component={Recorder}
        options={{title: 'Broadcast Live'}}
      />
    </Stack.Navigator>
  );
};
