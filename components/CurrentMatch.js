import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Constants from '../Constants';

const CurrentMatch = ({match}) => {
  const {
    teamOne,
    teamTwo,
    type,
    teamOneRuns,
    teamOneWickets,
    teamOneOvers,
    teamTwoOvers,
    teamTwoRuns,
    teamTwoWickets,
    matchDate,
  } = match;
  const [scoreTeamOne, setScoreTeamOne] = useState({
    teamOneRuns,
    teamOneWickets,
    teamOneOvers,
  });
  const [scoreTeamTwo, setScoreTeamTwo] = useState({
    teamTwoRuns,
    teamTwoWickets,
    teamTwoOvers,
  });
  const matchDateInJs = new Date(matchDate);

  const getScore = async () => {
    const url = `${Constants.BACKEND_BASEURL}/matches/${match.id}`;
    let response = await fetch(url);
    response = await response.json();
    const newData = response[0];
    if (newData) {
      const {teamOneRuns, teamOneWickets, teamOneOvers} = newData;
      setScoreTeamOne({teamOneRuns, teamOneWickets, teamOneOvers});
      const {teamTwoRuns, teamTwoWickets, teamTwoOvers} = newData;
      setScoreTeamTwo({teamTwoRuns, teamTwoWickets, teamTwoOvers});
    }
  };

  useEffect(() => {
    const startInterval = setInterval(() => {
      getScore();
    }, 15000);

    return () => clearInterval(startInterval);
  });

  return (
    <View style={styles.currentMatch}>
      <View
        style={{paddingLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
        {type === 'LIVE' ? (
          <FontAwesomeIcon
            icon={faCircle}
            size={10}
            color={'#36F910'}
            style={styles.liveDot}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            size={10}
            color={'red'}
            style={styles.liveDot}
          />
        )}
        {type === 'LIVE' ? (
          <Text style={styles.liveText}>Live</Text>
        ) : (
          <View>
            <Text style={styles.liveText}>
              Live on {matchDateInJs.getDate()}{' '}
              {Constants.MONTH_NAMES[matchDateInJs.getMonth()]}{' '}
              {matchDateInJs.getFullYear()}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <View style={{alignItems: 'center'}}>
            <Image source={{uri: teamOne.flagUrl}} style={styles.teamLogo} />
            <Text style={styles.teamText}>{teamOne.name}</Text>
          </View>
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {scoreTeamOne.teamOneRuns ? scoreTeamOne.teamOneRuns : '0'}/
              {scoreTeamOne.teamOneWickets ? scoreTeamOne.teamOneWickets : '0'}
            </Text>
            <Text>
              {scoreTeamOne.teamOneOvers ? scoreTeamOne.teamOneOvers : '0.0'}{' '}
              Overs
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>V/S</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{alignItems: 'center', paddingRight: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {scoreTeamTwo.teamTwoRuns ? scoreTeamTwo.teamTwoRuns : '0'}/
              {scoreTeamTwo.teamTwoWickets ? scoreTeamTwo.teamTwoWickets : '0'}
            </Text>
            <Text>
              {scoreTeamTwo.teamTwoOvers ? scoreTeamTwo.teamTwoOvers : '0.0'}{' '}
              Overs
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={{uri: teamTwo.flagUrl}} style={styles.teamLogo} />
            <Text style={styles.teamText}>{teamTwo.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentMatch: {
    // paddingTop: 10,
    borderRadius: 5,
    // borderWidth: 2,
    // borderColor: 'grey',
    backgroundColor: 'white',
    elevation: 10,
    height: 150,
  },
  liveDot: {
    paddingVertical: 10,
  },
  liveText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  teamLogo: {
    borderRadius: 50,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  teamText: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CurrentMatch;
