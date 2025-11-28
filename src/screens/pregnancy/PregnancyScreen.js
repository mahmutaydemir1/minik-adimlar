import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import DatePicker from '../../components/DatePicker';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';
import { pregnancyWeeks } from '../../constants/milestones';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

const PregnancyScreen = () => {
  const pregnancies = useAppStore((state) => state.pregnancies);
  const addPregnancy = useAppStore((state) => state.addPregnancy);
  const updatePregnancy = useAppStore((state) => state.updatePregnancy);
  const deletePregnancy = useAppStore((state) => state.deletePregnancy);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [lmpDate, setLmpDate] = useState('');
  
  const activePregnancy = pregnancies[pregnancies.length - 1];

  const openAddModal = () => {
    setLmpDate('');
    setModalVisible(true);
  };

  const openEditModal = () => {
    setLmpDate(activePregnancy.lmpDate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setLmpDate('');
  };

  const handleSave = () => {
    if (!lmpDate) {
      Alert.alert('Eksik bilgi', 'Lütfen son adet tarihini seçin.');
      return;
    }

    const dueDate = dayjs(lmpDate).add(280, 'day').format('YYYY-MM-DD');

    if (activePregnancy) {
      updatePregnancy(activePregnancy.id, { lmpDate, dueDate });
      Alert.alert('Başarılı', 'Hamilelik bilgileri güncellendi! ✅');
    } else {
      addPregnancy({ lmpDate, dueDate });
      Alert.alert('Başarılı', 'Hamilelik kaydı eklendi! 🎉');
    }
    
    closeModal();
  };

  const handleDelete = () => {
    Alert.alert(
      'Hamilelik Kaydını Sil',
      'Hamilelik kaydı silinecek. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deletePregnancy(activePregnancy.id);
            Alert.alert('Silindi', 'Hamilelik kaydı silindi.');
          },
        },
      ]
    );
  };
  
  const pregnancyInfo = useMemo(() => {
    if (!activePregnancy) return null;
    
    const lmp = dayjs(activePregnancy.lmpDate);
    const today = dayjs();
    const daysPregnant = today.diff(lmp, 'day');
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const daysInWeek = daysPregnant % 7;
    const dueDate = dayjs(activePregnancy.dueDate);
    const daysUntilDue = dueDate.diff(today, 'day');
    
    return {
      weeksPregnant,
      daysInWeek,
      daysUntilDue,
      dueDate: dueDate.format('DD MMMM YYYY'),
      trimester: weeksPregnant <= 12 ? 1 : weeksPregnant <= 26 ? 2 : 3,
    };
  }, [activePregnancy]);

  if (!activePregnancy) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Card variant="elevated" style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🤰</Text>
            <Text style={styles.emptyTitle}>Hamilelik Takibi</Text>
            <Text style={styles.emptyText}>
              Henüz hamilelik kaydı eklenmemiş. Son adet tarihinizi girerek hamilelik takibine başlayın.
            </Text>
            <PrimaryButton 
              title="Hamilelik Ekle" 
              onPress={openAddModal} 
              icon="➕"
              style={{ marginTop: spacing.md }}
            />
          </Card>
        </ScrollView>

        {/* Add/Edit Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <KeyboardAvoidingView 
            style={styles.modalOverlay}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <TouchableOpacity 
              style={styles.modalOverlayTouchable}
              activeOpacity={1}
              onPress={closeModal}
            >
              <TouchableOpacity 
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Hamilelik Bilgileri</Text>
                    <TouchableOpacity onPress={closeModal}>
                      <Ionicons name="close-circle" size={28} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView 
                    style={styles.modalScroll}
                    contentContainerStyle={styles.modalScrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                  >
                    <DatePicker
                      label="Son Adet Tarihi"
                      value={lmpDate}
                      onChange={setLmpDate}
                      placeholder="Tarih seçin"
                      icon="📅"
                      maximumDate={new Date()}
                      minimumDate={dayjs().subtract(10, 'month').toDate()}
                    />

                    <Text style={styles.hint}>
                      Son adet tarihinize göre tahmini doğum tarihi ve haftalık gelişim bilgileri hesaplanacak.
                    </Text>

                    <View style={styles.modalButtons}>
                      <PrimaryButton 
                        title="İptal" 
                        onPress={closeModal}
                        variant="outline"
                        style={{ flex: 1 }}
                      />
                      <PrimaryButton 
                        title="Kaydet"
                        onPress={handleSave}
                        icon="✅"
                        style={{ flex: 1 }}
                      />
                    </View>
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    );
  }

  const currentWeekInfo = pregnancyWeeks[pregnancyInfo.weeksPregnant] || pregnancyWeeks[40];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hamilelik Takibi</Text>
            <Badge 
              text={`${pregnancyInfo.trimester}. Trimester`} 
              variant="primary" 
              size="large" 
              icon="🤰" 
            />
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={openEditModal}>
              <Ionicons name="create-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>

      <Card variant="elevated" style={styles.weekCard}>
        <View style={styles.weekHeader}>
          <Text style={styles.weekNumber}>{pregnancyInfo.weeksPregnant}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.weekLabel}>Hafta</Text>
            <Text style={styles.weekDays}>+ {pregnancyInfo.daysInWeek} gün</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(pregnancyInfo.weeksPregnant / 40) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          Tahmini doğum tarihine {pregnancyInfo.daysUntilDue} gün kaldı
        </Text>
      </Card>

      <Card style={styles.dueDateCard}>
        <Text style={styles.dueDateLabel}>Tahmini Doğum Tarihi</Text>
        <Text style={styles.dueDateValue}>{pregnancyInfo.dueDate}</Text>
      </Card>

      {currentWeekInfo && (
        <>
          <Card variant="elevated" style={styles.babyCard}>
            <Text style={styles.sectionTitle}>Bebeğinizin Gelişimi</Text>
            <View style={styles.babySizeRow}>
              <Text style={styles.babySizeIcon}>👶</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.babySizeLabel}>Boyut</Text>
                <Text style={styles.babySizeValue}>{currentWeekInfo.babySize}</Text>
                <Text style={styles.babyLength}>Yaklaşık {currentWeekInfo.babyLength}</Text>
              </View>
            </View>
            <Text style={styles.babyDevelopment}>{currentWeekInfo.babyDevelopment}</Text>
          </Card>

          <Card style={styles.tipsCard}>
            <Text style={styles.sectionTitle}>Bu Hafta İçin Öneriler</Text>
            {currentWeekInfo.motherTips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </Card>
        </>
      )}

      <Card variant="outlined" style={styles.infoCard}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Bu bilgiler genel rehberlik amaçlıdır. Düzenli doktor kontrollerinizi aksatmayın 
          ve herhangi bir endişeniz olduğunda doktorunuza danışın.
        </Text>
      </Card>

      <Card style={styles.milestonesCard}>
        <Text style={styles.sectionTitle}>Önemli Kontroller</Text>
        <View style={styles.checkupRow}>
          <Text style={styles.checkupIcon}>🏥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.checkupTitle}>İlk Trimester Taraması</Text>
            <Text style={styles.checkupWeek}>11-14. hafta</Text>
          </View>
        </View>
        <View style={styles.checkupRow}>
          <Text style={styles.checkupIcon}>🔬</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.checkupTitle}>Anomali Taraması</Text>
            <Text style={styles.checkupWeek}>18-22. hafta</Text>
          </View>
        </View>
        <View style={styles.checkupRow}>
          <Text style={styles.checkupIcon}>🩺</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.checkupTitle}>Glikoz Yükleme Testi</Text>
            <Text style={styles.checkupWeek}>24-28. hafta</Text>
          </View>
        </View>
      </Card>
    </ScrollView>

    {/* Add/Edit Modal */}
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <KeyboardAvoidingView 
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity 
          style={styles.modalOverlayTouchable}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Hamilelik Bilgilerini Düzenle</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close-circle" size={28} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.modalScroll}
                contentContainerStyle={styles.modalScrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <DatePicker
                  label="Son Adet Tarihi"
                  value={lmpDate}
                  onChange={setLmpDate}
                  placeholder="Tarih seçin"
                  icon="📅"
                  maximumDate={new Date()}
                  minimumDate={dayjs().subtract(10, 'month').toDate()}
                />

                <Text style={styles.hint}>
                  Son adet tarihinize göre tahmini doğum tarihi ve haftalık gelişim bilgileri hesaplanacak.
                </Text>

                <View style={styles.modalButtons}>
                  <PrimaryButton 
                    title="İptal" 
                    onPress={closeModal}
                    variant="outline"
                    style={{ flex: 1 }}
                  />
                  <PrimaryButton 
                    title="Güncelle"
                    onPress={handleSave}
                    icon="✅"
                    style={{ flex: 1 }}
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  weekCard: {
    backgroundColor: colors.primaryLight,
    gap: spacing.md,
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  weekNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.primary,
  },
  weekLabel: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  weekDays: {
    ...typography.body,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  dueDateCard: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dueDateLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  dueDateValue: {
    ...typography.h3,
    color: colors.primary,
  },
  babyCard: {
    gap: spacing.md,
    backgroundColor: colors.secondaryLight,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  babySizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  babySizeIcon: {
    fontSize: 48,
  },
  babySizeLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  babySizeValue: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  babyLength: {
    ...typography.caption,
    color: colors.textMuted,
  },
  babyDevelopment: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  tipsCard: {
    gap: spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  tipBullet: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  tipText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 24,
  },
  infoCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.infoLight,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  milestonesCard: {
    gap: spacing.md,
  },
  checkupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  checkupIcon: {
    fontSize: 32,
  },
  checkupTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  checkupWeek: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  emptyCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlayTouchable: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '75%',
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalScrollContent: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textMuted,
    lineHeight: 20,
  },
});

export default PregnancyScreen;
