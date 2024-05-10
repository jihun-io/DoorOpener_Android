import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from '../ModalContext';

// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";






function Welcome({navigation}) {


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.doorOpenerTitle}>DoorOpener</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.doorOpenerDesc}>환영합니다.{"\n"}DoorOpener로 스마트 홈 라이프를 즐길 수 있습니다.</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', width: 70 }}>
          <Button
            onPress={() => {
              navigation.navigate('ServerURL');
            }}
            title="다음"
          />
        </View>
      </View>

    </View>
  );
}

export default Welcome;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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