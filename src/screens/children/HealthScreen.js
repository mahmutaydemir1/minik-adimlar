import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ChildSelector from '../../components/ChildSelector';
import DatePicker from '../../components/DatePicker';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';
import { scheduleDoctorReminder } from '../../utils/notifications';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const HealthScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const vaccineRecords = useAppStore((state) => state.vaccineRecords);
  const growthRecords = useAppStore((state) => state.growthRecords);
  const doctorAppointments = useAppStore((state) => state.doctorAppointments);
  const addDoctorAppointment = useAppStore((state) => state.addDoctorAppointment);
  const deleteDoctorAppointment = useAppStore((state) => state.deleteDoctorAppointment);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(dayjs().add(1, 'week').format('YYYY-MM-DD'));
  const [appointmentNote, setAppointmentNote] = useState('');
  
  const child = children.find((c) => c.id === selectedChildId);
  
  const upcomingAppointments = useMemo(() => {
    if (!selectedChildId) return [];
    return doctorAppointments
      .filter((a) => a.childId === selectedChildId && dayjs(a.date).isAfter(dayjs()))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [doctorAppointments, selectedChildId]);
  
  const completedVaccines = useMemo(() => {
    if (!selectedChildId) return 0;
    return vaccineRecords.filter((r) => r.childId === selectedChildId).length;
  }, [selectedChildId, vaccineRecords]);

  const lastGrowth = useMemo(() => {
    if (!selectedChildId) return null;
    return growthRecords
      .filter((r) => r.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [growthRecords, selectedChildId]);

  const ageInMonths = child ? dayjs().diff(dayjs(child.birthDate), 'month') : 0;
  const ageYears = Math.floor(ageInMonths / 12);
  const ageMonthsRemainder = ageInMonths % 12;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.heading}>Sağlık</Text>
          {child && (
            <Badge 
              text={ageYears > 0 ? `${ageYears} yaş ${ageMonthsRemainder} ay` : `${ageMonthsRemainder} ay`}
              variant="info" 
              size="large" 
              icon="👶" 
            />
          )}
        </View>

        <View style={styles.selectorContainer}>
          <ChildSelector />
        </View>

        {!child ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🏥</Text>
            <Text style={styles.emptyText}>Sağlık bilgilerini görmek için yukarıdan bir çocuk seçin.</Text>
          </Card>
        ) : (
          <>

        {/* Genel Bilgiler */}
        <Card variant="elevated" style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Genel Bilgiler</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <Text style={styles.infoLabel}>Doğum Tarihi:</Text>
            <Text style={styles.infoValue}>{dayjs(child.birthDate).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={20} color={colors.primary} />
            <Text style={styles.infoLabel}>Yaş:</Text>
            <Text style={styles.infoValue}>
              {ageYears > 0 ? `${ageYears} yaş ${ageMonthsRemainder} ay` : `${ageMonthsRemainder} ay`}
            </Text>
          </View>
        </Card>

        {/* Aşı Durumu */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="medical" size={24} color={colors.secondary} />
            <Text style={styles.cardTitle}>Aşı Durumu</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{completedVaccines}</Text>
              <Text style={styles.statLabel}>Tamamlanan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Toplam</Text>
            </View>
          </View>
          <Text style={styles.hint}>
            Aşı detayları için Aşılar sekmesine gidin.
          </Text>
        </Card>

        {/* Büyüme Durumu */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trending-up" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Son Ölçüm</Text>
          </View>
          {lastGrowth ? (
            <>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>
                    {lastGrowth.weightKg ? `${lastGrowth.weightKg}` : '-'}
                  </Text>
                  <Text style={styles.statLabel}>Kilo (kg)</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>
                    {lastGrowth.heightCm ? `${lastGrowth.heightCm}` : '-'}
                  </Text>
                  <Text style={styles.statLabel}>Boy (cm)</Text>
                </View>
              </View>
              <Text style={styles.hint}>
                Son ölçüm: {dayjs(lastGrowth.date).format('DD MMMM YYYY')}
              </Text>
            </>
          ) : (
            <Text style={styles.emptyText}>Henüz ölçüm kaydı yok.</Text>
          )}
        </Card>

        {/* Yaklaşan Kontroller */}
        <Card variant="outlined" style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={24} color={colors.accent} />
            <Text style={styles.cardTitle}>Yaklaşan Kontroller</Text>
          </View>
          <View style={styles.checkupItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.checkupText}>Düzenli doktor kontrolü</Text>
          </View>
          <View style={styles.checkupItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.checkupText}>Diş kontrolü (6 ayda bir)</Text>
          </View>
          <View style={styles.checkupItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.checkupText}>Göz kontrolü (yılda bir)</Text>
          </View>
        </Card>

        {/* Önemli Notlar */}
        <Card variant="elevated" style={styles.warningCard}>
          <Ionicons name="information-circle" size={32} color={colors.info} />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Önemli Hatırlatma</Text>
            <Text style={styles.warningText}>
              Bu uygulama bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. 
              Sağlık konularında mutlaka doktorunuza danışın.
            </Text>
          </View>
        </Card>

        {/* Doktor Randevuları */}
        <Card variant="elevated" style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={24} color={colors.accent} />
            <Text style={styles.cardTitle}>Doktor Randevuları</Text>
          </View>
          
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentItem}>
                <View style={styles.appointmentDate}>
                  <Text style={styles.appointmentDay}>{dayjs(appointment.date).format('DD')}</Text>
                  <Text style={styles.appointmentMonth}>{dayjs(appointment.date).format('MMM')}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.appointmentTitle}>
                    {dayjs(appointment.date).format('DD MMMM YYYY')}
                  </Text>
                  {appointment.note && (
                    <Text style={styles.appointmentNote}>{appointment.note}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Randevuyu Sil',
                      'Bu randevuyu silmek istediğinizden emin misiniz?',
                      [
                        { text: 'İptal', style: 'cancel' },
                        {
                          text: 'Sil',
                          style: 'destructive',
                          onPress: () => deleteDoctorAppointment(appointment.id),
                        },
                      ]
                    );
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Yaklaşan randevu yok</Text>
          )}
          
          <TouchableOpacity
            style={styles.addAppointmentButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={20} color={colors.primary} />
            <Text style={styles.addAppointmentText}>Randevu Ekle</Text>
          </TouchableOpacity>
        </Card>

        {/* Gelecek Özellikler */}
        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingSoonTitle}>🚀 Yakında Gelecek Özellikler</Text>
          <View style={styles.featureItem}>
            <Ionicons name="medkit" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Hastalık kayıtları</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="fitness" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>İlaç takibi</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="calendar" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Doktor randevuları</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="warning" size={18} color={colors.textMuted} />
            <Text style={styles.featureText}>Alerji takibi</Text>
          </View>
        </Card>
          </>
        )}
      </ScrollView>

      {/* Randevu Ekleme Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <ScrollView
              contentContainerStyle={styles.modalScroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Doktor Randevusu Ekle</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={28} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <DatePicker
                label="Randevu Tarihi"
                value={appointmentDate}
                onChange={setAppointmentDate}
                placeholder="Tarih seçin"
                icon="📅"
                minimumDate={new Date()}
              />

              <TextInputField
                label="Not (Opsiyonel)"
                value={appointmentNote}
                onChangeText={setAppointmentNote}
                placeholder="Örn: Kontrol muayenesi"
                icon="📝"
                multiline
                numberOfLines={3}
                returnKeyType="done"
              />

              <View style={styles.modalButtons}>
                <PrimaryButton
                  title="İptal"
                  onPress={() => setModalVisible(false)}
                  variant="outline"
                  style={{ flex: 1 }}
                />
                <PrimaryButton
                  title="Kaydet"
                  onPress={async () => {
                    if (!selectedChildId) {
                      Alert.alert('Hata', 'Lütfen önce bir çocuk seçin.');
                      return;
                    }
                    if (!appointmentDate) {
                      Alert.alert('Hata', 'Lütfen randevu tarihi seçin.');
                      return;
                    }

                    addDoctorAppointment({
                      childId: selectedChildId,
                      date: appointmentDate,
                      note: appointmentNote,
                    });

                    // Bildirim ayarları kontrol et ve hatırlatıcı ekle
                    const settings = useAppStore.getState().settings;
                    if (settings?.doctorReminders && settings?.notificationsEnabled) {
                      try {
                        await scheduleDoctorReminder(appointmentDate, child.name, appointmentNote);
                        Alert.alert('Başarılı', 'Randevu eklendi ve hatırlatıcı kuruldu! 🔔');
                      } catch (error) {
                        Alert.alert('Başarılı', 'Randevu eklendi! (Hatırlatıcı kurulamadı)');
                      }
                    } else {
                      Alert.alert('Başarılı', 'Randevu eklendi!');
                    }

                    setModalVisible(false);
                    setAppointmentNote('');
                    setAppointmentDate(dayjs().add(1, 'week').format('YYYY-MM-DD'));
                  }}
                  icon="✅"
                  style={{ flex: 1 }}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  header: {
    gap: spacing.md,
  },
  selectorContainer: {
    paddingBottom: spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  },
  heading: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoCard: {
    gap: spacing.md,
    backgroundColor: colors.primaryLight,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  card: {
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textMuted,
    lineHeight: 20,
  },
  checkupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  checkupText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  warningCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.infoLight,
  },
  warningTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  warningText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
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
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appointmentDate: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentDay: {
    ...typography.h4,
    color: colors.accent,
    fontWeight: '700',
  },
  appointmentMonth: {
    ...typography.caption,
    color: colors.accent,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  appointmentTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  appointmentNote: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addAppointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  addAppointmentText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '70%',
  },
  modalScroll: {
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});

export default HealthScreen;
