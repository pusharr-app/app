import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ToastAndroid } from 'react-native';
import { firebase } from '../firebase';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@pusharr/didSetupPushNotification';

// https://docs.expo.dev/push-notifications/sending-notifications-custom/

export function usePushNotification() {
  const [isSetup, setIsSetup] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);

  async function checkStorage() {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setIsSetup(true);
    } else {
      setIsSetup(false);
    }
  }

  useEffect(() => {
    checkStorage();
  }, []);

  async function setupNotification() {
    setIsLoading(true);
    try {
      const token = (await Notifications.getDevicePushTokenAsync()).data;
      const user = firebase.auth().currentUser?.toJSON() as any;
      if (!user) {
        throw new Error('No user found');
      }
      const authToken = user.stsTokenManager.accessToken;
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
        if (res.status) {
          await AsyncStorage.setItem(key, 'yes');
          setIsSetup(true);
          ToastAndroid.show('Push notifications setup', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          'No push notifications in Expo Go',
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
    setIsLoading(false);
  }

  return {
    isSetup,
    setupNotification,
    isInited: typeof isSetup !== 'undefined',
    isLoading,
  };
}
