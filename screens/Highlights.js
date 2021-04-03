import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const Highlights = () => {
  const [play, setPlay] = useState(false);
  const player = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'trackId',
      url:
        'https://kommento-audio-files.s3.ap-south-1.amazonaws.com/My+Job+in+60+Seconds+Toto+Wolff+Team+Principal.mp3',
      title: 'Track Title',
      artist: 'Track Artist',
    });
  };
  useEffect(() => {
    player();
  }, []);

  const handlePlayPause = () => {
    if (play) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setPlay(!play);
  };
  return <Button title="Play" onPress={handlePlayPause} />;
};

export default Highlights;
