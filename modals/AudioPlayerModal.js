import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faPlayCircle,
  faPauseCircle,
  faForward,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';

// https://therohanbhatia.com/blog/music-player-app-using-react-native-hooks/
const AudioPlayerModal = ({visible, setSelectedItem, match}) => {
  const {matchName} = match;
  const onModalClose = () => {
    setSelectedItem({});
    TrackPlayer.stop();
    TrackPlayer.destroy();
  };
  const [mute, setMute] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(250);

  const player = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: match.id,
      url: match.highlightsLink,
      title: matchName,
      artist: 'Track Artist',
      artwork: require('../assets/ind-vs-eng.jpeg'),
    });
    TrackPlayer.play();
  };

  const handlePlayPause = () => {
    if (mute) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
    setMute(!mute);
  };

  useEffect(() => {
    player();
  }, []);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };

  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <Modal
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
        </View>
        <View>
          <Text style={{fontWeight: 'bold', marginTop: 20, fontSize: 20}}>
            {matchName}
          </Text>
        </View>
        <Slider
          style={{width: 400, height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#e83b61"
          maximumTrackTintColor="#000000"
          thumbTintColor="#e83b61"
          trackImage={require('../assets/ind-vs-eng.jpeg')}
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
        />
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
          <TouchableOpacity onPress={() => handlePlayPause()}>
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

export default AudioPlayerModal;
