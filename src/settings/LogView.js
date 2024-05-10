import React, { useState, useContext, useEffect } from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity, StatusBar, FlatList, SectionList, StyleSheet, PanResponder, Animated, Modal, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import cheerio from 'cheerio';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';

var logs = [];

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

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function LogsTable({ logs }) {
  // console.log(logs);
  const data = logs;


  return (
    <ScrollView>
      <View style={styles.infoWrapper}>
        {/* <Text>최근 100개의 기록까지만 열람할 수 있습니다.</Text> */}
        <View style={styles.itemWrapper}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <View>
                <Text style={styles.useropener}>{item.user}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.userinfo}>{item.time}</Text>
                <Text style={styles.userinfo}>{item.path}</Text>
              </View>
              {index < data.length - 1 && <BorderLine />} 
              {/* {index !== data.length - 1 && <BorderLine />}  마지막 요소가 아닐 경우에만 BorderLine을 렌더링합니다. */}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}



export default function LogView({ navigation }) {

  const { getData } = useContext(AuthContext);
  const { storeData } = useContext(AuthContext);

  const [logs, setLogsData] = useState('');


  const fetchLogs = async () => {
    const serverURL = await getData('serverURL');

    fetch(serverURL + "/settings/logs")
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const data = [];

        $('tbody tr').each((index, element) => {
          const user = $(element).find('td').eq(0).text().replace(/\n/g, '').replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
          const time = $(element).find('td').eq(1).text().replace(/\n/g, '').replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
          const path = $(element).find('td').eq(2).text().replace(/\n/g, '').replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

          data.push({ user, time, path });
        });
        // console.log(data);
        setLogsData(data);

      })
      .catch((error) => {
        // console.error('Error:', error);
        console.log('failed');
        Alert.alert(
          "로그인 실패",
          "서버와 연결할 수 없습니다.",
          [
            { text: "확인" }
          ],
          { cancelable: false }
        );
      });
  }


  useEffect(() => {
    fetchLogs();
  }, []);



  return (
    <View style={{ height: '100%' }}>
      {logs ? <LogsTable logs={logs} /> : <Loading />}
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
    fontSize: 16,
  },
  useropener: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 'bold'
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