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
  } = match;
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
          <Text style={styles.liveText}>Not Live</Text>
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
            <Image
              source={require('../assets/india.png')}
              style={styles.teamLogo}
            />
            <Text style={styles.teamText}>{teamOne.name}</Text>
          </View>
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {teamOneRuns}/{teamOneWickets}
            </Text>
            <Text>{teamOneOvers} Overs</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>V/S</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{alignItems: 'center', paddingRight: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {teamTwoRuns}/{teamTwoWickets}
            </Text>
            <Text>{teamTwoOvers} Overs</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/aus.png')}
              style={styles.teamLogo}
            />
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
  },
  teamText: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CurrentMatch;
