# 🔔 Bildirim Sistemi

## ✅ Tamamlanan Özellikler

### 1. 📦 Kurulum
```bash
npm install expo-notifications expo-device --legacy-peer-deps
```

**Yüklenen Paketler:**
- `expo-notifications` - Bildirim yönetimi
- `expo-device` - Cihaz kontrolü

### 2. 🛠️ Bildirim Utility Fonksiyonları
**Dosya:** `src/utils/notifications.js`

#### Temel Fonksiyonlar:
- `registerForPushNotificationsAsync()` - Bildirim izni iste
- `cancelAllNotifications()` - Tüm bildirimleri iptal et
- `cancelNotification(id)` - Belirli bildirimi iptal et
- `getAllScheduledNotifications()` - Planlanmış bildirimleri listele

#### Hatırlatıcı Fonksiyonları:
- `scheduleVaccineReminder()` - Aşı hatırlatıcısı
- `scheduleDoctorReminder()` - Doktor randevu hatırlatıcısı
- `scheduleMilestoneReminder()` - Gelişim kilometre taşı
- `scheduleWeeklyPregnancyReminder()` - Haftalık hamilelik bildirimi
- `scheduleDailyJournalReminder()` - Günlük yazma hatırlatıcısı
- `scheduleMonthlyGrowthReminder()` - Aylık büyüme ölçümü

### 3. ⚙️ Ayarlar Ekranı Güncellemesi
**Dosya:** `src/screens/settings/SettingsScreen.js`

**Eklenen Özellikler:**
- Bildirim ayarları menü öğesi
- Bildirim açıklaması ve önizleme
- Yakında gelecek özellikler listesi güncellendi

### 4. 💾 Store Güncellemesi
**Dosya:** `src/store/appStore.js`

**Yeni State:**
```javascript
settings: {
  notificationsEnabled: true,
  vaccineReminders: true,
  doctorReminders: true,
  journalReminders: true,
  growthReminders: true,
  pregnancyReminders: true,
}
```

**Yeni Fonksiyon:**
```javascript
updateSettings: (newSettings) => {
  set((state) => ({
    settings: { ...state.settings, ...newSettings },
  }));
}
```

### 5. 📱 App.json Konfigürasyonu
**Dosya:** `app.json`

**Eklenen Ayarlar:**
- iOS background modes
- Android permissions (RECEIVE_BOOT_COMPLETED, VIBRATE, SCHEDULE_EXACT_ALARM)
- Notification plugin konfigürasyonu
- Bildirim ikonu ve renk ayarları

## 📋 Bildirim Tipleri

### 1. 💉 Aşı Hatırlatıcıları
```javascript
scheduleVaccineReminder(vaccineName, date, childName)
```
- **Zaman:** Aşı tarihinde sabah 9:00
- **Başlık:** "💉 Aşı Hatırlatıcısı"
- **İçerik:** "{childName} için {vaccineName} aşısı zamanı!"
- **Ses:** Aktif

### 2. 🏥 Doktor Randevu Hatırlatıcıları
```javascript
scheduleDoctorReminder(appointmentDate, childName, note)
```
- **Zaman:** Randevu 1 gün önce, akşam 18:00
- **Başlık:** "🏥 Doktor Randevusu"
- **İçerik:** "Yarın {childName} için doktor randevunuz var"
- **Ses:** Aktif

### 3. ⭐ Gelişim Kilometre Taşı Hatırlatıcıları
```javascript
scheduleMilestoneReminder(milestone, ageMonths, childName)
```
- **Zaman:** Belirtilen ay sayısı sonra
- **Başlık:** "⭐ Gelişim Kilometre Taşı"
- **İçerik:** "{childName} artık {milestone} yapabilir mi?"
- **Ses:** Aktif

### 4. 🤰 Hamilelik Haftalık Bildirimleri
```javascript
scheduleWeeklyPregnancyReminder(week)
```
- **Zaman:** Her Pazartesi sabah 9:00
- **Başlık:** "🤰 {week}. Hafta"
- **İçerik:** "Hamilelik takibinizi kontrol edin"
- **Tekrar:** Haftalık
- **Ses:** Aktif

