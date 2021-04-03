import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CommentatorSignUp from '../modals/CommentatorSignUp';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophoneAlt} from '@fortawesome/free-solid-svg-icons';

const CommentaryPush = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleTouch = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <TouchableOpacity style={styles.main} onPress={handleTouch}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.text}>Become a commentator and share your</Text>
          <Text style={styles.text}>love for the sports with the world!!</Text>
          <Text style={[styles.text, {fontWeight: 'bold', marginTop: 10}]}>
            Get Started Now -&gt;
          </Text>
        </View>
        <View
          style={{
            margin: 20,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            height: 70,
            transform: [{rotate: '-45deg'}],
          }}>
          <FontAwesomeIcon icon={faMicrophoneAlt} size={60} faRotate={90} />
        </View>
        {modalVisibility ? (
          <CommentatorSignUp
            visible={modalVisibility}
            setModalVisibility={setModalVisibility}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e83b61',
    justifyContent: 'center',
    marginBottom: 10,
    height: 90,
    borderRadius: 5,
    elevation: 10,
    // marginTop: 5,
  },
  text: {
    marginLeft: 20,
    color: 'white',
  },
});

export default CommentaryPush;
