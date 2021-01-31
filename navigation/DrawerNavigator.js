import * as React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import StackNavigatorHome from './StackNavigatorHome';
import StackNavigatorHelp from './StackNavigatorHelp';
import HomeIconSideDrawer from '../icons/HomeIconSideDrawer';
import ContactIconSideDrawer from '../icons/ContactIconSideDrawer';
import { Text, SafeAreaView, View, ScrollView } from 'react-native';
import Help from '../screens/Help';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='Home' component={StackNavigatorHome} options={{
                drawerLabel: HomeIconSideDrawer
            }} />
            <Drawer.Screen name='Contact Us' component={StackNavigatorHelp} options={{
                drawerLabel: ContactIconSideDrawer
            }} />
        </Drawer.Navigator>
    );
};