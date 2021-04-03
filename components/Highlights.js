import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from '../Constants';
import AudioPlayerModal from '../modals/AudioPlayerModal';
import CurrentMatch from './CurrentMatch';

const Highlights = () => {
  const [highlights, setHighLights] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const getHighlights = async () => {
    const url = `${Constants.BACKEND_BASEURL}/matches/highlights`;
    let response = await fetch(url);
    response = await response.json();
    setHighLights(response);
  };

  useEffect(() => {
    getHighlights();
  }, []);

  return (
    <View style={styles.main}>
      <FlatList
        style={{flexDirection: 'row'}}
        data={highlights}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <View style={styles.eachGame}>
              <Image
                source={require('../assets/ind-vs-eng.jpeg')}
                style={{
                  flex: 1,
                  width: 130,
                  height: 90,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontWeight: 'bold'}}>{item.matchName}</Text>
              {selectedItem.id === item.id ? (
                <AudioPlayerModal
                  visible={selectedItem.id === item.id}
                  setSelectedItem={setSelectedItem}
                  match={item}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 5,
  },
  eachGame: {
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // padding: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width / 3.3,
    height: 100,
  },
});
export default Highlights;
