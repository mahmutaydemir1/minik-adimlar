import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppStore from '../../store/appStore';
import Card from '../../components/Card';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const children = useAppStore((state) => state.children);
  const pregnancies = useAppStore((state) => state.pregnancies);
  const growthRecords = useAppStore((state) => state.growthRecords);
  const journalEntries = useAppStore((state) => state.journalEntries);
  const vaccineRecords = useAppStore((state) => state.vaccineRecords);

  const handleClearData = () => {
    Alert.alert(
      'Tüm Verileri Sil',
      'TÜM veriler silinecek ve geri alınamayacak. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Başarılı', 'Tüm veriler silindi. Uygulama yeniden başlatılıyor...');
              // Uygulamayı yeniden başlatmak için
              setTimeout(() => {
                // React Native'de app restart için
              }, 1000);
            } catch (error) {
              Alert.alert('Hata', 'Veriler silinirken bir hata oluştu.');
            }
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    const data = {
      children,
      pregnancies,
      growthRecords,
      journalEntries,
      vaccineRecords,
      exportDate: new Date().toISOString(),
    };
    
    Alert.alert(
      'Veri Dışa Aktarma',
      'Verileriniz JSON formatında dışa aktarılacak. Bu özellik yakında gelecek!',
      [{ text: 'Tamam' }]
    );
    
    console.log('Export data:', JSON.stringify(data, null, 2));
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Hata', 'Link açılamadı.');
    });
  };

  const totalRecords = children.length + pregnancies.length + growthRecords.length + 
                       journalEntries.length + vaccineRecords.length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Ayarlar</Text>

        {/* Uygulama Bilgileri */}
        <Card variant="elevated" style={styles.appInfoCard}>
          <View style={styles.appIconContainer}>
            <Text style={styles.appIcon}>👶</Text>
          </View>
          <Text style={styles.appName}>Minik Adımlar</Text>
          <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
          <Text style={styles.appDescription}>
            Hamilelik ve 0-6 yaş çocuk gelişimi takip uygulaması
          </Text>
        </Card>

        {/* Veri İstatistikleri */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Veri İstatistikleri</Text>
          <View style={styles.statRow}>
            <Ionicons name="people" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Çocuklar</Text>
            <Text style={styles.statValue}>{children.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="heart" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Hamilelik Kayıtları</Text>
            <Text style={styles.statValue}>{pregnancies.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Büyüme Kayıtları</Text>
            <Text style={styles.statValue}>{growthRecords.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Günlük Kayıtları</Text>
            <Text style={styles.statValue}>{journalEntries.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="medical" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Aşı Kayıtları</Text>
            <Text style={styles.statValue}>{vaccineRecords.length}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Toplam Kayıt</Text>
            <Text style={styles.totalValue}>{totalRecords}</Text>
          </View>
        </Card>

        {/* Veri Yönetimi */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Veri Yönetimi</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleExportData}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="download-outline" size={24} color={colors.info} />
              <View>
                <Text style={styles.menuItemTitle}>Verileri Dışa Aktar</Text>
                <Text style={styles.menuItemSubtitle}>JSON formatında kaydet</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleClearData}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="trash-outline" size={24} color={colors.error} />
              <View>
                <Text style={[styles.menuItemTitle, { color: colors.error }]}>
                  Tüm Verileri Sil
                </Text>
                <Text style={styles.menuItemSubtitle}>Geri alınamaz!</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        {/* Hakkında */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => Alert.alert('Gizlilik Politikası', 'Tüm verileriniz cihazınızda güvenle saklanır. Hiçbir veri sunucularımıza gönderilmez.')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-checkmark-outline" size={24} color={colors.success} />
              <Text style={styles.menuItemTitle}>Gizlilik Politikası</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => Alert.alert('Kullanım Koşulları', 'Bu uygulama bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez.')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="document-text-outline" size={24} color={colors.info} />
              <Text style={styles.menuItemTitle}>Kullanım Koşulları</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => Alert.alert('Yardım', 'Sorularınız için: destek@minikadimlar.com')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
              <Text style={styles.menuItemTitle}>Yardım ve Destek</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        {/* Bildirimler */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              <View>
                <Text style={styles.menuItemTitle}>Bildirim Ayarları</Text>
                <Text style={styles.menuItemSubtitle}>Hatırlatıcıları yönet</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </Card>

        {/* Yakında Gelecek */}
        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingSoonTitle}>🚀 Yakında Gelecek Özellikler</Text>
          <View style={styles.featureItem}>
            <Ionicons name="moon" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Karanlık mod</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="cloud-upload" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Cloud yedekleme</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="language" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Dil seçimi</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="camera" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Fotoğraf albümü</Text>
          </View>
        </Card>

        {/* Sorumluluk Reddi */}
        <Card variant="outlined" style={styles.disclaimerCard}>
          <Ionicons name="information-circle" size={24} color={colors.warning} />
          <Text style={styles.disclaimerText}>
            Bu uygulama bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. 
            Sağlık konularında mutlaka doktorunuza danışın.
          </Text>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💕 Sevgiyle geliştirildi
          </Text>
          <Text style={styles.footerText}>
            © 2025 Minik Adımlar
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  heading: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  appInfoCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  appIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    fontSize: 48,
  },
  appName: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  appVersion: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  appDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  statLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  statValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuItemTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  menuItemSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  comingSoonCard: {
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  comingSoonTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  featureText: {
    ...typography.body,
    color: colors.textMuted,
  },
  disclaimerCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.warningLight,
    alignItems: 'center',
  },
  disclaimerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});

export default SettingsScreen;
