import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Bildirim davranışını ayarla
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Bildirim izni iste
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6366F1',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Bildirim izni verilmedi!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Bildirimler sadece fiziksel cihazlarda çalışır!');
  }

  return token;
}

// Aşı hatırlatıcısı planla
export async function scheduleVaccineReminder(vaccineName, date, childName) {
  const trigger = new Date(date);
  trigger.setHours(9, 0, 0, 0); // Sabah 9'da hatırlat

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💉 Aşı Hatırlatıcısı',
      body: `${childName} için ${vaccineName} aşısı zamanı!`,
      data: { type: 'vaccine', vaccineName, childName },
      sound: true,
    },
    trigger,
  });
}

// Doktor randevu hatırlatıcısı
export async function scheduleDoctorReminder(appointmentDate, childName, note) {
  const trigger = new Date(appointmentDate);
  trigger.setDate(trigger.getDate() - 1); // 1 gün önce hatırlat
  trigger.setHours(18, 0, 0, 0); // Akşam 6'da

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🏥 Doktor Randevusu',
      body: `Yarın ${childName} için doktor randevunuz var${note ? `: ${note}` : ''}`,
      data: { type: 'doctor', childName, note },
      sound: true,
    },
    trigger,
  });
}

// Gelişim kilometre taşı hatırlatıcısı
export async function scheduleMilestoneReminder(milestone, ageMonths, childName) {
  const trigger = {
    seconds: 60 * 60 * 24 * 30 * ageMonths, // X ay sonra
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⭐ Gelişim Kilometre Taşı',
      body: `${childName} artık ${milestone} yapabilir mi? Kontrol edin!`,
      data: { type: 'milestone', milestone, childName },
      sound: true,
    },
    trigger,
  });
}

// Hamilelik haftalık bildirim
export async function scheduleWeeklyPregnancyReminder(week) {
  const trigger = {
    weekday: 2, // Pazartesi
    hour: 9,
    minute: 0,
    repeats: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🤰 ${week}. Hafta`,
      body: 'Hamilelik takibinizi kontrol edin ve bu haftanın önerilerini okuyun!',
      data: { type: 'pregnancy', week },
      sound: true,
    },
    trigger,
  });
}

// Günlük hatırlatıcı (akşam günlük yazma)
export async function scheduleDailyJournalReminder() {
  const trigger = {
    hour: 20,
    minute: 0,
    repeats: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📝 Günlük Zamanı',
      body: 'Bugün neler oldu? Özel anları kaydetmeyi unutmayın!',
      data: { type: 'journal' },
      sound: true,
    },
    trigger,
  });
}

// Büyüme ölçümü hatırlatıcısı (aylık)
export async function scheduleMonthlyGrowthReminder(childName) {
  const trigger = {
    day: 1, // Her ayın 1'i
    hour: 10,
    minute: 0,
    repeats: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📏 Aylık Ölçüm Zamanı',
      body: `${childName} için kilo ve boy ölçümü yapma zamanı!`,
      data: { type: 'growth', childName },
      sound: true,
    },
    trigger,
  });
}

// Tüm bildirimleri iptal et
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Belirli bir bildirimi iptal et
export async function cancelNotification(notificationId) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// Planlanmış bildirimleri listele
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}
