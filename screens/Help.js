import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default Help = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.mainContent}>Whatsapp -{'>'} 9599839703</Text>
                <Text style={styles.mainContent}>Email -{'>'} kommentoservice@gmail.com</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        backgroundColor: '#f4511e',
        flex: 0.1,
        justifyContent: 'center',
    },
    mainContent: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 15
    },
    headingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        padding: 10
    }
});
