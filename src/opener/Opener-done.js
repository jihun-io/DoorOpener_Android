import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';
import { ModalContext } from '../ModalContext';
import { AuthContext } from '../AuthContext';


import Icon from 'react-native-vector-icons/Ionicons';






export default function OpenerDone() {

  const { modalVisible, setModalVisible } = useContext(ModalContext);

  const { getData } = useContext(AuthContext);
  const [username, setUsername] = useState(''); // username 상태 설정

  const getUsername = async () => {
      const name = await getData('username');
      setUsername(name);
  };

  useEffect(() => {
      getUsername();
  });



  return (
    <View style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
      <View style={{ flex: 4, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: 'rgb(242,242,247)', padding: 32 }}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Icon name="lock-open" size={64} color="black" />
          </View>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{username} 님,{"\n"}환영합니다!</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>문을 성공적으로 열었습니다.</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center'}}>
        <View style={{ width: 100 }}>
          <Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            title="닫기"
          />
        </View>
      </View>

    </View>
  );
}