import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import messaging from '@react-native-firebase/messaging';

import Login from './src/welcome/Login';
import Main from './src/Main';

import { AuthContext } from './src/AuthContext';


// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('[Background Remote Message]', remoteMessage);
// });

// 로그인 상태를 공유하기 위한 컨텍스트 생성
const App = () => {

  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   console.log('[FCM Token] ', fcmToken);
  // };


  // useEffect(() => {
  //   getFcmToken();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('[Remote Message] ', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);









  const [isLogin, setIsLogin] = useState(null);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value);
      checkLoginStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(`@${key}`);
    } catch (e) {
      console.log(e);
    }
  };

  const saveUserInfo = async (email, isAdmin, username) => {
    // console.log(email + ", "+ isAdmin + ", " + username);

    // null 값 예외 처리 및 정수 문자화
    if (isAdmin == 1) {
      isAdmin = "1"
    } else {
      isAdmin = "0"
    }

    await storeData('email', email);
    await storeData('isAdmin', isAdmin);
    await storeData('username', username);
  };

  const resetUserInfo = async () => {
    await removeData('email');
    await removeData('isAdmin');
    await removeData('username');
  };

  const checkLoginStatus = async () => {
    const value = await getData('isLogin');
    setIsLogin(value === 'true');
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLogin === null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>DoorOpener</Text>
      </View>
    );
  }

  // AuthContext.Provider를 사용하여 하위 컴포넌트에 login과 logout 함수 제공
  return (
    <AuthContext.Provider value={{ 
      setURL: async (serverURL) => {
        await storeData('serverURL', serverURL);
      }, 
      login: async () => {
        await storeData('isLogin', 'true');
        // await storeData('userName', userName); // userName 값을 설정
      }, 
      logout: async (url) => { 
        fetch(url);
        await storeData('isLogin', 'false');
      }, 
      storeData,
      getData,
      saveUserInfo,
      resetUserInfo
    }}>
      {isLogin ? <Main /> : <Login />}
    </AuthContext.Provider>
  );
};

export default App;
