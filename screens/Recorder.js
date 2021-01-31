import React, { Component } from 'react';
import { Button, Platform, TextInput, View, StyleSheet, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora';
import requestCameraAndAudioPermission from '../components/Permissions';
import Constants from '../Constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophoneAlt, faMicrophoneAltSlash, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default class Recorder extends Component {
    constructor(props) {
        super(props);
        // console.log(`${props.route.params.token} and ${props.route.params.channelName}`)
        this.state = {
            appId: Constants.APP_ID,
            token: Constants.TOKEN || props.route.params.token,
            channelName: Constants.CHANNEL_NAME || props.route.params.channelName,
            openMicrophone: false,
            unMute: true,
            joinSucceed: false,
            peerIds: [],
            gameName: Constants.CHANNEL_NAME || props.route.params.gameName
        }
        if (Platform.OS === Constants.ANDROID) {
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }
    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        const { appId } = this.state
        this._engine = await RtcEngine.create(appId)

        // Enable the audio module.
        await this._engine.enableAudio();
        // Set the channel profile as live streaming.
        await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

        await this._setClientRole(ClientRole.Audience);

        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)
            const { peerIds } = this.state
            if (!peerIds.includes(uid)) {
                this.setState({
                    peerIds: [...peerIds, uid]
                })
            }
        })


        // Listen for the UserOffline callback.
        // This callback occurs when the remote user leaves the channel or drops offline.
        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            const { peerIds } = this.state
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            })
        })

        // Listen for the JoinChannelSuccess callback.
        // This callback occurs when the local user successfully joins the channel.
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            this.setState({
                joinSucceed: true
            })
        });

        this._engine.addListener('ClientRoleChanged', (oldRole, newRole) => {
            const nRole = newRole === 1 ? 'Host' : 'Audience';
            const oRole = oldRole === 1 ? 'Host' : 'Audience';
            console.log(`client role changed from ${oRole} to ${nRole}`);
        });
    }

    // Pass in your token and channel name through this.state.token and this.state.channelName.
    // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
    // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
    _joinChannel = async () => {
        await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0);
        console.log('channel joined');
    }

    _setClientRole = async (role) => {
        // Set the usr role as host.
        // await this._engine.setClientRole(ClientRole.Broadcaster)
        try {
            await this._engine?.setClientRole(role)
        } catch (err) {
            console.log(`error in switching the client role-> ${JSON.stringify(err, null, 2)}`);
        }
    }

    _leaveChannel = async () => {
        await this._engine?.leaveChannel();
        this.setState({ peerIds: [], joinSucceed: false });
        console.log('left channel');
    }

    // Turn the microphone on or off.
    _switchMicrophone = async () => {
        const { openMicrophone } = this.state

        // this._engine?.enableLocalAudio(!openMicrophone).then(() => {
        //     this.setState({ openMicrophone: !openMicrophone })
        // }).catch((err) => {
        //     console.warn('enableLocalAudio', err)
        // })
        try {
            await this._engine?.enableLocalAudio(!openMicrophone);
            await this._engine.enableAudio();
            await this.setState({ openMicrophone: !openMicrophone });
        } catch (err) {
            console.warn('enableLocalAudio', err);
        }
        console.log(`current openMicroPhone is ${!openMicrophone}`);
        const role = !openMicrophone ? ClientRole.Broadcaster : ClientRole.Audience;
        console.log(`setting role to ${role}`);
        await this._setClientRole(role);
    }

    // Switch the audio playback device.
    _switchSpeakerphone = async () => {
        const { unMute } = this.state
        // this._engine?.setunMute(!unMute).then(() => {
        //     this.setState({ unMute: !unMute })
        // }).catch((err) => {
        //     console.warn('setunMute', err)
        // });
        try {
            // await this._engine?.setunMute(!unMute);
            console.log(`setting audio mute to ${unMute}`);
            await this._engine?.muteAllRemoteAudioStreams(!unMute);
            this.setState({ unMute: !unMute });
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const {
            channelName,
            joinSucceed,
            openMicrophone,
            unMute,
            gameName
        } = this.state;
        return (
            // <ImageBackground source={require('../assets/footballBI.jpeg')} style={{ flex: 1, resizeMode: 'cover' }} >
            <View style={styles.container}>
                <View style={styles.top}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ channelName: text })}
                        placeholder={'Channel Name'}
                        value={gameName}
                    />
                    <Button
                        onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
                        title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                    />
                </View>
                <View style={styles.float}>
                    {/* <Button
                        onPress={this._switchMicrophone}
                        title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                    /> */}
                    <TouchableOpacity onPress={this._switchMicrophone} style={{ padding: 50, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            openMicrophone ? <FontAwesomeIcon icon={faMicrophoneAlt} style={styles.recordingIcon} size={50} /> :
                                <FontAwesomeIcon icon={faMicrophoneAltSlash} style={styles.recordingIcon} size={50} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._switchSpeakerphone} style={{ padding: 50, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            unMute ? <FontAwesomeIcon icon={faPause} style={styles.recordingIcon} size={50} /> :
                                <FontAwesomeIcon icon={faPlay} style={styles.recordingIcon} size={50} />
                        }
                    </TouchableOpacity>
                    {/* <Button
                        onPress={this._switchSpeakerphone}
                        title={unMute ? 'Speakerphone' : 'Earpiece'}
                        style={{ justifyContent: 'flex-end' }}
                    /> */}
                </View>
            </View>
            // </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    float: {
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 2
    },
    top: {
        width: '100%',
        flex: 1
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        fontWeight: 'bold'
    },
    recordingIcon: {
        color: 'red'
    }
});

