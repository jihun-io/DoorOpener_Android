import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, SectionList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';
import cheerio from 'cheerio';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';
import react from 'react';


export default function Settings({ navigation }) {
  const { getData } = useContext(AuthContext);
  const { storeData } = useContext(AuthContext);
  const { resetUserInfo } = useContext(AuthContext);
  const { logout } = useContext(AuthContext); 

  const [username, setUsername] = useState(''); 

  const [gotServerUrlValue, gotServerURL] = useState('');


  const getURL = async () => {
    const url = await getData('serverURL');
    gotServerURL(url);
  };

  const getUsername = async () => {
    const name = await getData('username');
    setUsername(name);
  };

  const getUserInfo = async () => {
    const getServerUrl = await getData('serverURL');
    const serverURL = getServerUrl;

    fetch(serverURL + "/settings/user")
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const userName = $('#name').text();
        const userEmail = $('#email').text();

        storeData('username', userName);
        storeData('email', userEmail);

        console.log("사용자 이름: " + userName);
        console.log("사용자 이메일: " + userEmail);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log(url);
        Alert.alert(
          "로그인 실패",
          "서버와 연결할 수 없습니다.",
          [
            { text: "확인" }
          ],
          { cancelable: false }
        );
      });
  };

  useEffect(() => {
    getUsername();
    getUserInfo();
  }, [username]);

  useFocusEffect(
    React.useCallback(() => {
      getUsername();
      getURL();

      return () => {

      };
    }, [])
  );

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UserInfo')}>
            <View style={styles.userinfo}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.title}>사용자 정보 변경</Text>
            </View>
            <View style={styles.chevron}>
              <Icon size={16} color="gray" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('LogView')}>
            <View>
              <Text style={styles.title}>잠금 해제 기록</Text>
            </View>
            <View style={styles.chevron}>
              <Icon size={16} color="gray" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item}>
            <View>
              <Text style={styles.title}>개발자 설정</Text>
            </View>
            <View style={styles.chevron}>
              <Icon size={16} color="gray" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item} onPress={() => {
            resetUserInfo();
            console.log(gotServerUrlValue + "/logout");
            logout(gotServerUrlValue + "/logout");
          }}>
            <View>
              <Text style={styles.title_red}>로그아웃</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  itemRow: {
    flex: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16
  },

  title_red: {
    fontSize: 16,
    color: 'rgb(255,62,56)'
  },

  chevron: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  header: {
    marginHorizontal: 24,
    marginVertical: 8
  }
});


{/* <Button
  onPress={() => {
    fetch(gotServerUrlValue + "/settings/user")
      .then((response) => response.text())  // response.json() 대신 response.text()를 사용합니다.
      .then((text) => {
        // let data = JSON.parse(text);  // 텍스트를 JSON 객체로 변환합니다.
        console.log(text);  // 변환된 JSON 객체를 출력합니다.
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
  title="테스트"
/> */}