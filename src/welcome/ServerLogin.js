import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from '../AuthContext';


const Stack = createStackNavigator();






function ServerLogin({ navigation }) {
  const { login } = useContext(AuthContext); // login 함수 가져오기
  const { getData } = useContext(AuthContext);

  const { saveUserInfo } = useContext(AuthContext);


  // const [serverUrl, setServerURL] = useState('');

  const [gotServerUrlValue, gotServerURL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const getURL = async () => {
    const getServerUrl = await getData('serverURL');
    gotServerURL(getServerUrl);
  };

  useEffect(() => {
    getURL();
  }, []);






  const handleUserInfo = () => {
    // TextInput에서 입력한 URL
    const username = 'test';

    // setURL 함수 호출하고 URL 전달
    login(username);
  };


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.doorOpenerTitle}>로그인</Text>
        </View>
        <View style={{ flex: 5, justifyContent: 'center' }}>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            onChangeText={text => setEmail(text)}
            autoComplete='email'
            placeholder={'이메일'}
          />
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            autoComplete='current-password'
            placeholder={'비밀번호'}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', width: 70 }}>
          <Button
            onPress={() => {
              console.log("your server url is: " + gotServerUrlValue);

              loginURL = gotServerUrlValue + "/loginwithapp";
              console.log("login url is: " + loginURL);

              // let email = email; // 여기에 이메일을 입력하세요.
              // let password = password; // 여기에 비밀번호를 입력하세요.

              let loginData = {
                email: email,
                password: password
              };

              // console.log(JSON.stringify(loginData));

              fetch(loginURL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
              })
              .then((response) => response.text())  // response.json() 대신 response.text()를 사용합니다.
              .then((text) => {
                let data = JSON.parse(text);  // 텍스트를 JSON 객체로 변환합니다.
                console.log(data);  // 변환된 JSON 객체를 출력합니다.
                if (data.result === "Success") {
                  console.log('success');

                  // try {
                  //   await AsyncStorage.setItem('@session_info', JSON.stringify(data.session));
                  // } catch (e) {
                  //   // 저장 과정에서 오류가 발생했습니다.
                  //   console.error(e);
                  // }

                  saveUserInfo(data.email, data.isAdmin, data.username);
                  // console.log(data.isAdmin.toString());
                  login();

                } else if (data.result === "Failed") {
                  console.log('failed');
                  Alert.alert(
                    "로그인 실패",
                    "사용자를 확인할 수 없습니다.",
                    [
                      { text: "확인" }
                    ],
                    { cancelable: false }
                  );
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                console.log('failed');
                Alert.alert(
                  "로그인 실패",
                  "서버와 연결할 수 없습니다.",
                  [
                    { text: "확인" }
                  ],
                  { cancelable: false }
                );
              });
            }}
            title="로그인"
          />
        </View>
      </View>

    </View>
  );
}

export default ServerLogin;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white'
  },
  wrapper: {
    height: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  doorOpenerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  doorOpenerDesc: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 6,
    // borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
})