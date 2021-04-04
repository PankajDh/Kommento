import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import CurrentMatch from '../components/CurrentMatch';
import Constants from '../Constants';
import RecordingModal from '../modals/RecordingModal';
import CurrentMatchLoader from '../components/CurrentMatchLoader';
import CurrentCommentriesListCommentator from '../components/CurrentCommentriesListCommentator';

const ChooseMatchToComment = ({navigation}) => {
  const [featuredMatches, setFeaturedMatches] = useState([]);
  // const [selectedItem, setSelectedItem] = useState({});

  const getCurrentMatches = async () => {
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
    getCurrentMatches();
  }, []);

  const handlePress = ({item}) => {
    // console.log(`item is ${JSON.stringify(item)}`);
    // navigation.navigate('Recorder', {match: featuredMatches[0]});
  };

  return (
    <View style={{padding: 10}}>
      {featuredMatches?.length > 0 ? (
        <View>
          <CurrentMatch match={featuredMatches[0]} />
          <View style={{paddingTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Commentaries</Text>
            <CurrentCommentriesListCommentator match={featuredMatches[0]} />
          </View>
        </View>
      ) : (
        <CurrentMatchLoader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChooseMatchToComment;
