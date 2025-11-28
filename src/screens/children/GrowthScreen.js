import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Card from '../../components/Card';
import TextInputField from '../../components/TextInputField';
import DatePicker from '../../components/DatePicker';
import PrimaryButton from '../../components/PrimaryButton';
import ChildSelector from '../../components/ChildSelector';
import useAppStore from '../../store/appStore';
import { scheduleMonthlyGrowthReminder } from '../../utils/notifications';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

dayjs.extend(customParseFormat);

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GrowthScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const growthRecords = useAppStore((state) => state.growthRecords);
  const addGrowthRecord = useAppStore((state) => state.addGrowthRecord);
  const updateGrowthRecord = useAppStore((state) => state.updateGrowthRecord);
  const deleteGrowthRecord = useAppStore((state) => state.deleteGrowthRecord);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [activeTab, setActiveTab] = useState('weight'); // 'weight', 'height', 'head'

  const selectedChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId);
  }, [children, selectedChildId]);

  const records = useMemo(() => {
    return growthRecords
      .filter((r) => r.childId === selectedChildId)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Grafik için eskiden yeniye
  }, [growthRecords, selectedChildId]);

  const chartData = useMemo(() => {
    if (records.length === 0) return null;

    const labels = records.map((r) => dayjs(r.date).format('MMM'));
    const weightData = records.map((r) => r.weightKg || 0);
    const heightData = records.map((r) => r.heightCm || 0);
    const headData = records.map((r) => r.headCircumferenceCm || 0);

    return {
      weight: {
        labels: labels.slice(-6), // Son 6 ölçüm
        datasets: [{ data: weightData.slice(-6).length > 0 ? weightData.slice(-6) : [0] }],
      },
      height: {
        labels: labels.slice(-6),
        datasets: [{ data: heightData.slice(-6).length > 0 ? heightData.slice(-6) : [0] }],
      },
      head: {
        labels: labels.slice(-6),
        datasets: [{ data: headData.slice(-6).length > 0 ? headData.slice(-6) : [0] }],
      },
    };
  }, [records]);

  const latestRecord = useMemo(() => {
    return records.length > 0 ? records[records.length - 1] : null;
  }, [records]);

  const openAddModal = () => {
    setEditingRecord(null);
    setDate(dayjs().format('YYYY-MM-DD'));
    setWeight('');
    setHeight('');
    setHeadCircumference('');
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    setDate(record.date);
    setWeight(record.weightKg?.toString() || '');
    setHeight(record.heightCm?.toString() || '');
    setHeadCircumference(record.headCircumferenceCm?.toString() || '');
    setModalVisible(true);
  };

  // İlk yüklemede hatırlatıcı kur
  useEffect(() => {
    const setupReminder = async () => {
      const settings = useAppStore.getState().settings;
      if (selectedChild && settings?.growthReminders && settings?.notificationsEnabled) {
        try {
          await scheduleMonthlyGrowthReminder(selectedChild.name);
        } catch (error) {
          console.error('Büyüme hatırlatıcısı kurulamadı:', error);
        }
      }
    };
    setupReminder();
  }, [selectedChild]);

  const handleSave = () => {
    if (!selectedChildId) {
      Alert.alert('Çocuk seçilmedi', 'Lütfen önce bir çocuk seçin.');
      return;
    }
    if (!date) {
      Alert.alert('Tarih seçilmedi', 'Lütfen bir tarih seçin.');
      return;
    }
    const weightNumber = weight ? parseFloat(weight) : undefined;
    const heightNumber = height ? parseFloat(height) : undefined;
    const headNumber = headCircumference ? parseFloat(headCircumference) : undefined;
    
    if (!weightNumber && !heightNumber && !headNumber) {
      Alert.alert('Eksik bilgi', 'Lütfen en az bir ölçüm bilgisi girin.');
      return;
    }

    if (editingRecord) {
      updateGrowthRecord(editingRecord.id, {
        date,
        weightKg: weightNumber,
        heightCm: heightNumber,
        headCircumferenceCm: headNumber,
      });
      Alert.alert('Başarılı', 'Kayıt güncellendi! ✅');
    } else {
      addGrowthRecord({
        childId: selectedChildId,
        date,
        weightKg: weightNumber,
        heightCm: heightNumber,
        headCircumferenceCm: headNumber,
      });
      Alert.alert('Başarılı', 'Büyüme kaydı eklendi! 🎉');
    }
    
    setModalVisible(false);
  };

  const handleDelete = (recordId) => {
    Alert.alert(
      'Kaydı Sil',
      'Bu büyüme kaydını silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteGrowthRecord(recordId);
            Alert.alert('Başarılı', 'Kayıt silindi.');
          },
        },
      ]
    );
  };

  return (
    <>
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Büyüme Takibi</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Text style={styles.addButtonText}>+ Yeni Ölçüm</Text>
          </TouchableOpacity>
        </View>

        {/* Child Selector */}
        <View style={styles.selectorContainer}>
          <ChildSelector />
        </View>

        {!selectedChildId ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📏</Text>
            <Text style={styles.emptyText}>Büyüme kaydı eklemek için yukarıdan bir çocuk seçin.</Text>
          </Card>
        ) : (
          <>

        {/* Son Ölçümler */}
        {latestRecord && (
          <Card variant="elevated" style={styles.statsCard}>
            <Text style={styles.statsTitle}>Son Ölçümler</Text>
            <Text style={styles.statsDate}>{dayjs(latestRecord.date).format('DD MMMM YYYY')}</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>⚖️</Text>
                <Text style={styles.statValue}>{latestRecord.weightKg || '-'}</Text>
                <Text style={styles.statLabel}>kg</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>📏</Text>
                <Text style={styles.statValue}>{latestRecord.heightCm || '-'}</Text>
                <Text style={styles.statLabel}>cm</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🎯</Text>
                <Text style={styles.statValue}>{latestRecord.headCircumferenceCm || '-'}</Text>
                <Text style={styles.statLabel}>cm baş</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Grafik Sekmeleri */}
        {chartData && (
          <>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'weight' && styles.tabActive]}
                onPress={() => setActiveTab('weight')}
              >
                <Text style={[styles.tabText, activeTab === 'weight' && styles.tabTextActive]}>
                  Kilo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'height' && styles.tabActive]}
                onPress={() => setActiveTab('height')}
              >
                <Text style={[styles.tabText, activeTab === 'height' && styles.tabTextActive]}>
                  Boy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'head' && styles.tabActive]}
                onPress={() => setActiveTab('head')}
              >
                <Text style={[styles.tabText, activeTab === 'head' && styles.tabTextActive]}>
                  Baş Çevresi
                </Text>
              </TouchableOpacity>
            </View>

            <Card variant="elevated" style={styles.chartCard}>
              <Text style={styles.chartTitle}>
                {activeTab === 'weight' ? '⚖️ Kilo Grafiği' : activeTab === 'height' ? '📏 Boy Grafiği' : '🎯 Baş Çevresi Grafiği'}
              </Text>
              <LineChart
                data={chartData[activeTab]}
                width={SCREEN_WIDTH - spacing.lg * 4}
                height={220}
                chartConfig={{
                  backgroundColor: colors.white,
                  backgroundGradientFrom: colors.white,
                  backgroundGradientTo: colors.white,
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                  style: { borderRadius: borderRadius.lg },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: colors.primary,
                  },
                }}
                bezier
                style={styles.chart}
              />
            </Card>
          </>
        )}

        {/* Kayıtlar Listesi */}
        <View style={styles.recordsSection}>
          <Text style={styles.sectionTitle}>Tüm Kayıtlar</Text>
          {records.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>Henüz büyüme kaydı yok.</Text>
              <Text style={styles.emptySubtext}>Yukarıdaki butonu kullanarak ilk kaydınızı ekleyin.</Text>
            </Card>
          ) : (
            records.slice().reverse().map((item) => (
              <Card key={item.id} style={styles.recordCard}>
                <View style={styles.recordHeader}>
                  <View style={styles.recordDate}>
                    <Text style={styles.recordDateText}>{dayjs(item.date).format('DD')}</Text>
                    <Text style={styles.recordMonthText}>{dayjs(item.date).format('MMM')}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recordTitle}>{dayjs(item.date).format('DD MMMM YYYY')}</Text>
                    <View style={styles.recordValues}>
                      <View style={styles.valueItem}>
                        <Text style={styles.valueLabel}>Kilo</Text>
                        <Text style={styles.valueNumber}>
                          {item.weightKg ? `${item.weightKg} kg` : '-'}
                        </Text>
                      </View>
                      <View style={styles.valueDivider} />
                      <View style={styles.valueItem}>
                        <Text style={styles.valueLabel}>Boy</Text>
                        <Text style={styles.valueNumber}>
                          {item.heightCm ? `${item.heightCm} cm` : '-'}
                        </Text>
                      </View>
                      <View style={styles.valueDivider} />
                      <View style={styles.valueItem}>
                        <Text style={styles.valueLabel}>Baş</Text>
                        <Text style={styles.valueNumber}>
                          {item.headCircumferenceCm ? `${item.headCircumferenceCm} cm` : '-'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.recordActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openEditModal(item)}
                  >
                    <Text style={styles.actionButtonText}>✏️ Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️ Sil</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}
        </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>

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
              <Text style={styles.modalTitle}>
                {editingRecord ? 'Ölçümü Düzenle' : 'Yeni Ölçüm Ekle'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <DatePicker
              label="Tarih"
              value={date}
              onChange={setDate}
              placeholder="Tarih seçin"
              icon="📅"
              maximumDate={new Date()}
            />
            <TextInputField
              label="Kilo (kg)"
              value={weight}
              onChangeText={setWeight}
              placeholder="Örn. 12.5"
              keyboardType="decimal-pad"
              icon="⚖️"
              returnKeyType="next"
            />
            <TextInputField
              label="Boy (cm)"
              value={height}
              onChangeText={setHeight}
              placeholder="Örn. 90"
              keyboardType="numeric"
              icon="📏"
              returnKeyType="next"
            />
            <TextInputField
              label="Baş Çevresi (cm)"
              value={headCircumference}
              onChangeText={setHeadCircumference}
              placeholder="Örn. 48"
              keyboardType="numeric"
              icon="🎯"
              returnKeyType="done"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonPrimary} onPress={handleSave}>
                <Text style={styles.modalButtonPrimaryText}>
                  {editingRecord ? 'Güncelle' : 'Kaydet'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  selectorContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  heading: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  addButtonText: {
    ...typography.bodySmall,
    color: colors.white,
    fontWeight: '600',
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  statsDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statIcon: {
    fontSize: 32,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    ...shadows.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.white,
  },
  chartCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  chartTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  recordsSection: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  recordCard: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  recordHeader: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  recordDate: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordDateText: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  recordMonthText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  recordTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  recordValues: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  valueItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  valueDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  valueLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  valueNumber: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
  },
  recordActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: colors.error,
  },
  deleteButtonText: {
    ...typography.bodySmall,
    color: colors.error,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
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
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '90%',
    ...shadows.lg,
  },
  modalScroll: {
    padding: spacing.lg,
    gap: spacing.md,
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
    fontWeight: '600',
  },
  modalClose: {
    ...typography.h3,
    color: colors.textMuted,
    fontWeight: '300',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalButtonSecondary: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalButtonSecondaryText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  modalButtonPrimaryText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
});

export default GrowthScreen;
