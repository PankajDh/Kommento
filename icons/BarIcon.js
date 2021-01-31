import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DrawerActions } from '@react-navigation/native';


const BarIcon = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} >
            <FontAwesomeIcon icon={faBars} style={styles.barIcon} size={20} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    barIcon: {
        color: 'white',
        paddingVertical: 40,
        marginLeft: 10
    }
});

export default BarIcon;