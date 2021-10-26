import React from 'react';
import { Layout, TopNav, themeColor } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { Events } from '../components/Events';
import { Button } from 'react-native-ui-lib';
import { setupNotification } from '../token';
import { firebase } from '../firebase';

export default function ({ navigation }) {
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
      <Button
        onPress={() => setupNotification()}
        label="Test push notifications 5"
      />
      <Events />
    </Layout>
  );
}
