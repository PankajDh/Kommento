import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlayCircle, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import PlayerModal from '../modals/playerModal';
import Constants from '../Constants';
import requestCameraAndAudioPermission from './Permissions';

const CurrentCommentriesList = ({match, navigation}) => {
  const {matchName} = match;

  const [commentariesList, setCommentariesList] = useState([]);

  const getCommentries = async () => {
    const url = `${Constants.BACKEND_BASEURL}/commentries/match?matchId=${match.id}`;
    try {
      let response = await fetch(url);
      response = await response.json();
      setCommentariesList(response);
    } catch (err) {
      console.log(err);
      Alert.alert('there seems to be some issue, please restart the app');
    }
  };

  useEffect(() => {
    getCommentries();
  }, []);

  // const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  // take the permission
  // if (Platform.OS === Constants.ANDROID && Constants.APP_TYPE === 'Commentary') {
  //     requestCameraAndAudioPermission().then(() => {
  //         console.log('requested!')
  //     });
  // }

  // const closeModal = async (item) => {
  //   setse
  // };

  return (
    <View>
      <FlatList
        style={{}}
        data={commentariesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <View
              style={{
                padding: 5,
                marginVertical: 3,
                borderRadius: 5,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontWeight: 'bold'}}>{matchName}</Text>
                <Text>
                  {item.speakerAliasName} | {item.language}
                </Text>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  size={30}
                  style={{color: '#e83b61'}}
                />
                {selectedItem.id === item.id ? (
                  <PlayerModal
                    visible={selectedItem.id === item.id}
                    setSelectedItem={setSelectedItem}
                    match={match}
                    commentaryDetails={selectedItem}
                  />
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentCommentriesList;
