import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faPlayCircle,
  faPauseCircle,
  faForward,
  faBackward,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import Constants from '../Constants';
import userJoined from '../common-functions/UserJoined';

const PlayerModal = ({visible, setSelectedItem, commentaryDetails, match}) => {
  // console.log('inside the player modal');
  const [mute, setMute] = useState(false);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const {matchName} = match;

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
      global.engine = await RtcEngine.create(Constants.APP_ID);
    }
    // Enable the audio module.
    await global.engine.enableAudio();
    // Set the channel profile as live streaming.
    await global.engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

    await global.engine.setClientRole(ClientRole.Audience);

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
      userJoined(commentaryDetails.id, 'LIVE');
    });

    global.engine.addListener(
      'RejoinChannelSuccess',
      (channel, uid, elapsed) => {
        // console.log('RejoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
        userJoined(commentaryDetails.id, 'LIVE');
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
    userJoined(commentaryDetails.id, 'LEFT');
    // console.log('left channel');
  };

  const muteUnmutePress = async () => {
    // console.log(`setting audio mute to ${!mute}`);
    await global.engine.muteAllRemoteAudioStreams(!mute);
    setMute(!mute);
  };

  const onModalClose = async () => {
    await leaveChannel();
    await global.engine.destroy();
    global.engine = null;
    setSelectedItem({});
  };

  useEffect(() => {
    init(commentaryDetails);
    // return () => (global.engine ? global.engine.destroy() : null);
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
              {/* <Text style={{paddingLeft: 5}}>
                {(peerIds.length || 0) + 1} Listnening
              </Text> */}
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
          }}>
          <TouchableOpacity>
            <FontAwesomeIcon
              icon={faBackward}
              color="#e83b61"
              size={35}
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => muteUnmutePress()}>
            {mute ? (
              <FontAwesomeIcon icon={faPlayCircle} color="#e83b61" size={55} />
            ) : (
              <FontAwesomeIcon icon={faPauseCircle} color="#e83b61" size={55} />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon
              icon={faForward}
              color="#e83b61"
              size={35}
              style={{marginLeft: 15}}
            />
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
});
export default PlayerModal;
