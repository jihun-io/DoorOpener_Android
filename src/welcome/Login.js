import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from '../ModalContext';

// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from './Welcome';
import ServerURL from './ServerURL';
import ServerLogin from './ServerLogin';



const Stack = createStackNavigator();

export default function Login() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false, title: 'DoorOpener'}} />
        <Stack.Screen name="ServerURL" component={ServerURL} options={{ title: 'URL 설정'}}  />
        <Stack.Screen name="ServerLogin" component={ServerLogin} options={{ title: '로그인'}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}