### 5. 📝 Günlük Yazma Hatırlatıcıları
```javascript
scheduleDailyJournalReminder()
```
- **Zaman:** Her gün akşam 20:00
- **Başlık:** "📝 Günlük Zamanı"
- **İçerik:** "Bugün neler oldu? Özel anları kaydedin!"
- **Tekrar:** Günlük
- **Ses:** Aktif

### 6. 📏 Aylık Büyüme Ölçümü Hatırlatıcıları
```javascript
scheduleMonthlyGrowthReminder(childName)
```
- **Zaman:** Her ayın 1'i, sabah 10:00
- **Başlık:** "📏 Aylık Ölçüm Zamanı"
- **İçerik:** "{childName} için kilo ve boy ölçümü yapın"
- **Tekrar:** Aylık
- **Ses:** Aktif

## 🎯 Kullanım Senaryoları

### Senaryo 1: Aşı Hatırlatıcısı Ekleme
```javascript
import { scheduleVaccineReminder } from '../utils/notifications';

// Aşı tamamlandığında hatırlatıcı planla
const handleVaccineComplete = async (vaccine, child) => {
  const nextVaccineDate = calculateNextVaccineDate(vaccine);
  await scheduleVaccineReminder(
    vaccine.name,
    nextVaccineDate,
    child.name
  );
};
```

### Senaryo 2: Doktor Randevusu Ekleme
```javascript
import { scheduleDoctorReminder } from '../utils/notifications';

// Randevu eklendiğinde hatırlatıcı planla
const handleAddAppointment = async (date, child, note) => {
  await scheduleDoctorReminder(date, child.name, note);
  Alert.alert('Başarılı', 'Randevu hatırlatıcısı eklendi! 🔔');
};
```

### Senaryo 3: Varsayılan Hatırlatıcıları Ayarlama
```javascript
import { 
  scheduleDailyJournalReminder,
  scheduleMonthlyGrowthReminder 
} from '../utils/notifications';

// Uygulama ilk açıldığında
const setupDefaultReminders = async (children) => {
  await scheduleDailyJournalReminder();
  
  for (const child of children) {
    await scheduleMonthlyGrowthReminder(child.name);
  }
};
```

## 🔧 Teknik Detaylar

### Bildirim Kanalları (Android)
```javascript
await Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#6366F1',
});
```

