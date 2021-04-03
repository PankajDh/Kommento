import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Constants from '../Constants';

const SendSms = ({navigation}) => {
  const COUNTRY_CODE_LIST = ['+91', '+1'];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // const onSelect = (country) => {
  //     setCountryCode(country.cca2);
  // }
  const sendVerificationCode = async () => {
    setLoader(true);
    setDisableButton(true);
    const url = `${
      Constants.BACKEND_BASEURL
    }/verification/send-sms?phoneNumber=${encodeURIComponent(
      phoneNumber,
    )}&countryCode=${encodeURIComponent(countryCode)}`;
    try {
      // const response = await fetch(url);
      navigation.navigate('VerifyCode', {phoneNumber, countryCode});
    } catch (err) {
      Alert.alert('', 'Country Code or Phone Number is incorrect');
    }
    setLoader(false);
    setDisableButton(false);
  };

  return (
    <View style={styles.main}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
        <Image
          source={require('../assets/Kommento.jpeg')}
          style={styles.image}
        />
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
        <Text>Enter your Phone Number</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            onChangeText={setCountryCode}
            value={countryCode}
            style={[styles.inputBox, {width: 50, marginRight: 3}]}
            keyboardType="phone-pad"
            textAlign="center"
          />
          <TextInput
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            style={styles.inputBox}
            clearButtonMode="always"
            keyboardType="phone-pad"
            textAlign="center"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Send Verification Code"
            color="#e83b61"
            onPress={sendVerificationCode}
            disabled={disableButton}
          />
        </View>
        <ActivityIndicator size="large" color="#e83b61" animating={loader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    // marginLeft: 5,
    // marginRight: 250,
    marginTop: 5,
    backgroundColor: '#F0F3F4',
    width: 150,
  },
  main: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: 'white',
  },
  button: {
    margin: 15,
    borderRadius: 100,
  },
  image: {
    width: '85%',
  },
});

export default SendSms;
