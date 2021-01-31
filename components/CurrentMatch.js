import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CurrentMatch = () => {
    const teamOne = 'India';
    const teamTwo = 'Australia';

    return (
        <View style={styles.currentMatch}>
            <View style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCircle} size={10} color={'#36F910'} style={styles.liveDot} />
                <Text style={styles.liveText}>Live</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/india.png')} style={styles.teamLogo} />
                    <Text style={styles.teamText}>{teamOne}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>V/S</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/aus.png')} style={styles.teamLogo} />
                    <Text style={styles.teamText}>{teamTwo}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    currentMatch: {
        // paddingTop: 10,
        borderRadius: 5,
        // borderWidth: 2,
        // borderColor: 'grey',
        backgroundColor: 'white',
        elevation: 10
    },
    liveDot: {
        paddingVertical: 10
    },
    liveText: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    teamLogo: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    teamText: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default CurrentMatch;