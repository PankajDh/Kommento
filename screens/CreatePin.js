import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Constants from '../Constants';

const CreatePin = ({navigation, route}) => {
  const {phoneNumber} = route.params;
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const createUserPin = async () => {
    setLoader(true);
    setDisableButton(true);
    const url = `${Constants.BACKEND_BASEURL}/users/signup`;
    let response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        code: value,
        phoneNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(`response is ${JSON.stringify(response, null, 2)}`);
    if (response.ok) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Drawer',
          },
        ],
      });
    } else {
      Alert.alert(
        'there seems to be some error at this time, please try again latter',
      );
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'Drawer',
    //     },
    //   ],
    // });
    setLoader(false);
    setDisableButton(false);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <Text>Create the Pin for your Kommento account</Text>
      </View>
      <View>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={styles.codeFieldRoot}
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Create Pin"
          color="#e83b61"
          onPress={createUserPin}
          disabled={disableButton}
        />
      </View>
      <ActivityIndicator size="large" color="#e83b61" animating={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#e83b61',
    color: 'black',
  },
  image: {
    width: '85%',
    height: '50%',
  },
  input: {
    borderWidth: 2,
    height: 70,
    width: 50,
    margin: 10,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#e83b61',
    borderBottomWidth: 2,
  },
  button: {
    margin: 35,
    borderRadius: 100,
  },
});

export default CreatePin;
