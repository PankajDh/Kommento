import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import PlayerModal from '../modals/playerModal';
import Constants from '../Constants';
import requestCameraAndAudioPermission from './Permissions';

const CurrentMatchesList = ({ matchName, navigation }) => {
    if (!matchName) {
        matchName = 'India Vs England';
    }

    const matchList = [
        {
            id: 1,
            speaker: 'Youtube',
            language: 'Hindi',
            appId: Constants.APP_ID,
            token: Constants.TOKEN,
            channelName: Constants.CHANNEL_NAME
        },
        {
            id: 2,
            speaker: 'Hotstar',
            language: 'English',
            appId: Constants.APP_ID,
            token: Constants.TOKEN,
            channelName: Constants.CHANNEL_NAME
        },
    ];

    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    // take the permission
    if (Platform.OS === Constants.ANDROID) {
        requestCameraAndAudioPermission().then(() => {
            console.log('requested!')
        });
    }

    const onPlayPausePress = async (item) => {
        setSelectedItem(item);
        setModalVisibility(!modalVisibility);
    };

    return (
        <View>
            <FlatList
                style={{}}
                data={matchList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 5, marginVertical: 3, borderRadius: 5, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{matchName}</Text>
                            <Text>{item.speaker} | {item.language}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => onPlayPausePress(item)}>
                                <FontAwesomeIcon icon={faPlayCircle} size={30} style={{ color: '#F93C5B' }} />
                                {
                                    modalVisibility ? (

                                        <PlayerModal
                                            visible={modalVisibility}
                                            setModalVisibility={setModalVisibility}
                                            matchName={matchName}
                                            speakerDetails={selectedItem}
                                        />
                                    ) : null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CurrentMatchesList;