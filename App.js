import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/tr';
import RootNavigator from './src/navigation/RootNavigator';
import { initNotifications, sendTestNotification } from './src/notifications';

dayjs.extend(customParseFormat);
dayjs.locale('tr');

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      const ok = await initNotifications();
      if (ok) {
        await sendTestNotification();
      }
    }

    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootNavigator />
    </NavigationContainer>
  );
}
