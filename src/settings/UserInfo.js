import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, SectionList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';
import { TextInput } from 'react-native-gesture-handler';

function BorderLine() {
  return (
    <View
    style={{
      borderBottomColor: 'lightgray',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 12,
    }}
    />
  );
}


export default function UserInfo({navigation}) {
  const { getData } = useContext(AuthContext);
  const { storeData } = useContext(AuthContext);

  const [username, setUsername] = useState(''); // username 상태 설정
  const [email, setUserEmail] = useState(''); // username 상태 설정


  const getUsername = async () => {
    const name = await getData('username');
    setUsername(name);
  };

  const getUserEmail = async () => {
    const name = await getData('email');
    setUserEmail(name);
  };


  useEffect(() => {
    getUsername();
    getUserEmail();
  }, [username, email]);

  useFocusEffect(
    React.useCallback(() => {
      getUsername();
      getUserEmail();

      return () => {
      
      };
    }, [])
  );

  return (
    <View style={{height: '100%'}}>
      <ScrollView>
        <View style={styles.infoWrapper}>
          <Text style={styles.infoName}>{username}</Text>
          <Text style={styles.infoEmail}>{email}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditInfo')}>
            <View>
              <Text style={styles.title}>개인정보 변경</Text>
            </View>
            <View style={styles.chevron}>
              <Icon size={16} color="gray"  name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          <BorderLine />
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditPW')}>
            <View>
              <Text style={styles.title}>비밀번호 변경</Text>
            </View>
            <View style={styles.chevron}>
              <Icon size={16} color="gray"  name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    
  },

  infoName: {
    fontSize: 24,

  },
  infoEmail: {
    fontSize: 18,

  },

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
    fontSize: 16,
  },

  title_red: {
    fontSize: 16,
    color: 'rgb(255,62,56)'
  },

  chevron: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: 16,
    // backgroundColor: 'blue',
  },
  header: {
    marginHorizontal: 24,
    marginVertical: 8
  }
});

