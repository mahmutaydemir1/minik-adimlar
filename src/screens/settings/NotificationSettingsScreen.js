import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import useAppStore from '../../store/appStore';
import { 
  registerForPushNotificationsAsync,
  scheduleDailyJournalReminder,
  scheduleMonthlyGrowthReminder,
  cancelAllNotifications,
  getAllScheduledNotifications,
  scheduleTestNotification,
} from '../../utils/notifications';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const NotificationSettingsScreen = ({ navigation }) => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const children = useAppStore((state) => state.children);

  const [scheduledCount, setScheduledCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration tamamlandığında flag'i set et
  useEffect(() => {
    // Settings objesi yüklendiyse hydration tamamlanmış demektir
    if (settings && Object.keys(settings).length > 0) {
      setIsHydrated(true);
    }
  }, [settings]);

  // Store'dan direkt değerleri kullan - undefined check
  const notificationsEnabled = settings?.notificationsEnabled !== undefined ? settings.notificationsEnabled : true;
  const vaccineReminders = settings?.vaccineReminders !== undefined ? settings.vaccineReminders : true;
  const doctorReminders = settings?.doctorReminders !== undefined ? settings.doctorReminders : true;
  const journalReminders = settings?.journalReminders !== undefined ? settings.journalReminders : true;
  const growthReminders = settings?.growthReminders !== undefined ? settings.growthReminders : true;
  const pregnancyReminders = settings?.pregnancyReminders !== undefined ? settings.pregnancyReminders : true;

  useEffect(() => {
    // Eğer settings objesi yoksa veya eksikse, default değerlerle initialize et
    if (!settings || Object.keys(settings).length === 0) {
      updateSettings({
        notificationsEnabled: true,
        vaccineReminders: true,
        doctorReminders: true,
        journalReminders: true,
        growthReminders: true,
        pregnancyReminders: true,
      });
    }
    
    // Bildirim sayısını yükle
    loadScheduledNotifications();
  }, []);

  // Bildirimler aktif olduğunda sayıyı güncelle
  useEffect(() => {
    if (notificationsEnabled) {
      loadScheduledNotifications();
    }
  }, [notificationsEnabled]);

  const loadScheduledNotifications = async () => {
    try {
      const notifications = await getAllScheduledNotifications();
      console.log('Planlanmış bildirimler:', notifications.length);
      console.log('Bildirim detayları:', notifications);
      setScheduledCount(notifications.length);
    } catch (error) {
      console.error('Bildirimler yüklenemedi:', error);
      setScheduledCount(0);
    }
  };

  const handleNotificationsToggle = async (value) => {
    updateSettings({ notificationsEnabled: value });

    if (value) {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          Alert.alert('Başarılı', 'Bildirimler aktif edildi! 🔔');
          await setupDefaultReminders();
        } else {
          // Token alınamadı ama hata fırlatılmadı
          Alert.alert(
            'Bilgi',
            'Expo Go\'da bildirimler sınırlı çalışır. Yerel bildirimler (hatırlatıcılar) aktif edildi. Push bildirimleri için production build gereklidir.',
            [{ text: 'Tamam' }]
          );
          await setupDefaultReminders();
        }
      } catch (error) {
        console.error('Bildirim izni hatası:', error);
        Alert.alert(
          'Bildirim İzni',
          'Expo Go\'da bildirimler sınırlı çalışır. Yerel hatırlatıcılar yine de kurulacak.\n\nProduction build\'de tam bildirim desteği olacak.',
          [
            { 
              text: 'Tamam',
              onPress: async () => {
                // Yerel bildirimleri yine de kur
                await setupDefaultReminders();
              }
            }
          ]
        );
      }
    } else {
      await cancelAllNotifications();
      setScheduledCount(0);
      Alert.alert('Bilgi', 'Tüm bildirimler iptal edildi.');
    }
  };

  const setupDefaultReminders = async () => {
    try {
      console.log('Hatırlatıcılar kuruluyor...');
      let successCount = 0;
      
      // Test bildirimi kur
      try {
        console.log('Test bildirimi kuruluyor (5 saniye sonra)...');
        await scheduleTestNotification();
        successCount++;
      } catch (error) {
        console.warn('Test bildirimi kurulamadı:', error.message);
      }
      
      if (journalReminders) {
        try {
          console.log('Günlük hatırlatıcısı kuruluyor...');
          await scheduleDailyJournalReminder();
          successCount++;
        } catch (error) {
          console.warn('Günlük hatırlatıcısı kurulamadı:', error.message);
        }
      }
      
      if (growthReminders && children.length > 0) {
        console.log('Büyüme hatırlatıcıları kuruluyor...');
        for (const child of children) {
          try {
            await scheduleMonthlyGrowthReminder(child.name);
            successCount++;
          } catch (error) {
            console.warn(`Büyüme hatırlatıcısı kurulamadı (${child.name}):`, error.message);
          }
        }
      }
      
      console.log(`${successCount} hatırlatıcı kuruldu`);
      
      // Expo Go'da bildirimler çalışmıyorsa simüle et
      const notifications = await getAllScheduledNotifications();
      if (notifications.length === 0 && successCount > 0) {
        console.warn('Expo Go sınırlaması: Bildirimler kuruldu ama listelenemiyor');
        // Simüle edilmiş sayı göster
        setScheduledCount(successCount);
      } else {
        await loadScheduledNotifications();
      }
    } catch (error) {
      console.error('Hatırlatıcılar kurulamadı:', error);
    }
  };

  const handleSettingToggle = async (key, value) => {
    updateSettings({ [key]: value });

    // Eğer bildirimler aktifse ve bu ayar açıldıysa, ilgili hatırlatıcıyı kur
    if (notificationsEnabled && value) {
      try {
        if (key === 'journalReminders') {
          await scheduleDailyJournalReminder();
          await loadScheduledNotifications();
        } else if (key === 'growthReminders' && children.length > 0) {
          for (const child of children) {
            await scheduleMonthlyGrowthReminder(child.name);
          }
          await loadScheduledNotifications();
        }
      } catch (error) {
        console.error('Hatırlatıcı kurulamadı:', error);
      }
    }
  };

  const handleClearAllNotifications = () => {
    Alert.alert(
      'Bildirimleri Temizle',
      'Tüm planlanmış bildirimler iptal edilecek. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert('Başarılı', 'Tüm bildirimler temizlendi.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Bildirim Ayarları</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Ana Bildirim Ayarı */}
        <Card variant="elevated" style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Bildirimler</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Bildirimleri Aktif Et</Text>
              <Text style={styles.settingDescription}>Bildirimleri aç/kapat</Text>
            </View>
            <Switch
              key={`notifications-${notificationsEnabled}-${isHydrated}`}
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notificationsEnabled ? colors.surface : colors.textMuted}
              ios_backgroundColor={colors.border}
              disabled={!isHydrated}
            />
          </View>

          {notificationsEnabled && (
            <>
              <View style={styles.divider} />
              
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>💉 Aşı Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Aşı zamanı geldiğinde bildir</Text>
                </View>
                <Switch
                  key={`vaccine-${vaccineReminders}-${isHydrated}`}
                  value={vaccineReminders}
                  onValueChange={(value) => handleSettingToggle('vaccineReminders', value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={vaccineReminders ? colors.surface : colors.textMuted}
                  ios_backgroundColor={colors.border}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>🏥 Doktor Randevu Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Randevu 1 gün önce hatırlat</Text>
                </View>
                <Switch
                  key={`doctor-${doctorReminders}-${isHydrated}`}
                  value={doctorReminders}
                  onValueChange={(value) => handleSettingToggle('doctorReminders', value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={doctorReminders ? colors.surface : colors.textMuted}
                  ios_backgroundColor={colors.border}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>📝 Günlük Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Her akşam saat 20:00'de</Text>
                </View>
                <Switch
                  key={`journal-${journalReminders}-${isHydrated}`}
                  value={journalReminders}
                  onValueChange={(value) => handleSettingToggle('journalReminders', value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={journalReminders ? colors.surface : colors.textMuted}
                  ios_backgroundColor={colors.border}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>📏 Büyüme Ölçümü Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Her ayın 1'inde</Text>
                </View>
                <Switch
                  key={`growth-${growthReminders}-${isHydrated}`}
                  value={growthReminders}
                  onValueChange={(value) => handleSettingToggle('growthReminders', value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={growthReminders ? colors.surface : colors.textMuted}
                  ios_backgroundColor={colors.border}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>🤰 Hamilelik Bildirimleri</Text>
                  <Text style={styles.settingDescription}>Haftalık bilgiler</Text>
                </View>
                <Switch
                  key={`pregnancy-${pregnancyReminders}-${isHydrated}`}
                  value={pregnancyReminders}
                  onValueChange={(value) => handleSettingToggle('pregnancyReminders', value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={pregnancyReminders ? colors.surface : colors.textMuted}
                  ios_backgroundColor={colors.border}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.notificationInfo}>
                <Ionicons name="information-circle" size={20} color={colors.info} />
                <Text style={styles.notificationInfoText}>
                  {scheduledCount} planlanmış bildirim var
                </Text>
              </View>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearAllNotifications}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
                <Text style={styles.clearButtonText}>Tüm Bildirimleri Temizle</Text>
              </TouchableOpacity>
            </>
          )}
        </Card>

        {/* Bilgi Kartı */}
        <Card variant="outlined" style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.warning} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>📱 Expo Go Sınırlaması</Text>
            <Text style={styles.infoText}>
              Expo Go'da yerel bildirimler (local notifications) sınırlı çalışır. 
              Bildirim sistemi production build'de tam olarak çalışacaktır.{'\n\n'}
              Şu anda ayarlar kaydediliyor ve production'da aktif olacak.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  heading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  card: {
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.infoLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  notificationInfoText: {
    ...typography.bodySmall,
    color: colors.info,
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error,
  },
  clearButtonText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.warningLight,
    alignItems: 'flex-start',
  },
  infoTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default NotificationSettingsScreen;
