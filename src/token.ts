import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ToastAndroid } from 'react-native';
import { firebase } from './firebase';

// https://docs.expo.dev/push-notifications/sending-notifications-custom/

export async function setupNotification() {
  ToastAndroid.show(
    'Trying to setup push notification ' + Constants.appOwnership,
    ToastAndroid.SHORT
  );
  try {
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    const authToken = // @ts-ignore
    firebase.auth().currentUser.toJSON().stsTokenManager.accessToken;
    const pushToken = {
      token,
      name: Device.deviceName,
    };
    console.log('appOwnership', Constants.appOwnership);
    if (Constants.appOwnership !== 'expo') {
      const res = await fetch('https://www.pusharr.com/api/push-tokens', {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pushToken),
      });
      ToastAndroid.show(res.status.toString(), ToastAndroid.SHORT);
      console.log('status', res.status);
    } else {
      ToastAndroid.show('No push notifcations in Expo Go', ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
    console.log('error', error.message);
  }
}
