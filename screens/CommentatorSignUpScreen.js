import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import Constants from '../Constants';

const CommmentatorSignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [call, setCall] = useState(true);
  const [loader, setLoader] = useState(false);

  const startKyc = async () => {
    setLoader(!loader);
    const url = `${Constants.BACKEND_BASEURL}/users/start/kyc`;
    try {
      //   await fetch(url, {
      //     body: {
      //       email,
      //       canCall: call,
      //       userId: global.userId,
      //     },
      //   });
      Alert.alert(
        'Our team will contact you within the next 6 hours screeenenen',
      );
    } catch (err) {
      Alert.alert('there seems to be an issue, whatsapp us on 9599839703');
    }
    setLoader(!loader);
    navigation.goBack();
  };

  return (
    <View style={styles.main}>
      <Image
        source={require('../assets/CommentarySignUp.png')}
        style={{height: '40%', marginTop: 5}}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
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

export default CommmentatorSignUpScreen;
