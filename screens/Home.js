import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CurrentMatch from '../components/CurrentMatch.js';
import ListenBySports from '../components/ListenBySports';

const Home = ({ navigation }) => {

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Current Game')}>
                <View style={styles.main}>
                    <View >
                        <Text style={styles.headingText}>
                            Featured Matches
                    </Text>
                    </View>
                    <CurrentMatch />
                </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
                <View >
                    <Text style={styles.headingText}>
                        Listen By Sports
                    </Text>
                </View>
                <ListenBySports />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 20,
        backgroundColor: '#FBFCFC'
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 20
    },
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

export default Home;