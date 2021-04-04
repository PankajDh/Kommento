import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import Constants from '../Constants';
import userJoined from '../common-functions/UserJoined';
import KeepAwake from 'react-native-keep-awake';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faPlay,
  faPause,
  faTimes,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

const RecordingModal = ({
  visible,
  setSelectedItem,
  match,
  commentaryDetails,
}) => {
  // console.log('inside recording modal');
  const {matchName} = match;

  const [mute, setMute] = useState(false);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const [openMicrophone, setOpenMicrophone] = useState(false);

  const getToken = async (item) => {
    const url = `${Constants.BACKEND_BASEURL}/app-auth/token?channelName=${item.channelName}&userId=${global.userId}`;
    try {
      let response = await fetch(url);
      response = await response.json();
      return response.token;
    } catch (err) {
      // console.log(err);
      Alert.alert('there seems to be some issue, please restart the app');
    }
  };

  const init = async (item) => {
    if (!global.engine) {
      // console.log('finding engine');
      global.engine = await RtcEngine.create(Constants.APP_ID);
    }
    // Enable the audio module.
    await global.engine.enableAudio();
    // Set the channel profile as live streaming.
    await global.engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

    await global.engine.setClientRole(ClientRole.Broadcaster);
    // join the channel
    const token = await getToken(item);

    await engine?.joinChannel(
      token,
      item.channelName,
      null,
      parseInt(global.userId),
    );

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    global.engine.addListener('UserJoined', (uid, elapsed) => {
      // console.log('UserJoined', uid, elapsed);
      if (!peerIds.includes(uid)) {
        setPeerIds([...peerIds, uid]);
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    global.engine.addListener('UserOffline', (uid, reason) => {
      // console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter((id) => id !== uid));
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    global.engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      // console.log('JoinChannelSuccess', channel, uid, elapsed);
      setJoinSucceed(true);
      userJoined(match.id, 'LIVE');
    });

    global.engine.addListener(
      'RejoinChannelSuccess',
      (channel, uid, elapsed) => {
        // console.log('RejoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
        userJoined(match.id, 'LIVE');
      },
    );

    global.engine.addListener('ClientRoleChanged', (oldRole, newRole) => {
      const nRole = newRole === 1 ? 'Host' : 'Audience';
      const oRole = oldRole === 1 ? 'Host' : 'Audience';
      // console.log(`client role changed from ${oRole} to ${nRole}`);
    });
  };

  const leaveChannel = async () => {
    await global.engine.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
    userJoined(match.id, 'LEFT');
    // console.log('left channel');
  };

  const muteUnmutePress = async () => {
    // console.log(`setting audio mute to ${!mute}`);
    await global.engine.muteAllRemoteAudioStreams(!mute);
    setMute(!mute);
  };

  // Turn the microphone on or off.
  const switchMicrophone = async () => {
    await global.engine.enableLocalAudio(!openMicrophone);
    await global.engine.muteLocalAudioStream(openMicrophone);
    // await this._engine.enableAudio();
    setOpenMicrophone(!openMicrophone);

    // console.log(`current openMicroPhone is ${!openMicrophone}`);
  };

  const onModalClose = async () => {
    setSelectedItem({});
    await leaveChannel();
    KeepAwake.deactivate();
  };

  useEffect(() => {
    init(commentaryDetails);
  }, []);

  return (
    <Modal
      // animationType='fades'
      animationIn="slideInUp"
      animationOut="slideOutDown"
      visible={visible}
      transparent={true}
      onRequestClose={onModalClose}>
      <View style={styles.modalView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={onModalClose}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{margin: 5}}
              color="#454545"
            />
          </TouchableOpacity>
          {joinSucceed ? (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faCircle} color="#36F910" />
                <Text style={{marginLeft: 3}}>Connected</Text>
              </View>
              <Text style={{paddingLeft: 5}}>
                {(peerIds.length || 0) + 1} Listnening
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faCircle} color="red" />
              <Text style={{marginLeft: 3}}>Not Connected</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={{fontWeight: 'bold', marginTop: 20, fontSize: 20}}>
            {matchName}
          </Text>
          <Text style={{marginTop: 3, fontSize: 15}}>
            {commentaryDetails.speakerAliasName} | {commentaryDetails.language}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={switchMicrophone}>
            {openMicrophone ? (
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                style={styles.recordingIcon}
                color="#e83b61"
                size={50}
              />
            ) : (
              <FontAwesomeIcon
                icon={faMicrophoneAltSlash}
                style={styles.recordingIcon}
                size={50}
                color="#e83b61"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={muteUnmutePress}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {mute ? (
              <FontAwesomeIcon
                icon={faPlay}
                style={styles.recordingIcon}
                size={50}
                color="#e83b61"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPause}
                style={styles.recordingIcon}
                size={50}
                color="#e83b61"
              />
            )}
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
    marginTop: Dimensions.get('window').height * 0.67,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  recordingIcon: {},
});

export default RecordingModal;
