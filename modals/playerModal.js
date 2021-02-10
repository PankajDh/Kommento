import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlayCircle, faPauseCircle, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora';


const PlayerModal = ({ visible, setModalVisibility, matchName, speakerDetails }) => {
    // let engine;

    const [mute, setMute] = useState(false);
    const [joinSucceed, setJoinSucceed] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const [engine, setEngine] = useState();

    const init = async (item) => {
        const createdEngine = await RtcEngine.create(item.appId)
        console.log(`now the engine is ${JSON.stringify(createdEngine)}`);

        // Enable the audio module.
        await createdEngine.enableAudio();
        // Set the channel profile as live streaming.
        await createdEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);

        await createdEngine.setClientRole(ClientRole.Audience);

        // join the channel
        await joinChannel(item.token, item.channelName);

        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        createdEngine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            if (!peerIds.includes(uid)) {
                setPeerIds([...peerIds, uid]);
            }
        })


        // Listen for the UserOffline callback.
        // This callback occurs when the remote user leaves the channel or drops offline.
        createdEngine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            setPeerIds(peerIds.filter(id => id !== uid));
        })

        // Listen for the JoinChannelSuccess callback.
        // This callback occurs when the local user successfully joins the channel.
        createdEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            setJoinSucceed(true);
        });

        createdEngine.addListener('ClientRoleChanged', (oldRole, newRole) => {
            const nRole = newRole === 1 ? 'Host' : 'Audience';
            const oRole = oldRole === 1 ? 'Host' : 'Audience';
            console.log(`client role changed from ${oRole} to ${nRole}`);
        });
        setEngine(createdEngine);
    }


    const joinChannel = async (token, channelName) => {
        await engine?.joinChannel(token, channelName, null, 0);
        console.log('channel joined');
    }

    const leaveChannel = async () => {
        await engine.leaveChannel();
        setPeerIds([]);
        setJoinSucceed(false);
        console.log('left channel');
    }

    const muteUnmutePress = async () => {
        console.log(`setting audio mute to ${!mute}`);
        console.log(`engine is ${JSON.stringify(engine, null, 2)}`);
        await engine.muteAllRemoteAudioStreams(!mute);
        setMute(!mute);
    }

    const onModalClose = async () => {
        await leaveChannel();
        setModalVisibility(!visible);
    }

    useEffect(() => {
        init(speakerDetails);
    }, []);

    return (
        <Modal
            // animationType='fades'
            animationIn='slideInUp'
            animationOut='slideOutDown'
            visible={visible}
            transparent={true}
            onRequestClose={() => onModalClose()}
        >
            <View style={styles.modalView}>
                <TouchableOpacity onPress={() => onModalClose()}>
                    <FontAwesomeIcon icon={faTimes} style={{ margin: 5 }} color='#454545' />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 20 }}>{matchName}</Text>
                <Text style={{ marginTop: 3, fontSize: 15 }}>{speakerDetails.speaker} | {speakerDetails.language}</Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faBackward} color='#F93C5B' size={55} style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => muteUnmutePress()}>
                        {
                            mute ? <FontAwesomeIcon icon={faPlayCircle} color='#F93C5B' size={55} /> : <FontAwesomeIcon icon={faPauseCircle} color='#F93C5B' size={55} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faForward} color='#F93C5B' size={55} style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        height: Dimensions.get('window').height / 3,
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').height * (.67),
        paddingLeft: 10
    }
});
export default PlayerModal;
