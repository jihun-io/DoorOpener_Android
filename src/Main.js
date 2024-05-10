import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StatusBar, FlatList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContext } from './ModalContext';

import HomeScreen from './home/HomeScreen';
import SettingsScreen from './settings/SettingsScreen';
import OpenerModal from './opener/OpenerModal';







const Tab = createBottomTabNavigator();

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);



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


