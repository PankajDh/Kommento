import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigatorHome';
import Help from '../screens/Help';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {

    const homeIcon = ({ focused }) => {
        return (
            <FontAwesomeIcon
                icon={faHome}
                size={35}
                color={focused ? 'white' : 'black'}
            />
        );
    };

    const helpIcon = ({ focused }) => {
        return (
            <FontAwesomeIcon
                icon={faPhone}
                size={30}
                color={focused ? 'white' : 'black'}
            />
        );
    };

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                activeTintColor: 'black',
                style: {
                    backgroundColor: '#f4511e'
                }
            }}
        >
            <Tab.Screen name='Home' component={StackNavigator} options={{
                tabBarLable: 'Home',
                tabBarIcon: homeIcon,
            }} />
            <Tab.Screen name='Contact Us' component={Help} options={{
                tabBarLable: 'Contact Us',
                tabBarIcon: helpIcon
            }}
            />
        </Tab.Navigator>
    );
};