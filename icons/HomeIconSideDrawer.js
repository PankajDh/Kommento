import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Text, View, StyleSheet } from 'react-native';

const HomeIconSideDrawer = () => {
    return (
        <View style={styles.main}>
            <FontAwesomeIcon
                icon={faHome}
                size={20}
            />
            <Text style={styles.text}>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    text: {
        paddingLeft: 10,
        fontSize: 18
    }
});

export default HomeIconSideDrawer;