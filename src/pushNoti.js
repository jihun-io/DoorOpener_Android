import {AppState} from 'react-native';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';

const displayNotification = async message => {
  const channelAnoucement = await notifee.createChannel({
    id: '500',
    name: 'MainChannel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId: channelAnoucement,
      smallIcon: 'ic_launcher', //
    },
  });
};

export default {
  displayNoti: remoteMessage => displayNotification(remoteMessage),
};