import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Constants from '../Constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const COUNTRY_CODE_LIST = ['+91', '+1'];
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // const checkPreviousLogin = async () => {
  //   Alert.alert('', 'calling last login');
  //   setLoader(true);
  //   setDisableButton(true);
  //   let response;
  //   try {
  //     response = await AsyncStorage.getItem('loginKommento');
  //     Alert.alert('', `got this in get ${JSON.stringify(response, null, 2)}`);
  //   } catch (err) {
  //     Alert.alert(
  //       '',
  //       `not able to get the item ${JSON.stringify(err, null, 2)}`,
  //     );
  //   }
  //   if (!response) {
  //     setLoader(false);
  //     setDisableButton(false);
  //     return;
  //   }
  //   const result = JSON.parse(response);
  //   const hourBetweenLogin =
  //     (new Date() - new Date(result.timeAdded)) / (3600 * 1000);
  //   if (hourBetweenLogin > 24) {
  //     setLoader(false);
  //     setDisableButton(false);
  //     return;
  //   }

  //   const url = `${Constants.BACKEND_BASEURL}/users/${result.userId}`;
  //   let userResponse = await fetch(url);
  //   userResponse = await userResponse.json();
  //   if (
  //     userResponse.forceLogin ||
  //     userResponse.isCommentator !== result.isCommentator
  //   ) {
  //     setLoader(false);
  //     setDisableButton(false);
  //     return;
  //   }
  //   global.userId = result.userId;
  //   global.isCommentator = result.isCommentator;

  //   await fetch(
  //     `${Constants.BACKEND_BASEURL}/users/login/automatic/${result.userId}`,
  //     {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   );

  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'Drawer'}],
  //   });

  //   setLoader(false);
  //   setDisableButton(false);
  // };

  const loginUser = async () => {
    setLoader(true);
    setDisableButton(true);
    try {
      const url = `${Constants.BACKEND_BASEURL}/users/login`;
      let response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          phoneNumber,
          code,
          countryCode,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();

      if (response.newUser) {
        Alert.alert(
          '',
          'There is no user with this phone number, please signup first',
        );
        navigation.navigate('SendSms', {phoneNumber, countryCode});
      } else {
        const {verified, userId, isCommentator} = response;
        if (verified) {
          global.userId = userId;
          global.isCommentator = isCommentator;

          // try {
          //   await AsyncStorage.setItem(
          //     'loginKommento',
          //     JSON.stringify({...response, timeAdded: new Date()}),
          //   );
          // } catch (err) {
          //   Alert.alert('', `not able to write ${JSON.stringify(err)}`);
          // }

          const addLoginDetailsUrl = `${Constants.BACKEND_BASEURL}/users/login/automatic/${userId}`;
          await fetch(addLoginDetailsUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          navigation.reset({
            index: 0,
            routes: [{name: 'Drawer'}],
          });
        } else {
          Alert.alert('', 'Code is incorrect');
        }
      }
    } catch (err) {
      Alert.alert('', 'Country Code or Phone Number is incorrect');
    }
    setLoader(false);
    setDisableButton(false);
  };

  // useEffect(() => {
  //   checkPreviousLogin();
  // }, []);

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
            placeholder="Phone Number"
          />
        </View>
        <View>
          <TextInput
            onChangeText={setCode}
            value={code}
            style={styles.inputBox}
            clearButtonMode="always"
            keyboardType="number-pad"
            textAlign="center"
            placeholder="Enter you security pin"
            secureTextEntry={true}
            maxLength={4}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Login "
            color="#e83b61"
            onPress={loginUser}
            disabled={disableButton}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SendSms')}>
          <Text
            style={{
              textDecorationLine: 'underline',
              color: '#e83b61',
            }}>
            New User? Click here to signup
          </Text>
        </TouchableOpacity>
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
    backgroundColor: 'white',
    // backgroundColor: '#F0F3F4',
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
    borderRadius: 300,
  },
  image: {
    width: '85%',
  },
});

export default Login;
