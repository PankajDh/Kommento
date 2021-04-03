import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from '../Constants';
import CommmentatorSignUpScreen from './CommentatorSignUpScreen';
import Recorder from './Recorder';
import ChooseMatchToComment from './ChooseMatchToComment';

const BroadcastNotAvailable = ({navigation}) => {
  // if (global.isCommentator) {
  //   return <Recorder navigation={navigation} />;
  // } else {
  //   return <CommmentatorSignUpScreen navigation={navigation} />;
  // }
  if (global.isCommentator) {
    return <ChooseMatchToComment navigation={navigation} />;
  } else {
    return <CommmentatorSignUpScreen navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  mainView: {
    margin: 10,
  },
  notAvailableText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default BroadcastNotAvailable;
