import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
  Button,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import RNPickerSelect from 'react-native-picker-select';
import Constants from '../Constants';

const CommentatorSignUp = ({setModalVisibility, visible}) => {
  const [email, setEmail] = useState('');
  const [call, setCall] = useState(true);
  const [loader, setLoader] = useState(false);

  const startKyc = async () => {
    setLoader(!loader);
    const url = `${Constants.BACKEND_BASEURL}/users/start/kyc`;
    const response = await fetch(url, {
      body: JSON.stringify({
        email,
        canCall: call,
        userId: global.userId,
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      Alert.alert('Our team will contact you within the next 6 hours');
    } else {
      Alert.alert('there seems to be an issue, whatsapp us on 9599839703');
    }

    setLoader(!loader);
    setModalVisibility(!visible);
  };
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setModalVisibility(!visible)}>
      <KeyboardAvoidingView
        style={styles.modalView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => setModalVisibility(!visible)}>
          <FontAwesomeIcon icon={faTimes} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/CommentarySignUp.png')} />
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.heading}>Join the Club!</Text>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text>Can we call You for the KYC ?</Text>
              <Switch value={call} onValueChange={() => setCall(!call)} />
            </View>
            <TextInput
              placeholder="Email ID"
              placeholderTextColor="black"
              value={email}
              style={styles.inputBox}
              textAlign="left"
              onChangeText={setEmail}
            />
            {/* <View style={[styles.inputBox, {height: 40}]}>
            <RNPickerSelect
              value={id}
              onValueChange={setId}
              placeholder="Select the Id proof"
              items={[
                {label: 'Aadhaar', value: 'Aadhaar'},
                {label: 'Pan Card', value: 'Pan Card'},
                {label: 'Driving License', value: 'Driving License'},
              ]}
            />
          </View> */}
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Start the KYC"
            color="#e83b61"
            onPress={startKyc}
            disabled={loader}
          />
        </View>
        <ActivityIndicator size="large" color="#e83b61" animating={loader} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    marginTop: Dimensions.get('window').height * 0.2,
    paddingLeft: 10,
    borderRadius: 20,
  },
  crossIcon: {
    margin: 10,
    alignItems: 'flex-end',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    // marginLeft: 5,
    // marginRight: 250,
    marginTop: 5,
    backgroundColor: 'white',
    width: 300,
    borderRadius: 5,
  },
  heading: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
    marginTop: 15,
  },
  mainContent: {
    alignItems: 'center',
  },
  button: {
    margin: 35,
    borderRadius: 100,
  },
});
export default CommentatorSignUp;
