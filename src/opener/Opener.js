import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, View, TouchableHighlight, Alert } from 'react-native';

import Loading from './Opener-loading';
import Done from './Opener-done';
import { AuthContext } from '../AuthContext';

function Opener()  {
  const [doorStatus, setDoorStatus] = useState('');
  const { getData } = useContext(AuthContext);

  const open = async () => {
    const getServerUrl = await getData('serverURL');

    const serverURL = getServerUrl;
    console.log("서버 주소: " + serverURL);

    fetch(serverURL + "/openwithapp?isTest=1", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())  // response.json() 대신 response.text()를 사용합니다.
      .then((text) => {
        let data = JSON.parse(text);  // 텍스트를 JSON 객체로 변환합니다.
        console.log(data);  // 변환된 JSON 객체를 출력합니다.
        if (data.result === "Success") {
          console.log('문 열림!');
          setDoorStatus('Success');
        } else if (data.result === "Failed") {
          console.log('failed');
          Alert.alert(
            "로그인 실패",
            "사용자를 확인할 수 없습니다.",
            [
              { text: "확인" }
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    open();
  }, []);
  


  return (
    <View>
      {doorStatus == "Success" ? <Done /> : <Loading />}
    </View>
  );
};

export default Opener;