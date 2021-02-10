import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { faFutbol, faBasketballBall, faVolleyballBall, faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ListenBySports = ({ navigation }) => {
    const TABLE_TENNIS = 'Table Tennis';
    const VOLLEYBALL = 'Volleyball';
    const FOOTBALL = 'Football';
    const BASKETBALL = 'Basketball';

    return (
        <View style={styles.main}>
            <TouchableOpacity>
                <View style={styles.eachGame}>
                    <FontAwesomeIcon icon={faFutbol} size={40} />
                    <Text>{FOOTBALL}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.eachGame}>
                    <FontAwesomeIcon icon={faTableTennis} size={40} />
                    <Text>{TABLE_TENNIS}</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.eachGame}>
                    <FontAwesomeIcon icon={faBasketballBall} size={40} />
                    <Text>{BASKETBALL}</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.eachGame}>
                    <FontAwesomeIcon icon={faVolleyballBall} size={40} />
                    <Text>{VOLLEYBALL}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        borderRadius: 5,
        // elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eachGame: {
        borderRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 4.5,
        height: 100

    }
});

export default ListenBySports;