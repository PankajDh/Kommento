import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BarIcon from '../icons/BarIcon';
import PlayerModal from '../modals/playerModal';
import CommentariesByMatch from '../screens/CommentariesByMatch';
import Home from '../screens/Home';
import SendSms from '../screens/SendSms';
import VerifyCode from '../screens/VerifyCode';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigatorLogin = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name='SendSms' component={SendSms} options={{ title: 'Kommento' }} />
            <Stack.Screen name='VerifyCode' component={VerifyCode} options={{ title: 'Kommento' }} />
            <Stack.Screen name='Drawer' component={DrawerNavigator} options={{ title: 'Kommento' }} />
        </Stack.Navigator>
    );
};

export default StackNavigatorLogin;

