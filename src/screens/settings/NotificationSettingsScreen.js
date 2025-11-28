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
  getAllScheduledNotifications
} from '../../utils/notifications';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const NotificationSettingsScreen = ({ navigation }) => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const children = useAppStore((state) => state.children);

  const [notificationsEnabled, setNotificationsEnabled] = useState(settings?.notificationsEnabled ?? true);
  const [vaccineReminders, setVaccineReminders] = useState(settings?.vaccineReminders ?? true);
  const [doctorReminders, setDoctorReminders] = useState(settings?.doctorReminders ?? true);
  const [journalReminders, setJournalReminders] = useState(settings?.journalReminders ?? true);
  const [growthReminders, setGrowthReminders] = useState(settings?.growthReminders ?? true);
  const [pregnancyReminders, setPregnancyReminders] = useState(settings?.pregnancyReminders ?? true);
  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    loadScheduledNotifications();
  }, []);

  const loadScheduledNotifications = async () => {
    try {
      const notifications = await getAllScheduledNotifications();
      setScheduledCount(notifications.length);
    } catch (error) {
      console.error('Bildirimler yüklenemedi:', error);
    }
  };

  const handleNotificationsToggle = async (value) => {
    setNotificationsEnabled(value);
    updateSettings({ notificationsEnabled: value });

    if (value) {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          Alert.alert('Başarılı', 'Bildirimler aktif edildi! 🔔');
          await setupDefaultReminders();
        }
      } catch (error) {
        Alert.alert('Hata', 'Bildirim izni alınamadı. Lütfen cihaz ayarlarından izin verin.');
      }
    } else {
      await cancelAllNotifications();
      setScheduledCount(0);
      Alert.alert('Bilgi', 'Tüm bildirimler iptal edildi.');
    }
  };

  const setupDefaultReminders = async () => {
    try {
      if (journalReminders) {
        await scheduleDailyJournalReminder();
      }
      if (growthReminders && children.length > 0) {
        for (const child of children) {
          await scheduleMonthlyGrowthReminder(child.name);
        }
      }
      await loadScheduledNotifications();
    } catch (error) {
      console.error('Hatırlatıcılar kurulamadı:', error);
    }
  };

  const handleSettingToggle = (key, value, setter) => {
    setter(value);
    updateSettings({ [key]: value });
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
              <Text style={styles.settingDescription}>Tüm bildirimleri aç/kapat</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notificationsEnabled ? colors.primary : colors.textMuted}
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
                  value={vaccineReminders}
                  onValueChange={(value) => handleSettingToggle('vaccineReminders', value, setVaccineReminders)}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={vaccineReminders ? colors.primary : colors.textMuted}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>🏥 Doktor Randevu Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Randevu 1 gün önce hatırlat</Text>
                </View>
                <Switch
                  value={doctorReminders}
                  onValueChange={(value) => handleSettingToggle('doctorReminders', value, setDoctorReminders)}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={doctorReminders ? colors.primary : colors.textMuted}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>📝 Günlük Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Her akşam saat 20:00'de</Text>
                </View>
                <Switch
                  value={journalReminders}
                  onValueChange={(value) => handleSettingToggle('journalReminders', value, setJournalReminders)}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={journalReminders ? colors.primary : colors.textMuted}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>📏 Büyüme Ölçümü Hatırlatıcıları</Text>
                  <Text style={styles.settingDescription}>Her ayın 1'inde</Text>
                </View>
                <Switch
                  value={growthReminders}
                  onValueChange={(value) => handleSettingToggle('growthReminders', value, setGrowthReminders)}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={growthReminders ? colors.primary : colors.textMuted}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>🤰 Hamilelik Bildirimleri</Text>
                  <Text style={styles.settingDescription}>Haftalık bilgiler</Text>
                </View>
                <Switch
                  value={pregnancyReminders}
                  onValueChange={(value) => handleSettingToggle('pregnancyReminders', value, setPregnancyReminders)}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={pregnancyReminders ? colors.primary : colors.textMuted}
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
            <Text style={styles.infoTitle}>Önemli Bilgi</Text>
            <Text style={styles.infoText}>
              Bildirimlerin çalışması için cihaz ayarlarından izin vermeniz gerekebilir. 
              Expo Go'da bildirimler sınırlı çalışır, production build'de tam çalışır.
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
