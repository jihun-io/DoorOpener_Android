import React, { useState, useContext } from 'react';
import { Button, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { ModalContext } from '../ModalContext';
import {ProgressBar} from '@react-native-community/progress-bar-android';






export default function OpenerLoading() {

  const { modalVisible, setModalVisible } = useContext(ModalContext);


  return (
    <View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>문을 여는 중입니다…</Text>
      </View>
    </View>
  );
}