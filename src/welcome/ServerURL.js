import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from '../ModalContext';

// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from '../AuthContext';


const Stack = createStackNavigator();


function isValidUrl(url){
	var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	if(RegExp.test(url)){
		return true;
	}else{
		return false;
	}
}

function ServerURL({ navigation }) {
  const { storeData } = useContext(AuthContext);

  const [url, setServerURL] = useState('');

  const sendURL = async (serverURL) => {
    await storeData('serverURL', serverURL);
    setServerURL(serverURL);
  };


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.doorOpenerTitle}>서버 URL 설정</Text>
        </View>
        <View style={{ flex: 5, justifyContent: 'center' }}>
          <Text style={styles.doorOpenerDesc}>먼저, 서버의 URL을 입력하십시오.</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setServerURL(text)}
            value={url}
            placeholder={'URL 입력'}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', width: 70 }}>
          <Button
            onPress={() => {

              if (!isValidUrl(url)) {
                Alert.alert(
                  "올바르지 않은 URL",
                  "올바른 URL을 입력하십시오.",
                  [
                    { text: "확인" }
                  ],
                  { cancelable: false }
                );
              } else if (isValidUrl(url)) {
                // console.log(url);
                // console.log(isValidUrl(url));
                sendURL(url);
                // storeData('')
                navigation.navigate('ServerLogin');
              } else {
                console.log(isValidUrl(url));
              }
            }}
            title="다음"
          />
        </View>
      </View>

    </View>
  );
}

export default ServerURL;



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
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
})