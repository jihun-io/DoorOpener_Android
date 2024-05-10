import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, SectionList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from './Settings';
import UserInfo from './UserInfo';
import EditInfo from './EditInfo';
import EditPW from './EditPW';
import LogView from './LogView';

const Stack = createStackNavigator();


export default function SettingsWrapper() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} options={{ title: '설정' }} />
      <Stack.Screen name="UserInfo" component={UserInfo} options={{ title: '사용자 정보' }}  />
      <Stack.Screen name="EditInfo" component={EditInfo} options={{ title: '개인정보 변경' }}  />
      <Stack.Screen name="EditPW" component={EditPW} options={{ title: '비밀번호 변경' }}  />
      <Stack.Screen name="LogView" component={LogView} options={{ title: '잠금 해제 기록' }}  />
    </Stack.Navigator>
  </NavigationContainer>
  );
}