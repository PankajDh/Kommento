import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CurrentMatch from '../components/CurrentMatch';
import CurrentMatchesList from '../components/CurrentMatchesList';

const CommentariesByMatch = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <CurrentMatch />
            <View style={{ paddingTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Commentaries</Text>
                <CurrentMatchesList matchName='India Vs England, First Test Chennai' navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        padding: 20,
        backgroundColor: '#FBFCFC'
    },
});

export default CommentariesByMatch;