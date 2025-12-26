import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Foreground'da da bildirim göster
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function initNotifications() {
  // Mevcut izin durumu
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('❌ Bildirim izni verilmedi');
    return false;
  }

  // Android notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Hamilelik Takibi',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF6B9D',
    });
  }

  console.log('✅ Bildirim altyapısı hazır');
  return true;
}

// Test bildirimi (5 sn sonra)
export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '👶 Hamilelik Takibi',
      body: 'Bildirim sistemi çalışıyor 🎉',
    },
    trigger: {
      type: Notifications.TriggerType.TIME_INTERVAL,
      seconds: 5,
      channelId: 'default',
    },
  });
}

