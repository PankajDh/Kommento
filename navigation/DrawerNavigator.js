import * as React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import StackNavigatorHome from './StackNavigatorHome';
import StackNavigatorHelp from './StackNavigatorHelp';
import HomeIconSideDrawer from '../icons/HomeIconSideDrawer';
import ContactIconSideDrawer from '../icons/ContactIconSideDrawer';
import { Text, SafeAreaView, View, ScrollView, Image, StyleSheet } from 'react-native';
import Help from '../screens/Help';
import Recorder from '../screens/Recorder';
import BroadcastIconSideDrawer from '../icons/BroadcastIconSideDrawer';
import StackNavigatorBroadcast from './StackNavigatorBroadcast';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={styles.main}>
                    <Image
                        source={require('../assets/Kommento.jpeg')}
                        style={styles.kommentoLogo}
                    />
                    {/* <Text>kommentoservice@gmail.com</Text> */}
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='Home' component={StackNavigatorHome} options={{
                drawerLabel: HomeIconSideDrawer
            }} />
            <Drawer.Screen name='Broadcast' component={StackNavigatorBroadcast} options={{
                drawerLabel: BroadcastIconSideDrawer
            }} />
            <Drawer.Screen name='Contact Us' component={StackNavigatorHelp} options={{
                drawerLabel: ContactIconSideDrawer
            }} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    main: {
        borderBottomWidth: 2,
        marginBottom: 10,
        borderBottomColor: '#F93C5B',
        backgroundColor: '#F93C5B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    kommentoLogo: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
    }
});