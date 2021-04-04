import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import CurrentMatch from '../components/CurrentMatch.js';
import CurrentMatchLoader from '../components/CurrentMatchLoader';
import ListenBySports from '../components/ListenBySports';
import Constants from '../Constants';
import CommentaryPush from '../components/CommentaryPush';
import Highlights from '../components/Highlights.js';

const Home = ({navigation, route}) => {
  const [featuredMatches, setFeaturedMatches] = useState([]);

  const getCurentMatches = async () => {
    const url = `${Constants.BACKEND_BASEURL}/matches/featured`;
    try {
      let response = await fetch(url);
      response = await response.json();
      setFeaturedMatches(response);
    } catch (err) {
      console.log(err);
      Alert.alert('there seems to be some issue, please restart the app');
    }
  };

  useEffect(() => {
    getCurentMatches();
  }, []);

  return (
    <View>
      <View style={{padding: 10}}>
        {!global.isCommentator ? <CommentaryPush /> : null}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CommentariesByMatch', {
            match: featuredMatches[0],
          })
        }>
        <View style={styles.main}>
          <View>
            <Text style={styles.headingText}>Featured Matches</Text>
          </View>
          {featuredMatches?.length > 0 ? (
            <CurrentMatch match={featuredMatches[0]} />
          ) : (
            <CurrentMatchLoader />
          )}
        </View>
      </TouchableOpacity>
      <View style={{paddingHorizontal: 10, paddingTop: 15}}>
        <View>
          <Text style={styles.headingText}>Highlights</Text>
        </View>
        <Highlights />
      </View>
      <View style={{paddingHorizontal: 10, paddingTop: 15}}>
        <View>
          <Text style={styles.headingText}>Listen By Sports</Text>
        </View>
        <ListenBySports />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    backgroundColor: '#FBFCFC',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Home;
