import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../Constants';
import Recorder from './Recorder';

const BroadcastNotAvailable = () => {
    if (Constants.APP_TYPE === 'Audience') {
        return (
            <View style={styles.mainView}>
                <Text style={styles.notAvailableText}>
                    This Feature is currently not available for you
                    please contact us and get your KYC done to start
                    commentary
                </Text>
            </View>
        );
    } else {
        return <Recorder />
    }
};

const styles = StyleSheet.create({
    mainView: {
        margin: 10
    },
    notAvailableText: {
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default BroadcastNotAvailable;