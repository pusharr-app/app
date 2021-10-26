import React from 'react';
import { Layout, TopNav, themeColor } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { Events } from '../components/Events';
import { Button } from 'react-native-ui-lib';
import { usePushNotification } from '../hooks/usePushNotification';
import { firebase } from '../firebase';

export default function ({ navigation }) {
  const { isSetup, isLoading, isInited, setupNotification } =
    usePushNotification();
  return (
    <Layout>
      <TopNav
        middleContent="Latest events"
        rightContent={
          <Ionicons name="log-in-outline" size={20} color={themeColor.dark} />
        }
        rightAction={() => {
          firebase.auth().signOut();
        }}
      />
      {isInited && isSetup === false && (
        <Button
          disabled={isLoading}
          onPress={setupNotification}
          label="Start getting push notifications"
        />
      )}
      <Events />
    </Layout>
  );
}
