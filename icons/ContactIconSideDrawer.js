import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Text, View, StyleSheet } from 'react-native';

const ContactIconSideDrawer = () => {
    return (
        <View style={styles.main}>
            <FontAwesomeIcon
                icon={faPhone}
                size={20}
                color={'black'}
            />
            <Text style={styles.text}>Contact Us</Text>
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

export default ContactIconSideDrawer;