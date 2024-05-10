import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, SectionList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';
import { TextInput } from 'react-native-gesture-handler';

import cheerio from 'cheerio';

import qs from 'qs';

function BorderLine() {
  return (
    <View
      style={{
        borderBottomColor: 'lightgray',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 12,
      }}
    />
  );
}


export default function EditInfo({ navigation }) {
  const { getData } = useContext(AuthContext);
  const { storeData } = useContext(AuthContext);
  const { logout } = useContext(AuthContext); // logout 함수 가져오기

  const [username, setUsername] = useState(''); // username 상태 설정
  const [email, setUserEmail] = useState(''); // username 상태 설정

  const [tempUsername, setTempUsername] = useState(''); // username 상태 설정
  const [tempEmail, setTempUserEmail] = useState(''); // username 상태 설정

  const [serverURL, setServerURL] = useState(''); // username 상태 설정


  const getUsername = async () => {
    const name = await getData('username');
    setUsername(name);
  };

  const getUserEmail = async () => {
    const name = await getData('email');
    setUserEmail(name);
  };

  const getServerURL = async () => {
    const url = await getData('serverURL');
    setServerURL(url)
  };


  useEffect(() => {
    getUsername();
    getUserEmail();
    getServerURL();
  }, []);

  useEffect(() => {
    setTempUsername(username);
    setTempUserEmail(email);
  }, [username, email]);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemRow}>
              <Text style={styles.title}>이름</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setTempUsername(text)}
              value={tempUsername}
              placeholder='이름 입력'
            />
          </TouchableOpacity>
          <BorderLine />
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemRow}>
              <Text style={styles.title}>이메일</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setTempUserEmail(text)}
              value={tempEmail}
              placeholder='이메일 입력'

            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemWrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              if (tempEmail == '' || tempUsername == '') {
                Alert.alert(
                  "변경 오류",
                  "올바른 이름과 이메일을 입력하십시오.",
                  [
                    { text: "확인" }
                  ],
                  { cancelable: false })
              } else {
                const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

                if (pattern.test(tempEmail) === false) {
                  Alert.alert(
                    "변경 오류",
                    "올바른 이메일을 입력하십시오.",
                    [
                      { text: "확인" }
                    ],
                    { cancelable: false })
                } else {
                  let data = { "username": tempUsername, "email": tempEmail }
                  console.log(data);

                  fetch(serverURL + "/settings/user/modify/request", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: qs.stringify(data),
                  })
                    .then((response) => response.text())
                    .then((html) => {
                      console.log(html)
                      const $ = cheerio.load(html);
                      const newUsername = $('#name').text();
                      const newEmail = $('#email').text();

                      storeData('username', newUsername);
                      storeData('email', newEmail);
                      // if (tempUsername == newUsername) {
                      // }
                      navigation.navigate('UserInfo');

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
                }


              }




            }}

          >
            <View style={styles.itemRow}>
              <Text style={styles.title_blue}>변경</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,

  },

  infoName: {
    fontSize: 24,

  },
  infoEmail: {
    fontSize: 18,

  },

  listWrapper: {
    width: '100%',
    marginVertical: 36,

  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  item: {
    width: '100%',
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  itemRow: {
    flex: 15,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingRight: 8,
    // backgroundColor: 'red',
  },

  userinfo: {
    display: 'flex',

  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3
  },
  title: {
    fontSize: 16,
    textAlignVertical: 'center',
    verticalAlign: 'middle'
  },

  title_red: {
    fontSize: 16,
    color: 'rgb(255,62,56)'
  },
  title_blue: {
    fontSize: 16,
    color: 'rgb(0,122,255)'
  },

  input: {
    fontSize: 16,
    display: 'flex',
    height: 16,
    justifyContent: 'center',
    flex: 60,
    margin: 0,
    padding: 0,
    height: '100%',
    // backgroundColor: 'red',
  },

  chevron: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: 16,
    // backgroundColor: 'blue',
  },
  header: {
    marginHorizontal: 24,
    marginVertical: 8
  }
});