### Bildirim Handler
```javascript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

### Trigger Tipleri

#### 1. Belirli Tarih/Saat
```javascript
const trigger = new Date('2024-12-25T09:00:00');
```

#### 2. Tekrarlayan (Günlük)
```javascript
const trigger = {
  hour: 20,
  minute: 0,
  repeats: true,
};
```

#### 3. Tekrarlayan (Haftalık)
```javascript
const trigger = {
  weekday: 2, // Pazartesi
  hour: 9,
  minute: 0,
  repeats: true,
};
```

#### 4. Tekrarlayan (Aylık)
```javascript
const trigger = {
  day: 1, // Her ayın 1'i
  hour: 10,
  minute: 0,
  repeats: true,
};
```

#### 5. Saniye Sonra
```javascript
const trigger = {
  seconds: 60 * 60 * 24 * 30, // 30 gün sonra
};
```

## 📱 Platform Özellikleri

### iOS
- Background notification desteği
- Silent notifications
- Badge sayısı
- Ses ve titreşim

### Android
- Notification channels
- Importance levels
- LED rengi
- Vibration pattern
- Exact alarm permission (Android 12+)

## 🔐 İzinler

### iOS
- `UIBackgroundModes: ["remote-notification"]`
- Kullanıcıdan izin istenir (runtime)

### Android
- `RECEIVE_BOOT_COMPLETED` - Cihaz yeniden başladığında bildirimleri geri yükle
- `VIBRATE` - Titreşim izni
- `SCHEDULE_EXACT_ALARM` - Tam zamanında bildirim (Android 12+)

## 🎨 Bildirim Tasarımı

### Renkler
- **Primary:** #6366F1 (Indigo)
- **Icon:** Uygulama ikonu
- **LED (Android):** #6366F1

### İkonlar
- 💉 Aşı
- 🏥 Doktor
- ⭐ Kilometre taşı
- 🤰 Hamilelik
- 📝 Günlük
- 📏 Büyüme

## 🚀 Gelecek Geliştirmeler

### Kısa Vadeli
1. **Bildirim Ayarları Ekranı** - Tam fonksiyonel ayarlar
2. **Bildirim Geçmişi** - Gönderilen bildirimleri görüntüleme
3. **Özel Ses Seçimi** - Kullanıcı ses seçebilsin
4. **Snooze Özelliği** - Bildirimi ertele

### Orta Vadeli
1. **Akıllı Hatırlatıcılar** - Kullanıcı alışkanlıklarına göre
2. **Grup Bildirimleri** - İlgili bildirimleri grupla
3. **Rich Notifications** - Resim ve butonlar
4. **Action Buttons** - Bildirimden direkt işlem

### Uzun Vadeli
1. **Push Notifications** - Sunucu taraflı bildirimler
2. **Bildirim Analitikleri** - Hangi bildirimler etkili?
3. **A/B Testing** - Farklı bildirim metinleri test et
4. **Kişiselleştirme** - AI destekli öneriler

## 📊 Kullanım İstatistikleri

### Bildirim Tipleri Dağılımı (Tahmini)
- 📝 Günlük: %30
- 📏 Büyüme: %20
- 💉 Aşı: %20
- 🤰 Hamilelik: %15
- 🏥 Doktor: %10
- ⭐ Kilometre taşı: %5

### Açılma Oranları (Hedef)
- Aşı hatırlatıcıları: %80+
- Doktor randevuları: %90+
- Günlük hatırlatıcıları: %40+
- Büyüme ölçümü: %60+

## 🐛 Bilinen Sorunlar

### 1. Emulator'da Çalışmaz
**Sorun:** Bildirimler sadece fiziksel cihazlarda çalışır
**Çözüm:** Gerçek cihazda test edin

### 2. Android 12+ Exact Alarm
**Sorun:** Android 12+ exact alarm izni gerektirir
**Çözüm:** Kullanıcıdan izin isteyin

### 3. iOS Background Limitations
**Sorun:** iOS arka planda bildirimleri sınırlayabilir
**Çözüm:** Kullanıcıya bilgi verin

## 💡 Best Practices

### 1. Bildirim Sıklığı
- ❌ Çok fazla bildirim göndermeyin
- ✅ Kullanıcı kontrol edebilsin
- ✅ Önemli bildirimlere öncelik verin

### 2. Bildirim İçeriği
- ✅ Kısa ve öz olsun
- ✅ Emoji kullanın (görsel çekicilik)
- ✅ Actionable olsun (ne yapmalı?)
- ❌ Spam gibi görünmesin

### 3. Zamanlama
- ✅ Uygun saatlerde gönderin (9:00-21:00)
- ❌ Gece bildirimi göndermeyin
- ✅ Kullanıcı tercihlerini dikkate alın

### 4. İzinler
- ✅ İzin isterken açıklama yapın
- ✅ İzin reddedilirse alternatif sunun
- ❌ Sürekli izin istemeyin

## 📝 Notlar

- Bildirimler AsyncStorage ile persist edilmez
- Uygulama silindiğinde bildirimler de silinir
- Cihaz yeniden başladığında bildirimler korunur (Android)
- iOS'ta background refresh açık olmalı

## ✨ Sonuç

Bildirim sistemi temel altyapısı hazır! Şimdi:
1. ✅ Utility fonksiyonları oluşturuldu
2. ✅ Store'a settings eklendi
3. ✅ Ayarlar ekranı güncellendi
4. ✅ App.json konfigüre edildi

**Sıradaki Adım:** Bildirim ayarları ekranını tam fonksiyonel hale getirmek ve bildirimleri ilgili ekranlara entegre etmek.

---

**Hazırlayan:** Kiro AI
**Tarih:** 28 Kasım 2025
**Versiyon:** 1.0.0
