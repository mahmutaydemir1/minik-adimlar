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

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF6B9D',
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
        console.warn('Bildirim izni verilmedi');
        return null;
      }
      
      // Expo Go'da push token alınamayabilir, bu normal
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } catch (tokenError) {
        console.warn('Push token alınamadı (Expo Go\'da normal):', tokenError.message);
        // Token olmasa bile yerel bildirimler çalışır
        return null;
      }
    } else {
      console.warn('Simulator/Emulator - bildirimler sınırlı çalışır');
      return null;
    }

    return token;
  } catch (error) {
    console.error('Bildirim kaydı hatası:', error);
    throw error;
  }
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
  try {
    const trigger = {
      hour: 20,
      minute: 0,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '📝 Günlük Zamanı',
        body: 'Bugün neler oldu? Özel anları kaydetmeyi unutmayın!',
        data: { type: 'journal' },
        sound: true,
      },
      trigger,
    });
    
    console.log('Günlük hatırlatıcısı kuruldu, ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Günlük hatırlatıcısı kurulamadı:', error);
    throw error;
  }
}

// Büyüme ölçümü hatırlatıcısı (aylık)
export async function scheduleMonthlyGrowthReminder(childName) {
  try {
    const trigger = {
      day: 1, // Her ayın 1'i
      hour: 10,
      minute: 0,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '📏 Aylık Ölçüm Zamanı',
        body: `${childName} için kilo ve boy ölçümü yapma zamanı!`,
        data: { type: 'growth', childName },
        sound: true,
      },
      trigger,
    });
    
    console.log(`Büyüme hatırlatıcısı kuruldu (${childName}), ID:`, notificationId);
    return notificationId;
  } catch (error) {
    console.error(`Büyüme hatırlatıcısı kurulamadı (${childName}):`, error);
    throw error;
  }
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

// Test bildirimi (5 saniye sonra)
export async function scheduleTestNotification() {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Test Bildirimi',
        body: 'Bildirimler çalışıyor!',
        data: { type: 'test' },
        sound: true,
      },
      trigger: {
        seconds: 5,
      },
    });
    
    console.log('Test bildirimi kuruldu, ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Test bildirimi kurulamadı:', error);
    throw error;
  }
}
