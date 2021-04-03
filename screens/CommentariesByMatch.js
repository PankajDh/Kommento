import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import CurrentMatch from '../components/CurrentMatch';
import CommentaryPush from '../components/CommentaryPush';
import CurrentCommentriesList from '../components/CurrentCommentriesList';

const CommentariesByMatch = ({navigation, route}) => {
  const {match} = route.params;

  return (
    <View style={styles.main}>
      {!global.isCommentator ? <CommentaryPush /> : null}
      <CurrentMatch match={match} />
      <View style={{paddingTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>Commentaries</Text>
        <CurrentCommentriesList match={match} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
    backgroundColor: '#FBFCFC',
  },
});

export default CommentariesByMatch;
