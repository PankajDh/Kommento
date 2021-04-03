import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BarIcon from '../icons/BarIcon';
import PlayerModal from '../modals/playerModal';
import CommentariesByMatch from '../screens/CommentariesByMatch';
import Home from '../screens/Home';
import Recorder from '../screens/Recorder';

const Stack = createStackNavigator();

export default StackNavigatorHome = () => {
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
        name="Kommento"
        component={Home}
        options={{title: 'Kommento'}}
      />
      <Stack.Screen
        name="CommentariesByMatch"
        component={CommentariesByMatch}
        options={{title: 'Current Game'}}
      />
      <Stack.Screen
        name="Current Game Is"
        component={PlayerModal}
        options={{title: 'Current Game'}}
      />
    </Stack.Navigator>
  );
};
