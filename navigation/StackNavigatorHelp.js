import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BarIcon from '../icons/BarIcon';
import Help from '../screens/Help';

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
        name="Contact"
        component={Help}
        options={{title: 'Contact'}}
      />
    </Stack.Navigator>
  );
};
