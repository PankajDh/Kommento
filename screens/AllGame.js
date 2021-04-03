import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

const ListOfAllGames = [
  {
    name: 'India Vs. Australia, Second Test',
    sports: 'Cricket',
    speaker: 'Parth Dogra',
    unique: '12423434',
  },
  {
    name: 'Aresnal Vs Liverpool',
    sports: 'Football',
    speaker: 'Parth Dogra',
    unique: '1244',
  },
  {
    name: 'Monza Grand Prix - 2020',
    sports: 'F1',
    speaker: 'Parth Dogra',
    unique: '675893',
  },
];

const AllGame = ({navigation}) => {
  const heading = () => {
    return (
      <View style={{margin: 20, alignItems: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textDecorationLine: 'underline',
            alignContent: 'center',
          }}>
          Live Games
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        style={{width: '100%'}}
        data={ListOfAllGames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommentariesByMatch', {
                channelName: item.unique,
                token: item.unique,
                gameName: item.name,
              })
            }>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>
                {item.name} by {item.speaker}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={heading}
      />
    </View>
  );
};

export default AllGame;
