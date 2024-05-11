import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from './ModalContext';

import messaging from '@react-native-firebase/messaging';

import PushNotification, { Importance } from 'react-native-push-notification';

import cheerio from 'cheerio';

import qs from 'qs';

import { AuthContext } from './AuthContext';

import pushNoti from './pushNoti';


import HomeScreen from './home/HomeScreen';
import SettingsScreen from './settings/SettingsScreen';
import OpenerModal from './opener/OpenerModal';









const Tab = createBottomTabNavigator();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});






export default function Main() {

  const requestUserPermission = async () => {
 
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      await messaging()
        .getToken()
        .then(async fcmToken => {
          console.log(fcmToken); //fcm token을 활용해 특정 device에 push를 보낼 수 있다.
          await sendToken(fcmToken);
        })
        .catch(e => console.log('error: ', e));
    }
  };


  const { getData } = useContext(AuthContext);


 

  const sendToken = async (token) => {

    const serverURL = await getData('serverURL');
    const email = await getData('email');

    let data = { "email": email, "token": token, "platform": "fcm" };

    fetch(serverURL + "/apnstokenget", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(data),
    })
      .then((response) => response.text())
      .then((html) => {
        console.log(html);
        console.log("서버에 토큰 등록 완료");
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('failed');
        Alert.alert(
          "오류!",
          "서버와 연결할 수 없습니다.",
          [
            { text: "확인" }
          ],
          { cancelable: false }
        );
      });
  };












  const [modalVisible, setModalVisible] = useState(false);




  useEffect(() => {
    requestUserPermission();


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      pushNoti.displayNoti(remoteMessage);
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);



  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <NavigationContainer>
        <StatusBar barStyle="default" />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === '홈') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === '설정') {
                iconName = focused ? 'cog' : 'cog-outline';
              }


              return <Icon name={iconName} size={size} color={color} />;
            },
            "tabBarActiveTintColor": "rgb(0,122,255)",
            "tabBarInactiveTintColor": "gray",


          })}
        >
          <Tab.Screen name="홈" component={HomeScreen} options={{ headerShown: true, headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 }, title: 'DoorOpener', tabBarLabel: '홈' }} />
          <Tab.Screen name="설정" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
      <OpenerModal />

    </ModalContext.Provider>

  );
}



const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // welcomeBox: {
  //   width: 280,
  //   height: 300,
  //   backgroundColor: 'white',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderRadius: 16,
  //   paddingTop: 48,
  //   paddingBottom: 48,
  //   paddingLeft: 32,
  //   paddingRight: 32,
  // },
  // mainMessage: {
  //   fontSize: 26,
  //   fontWeight: 'bold',
  // },
  // item: {
  //   backgroundColor: '#f9c2ff',
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // title: {
  //   fontSize: 32,
  // },
});


