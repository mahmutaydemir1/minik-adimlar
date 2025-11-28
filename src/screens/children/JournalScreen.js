import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import TextInputField from '../../components/TextInputField';
import DatePicker from '../../components/DatePicker';
import PrimaryButton from '../../components/PrimaryButton';
import ChildSelector from '../../components/ChildSelector';
import useAppStore from '../../store/appStore';
import { scheduleDailyJournalReminder } from '../../utils/notifications';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

const JournalScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const journalEntries = useAppStore((state) => state.journalEntries);
  const addJournalEntry = useAppStore((state) => state.addJournalEntry);
  const updateJournalEntry = useAppStore((state) => state.updateJournalEntry);
  const deleteJournalEntry = useAppStore((state) => state.deleteJournalEntry);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [note, setNote] = useState('');
  const [milestone, setMilestone] = useState('');
  
  const child = children.find((c) => c.id === selectedChildId);
  
  const entries = useMemo(() => {
    return journalEntries
      .filter((e) => e.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [journalEntries, selectedChildId]);

  // İlk yüklemede günlük hatırlatıcısı kur
  useEffect(() => {
    const setupReminder = async () => {
      const settings = useAppStore.getState().settings;
      if (settings?.journalReminders && settings?.notificationsEnabled) {
        try {
          await scheduleDailyJournalReminder();
        } catch (error) {
          console.error('Günlük hatırlatıcısı kurulamadı:', error);
        }
      }
    };
    setupReminder();
  }, []);

  const openAddModal = () => {
    setEditingEntry(null);
    setDate(dayjs().format('YYYY-MM-DD'));
    setNote('');
    setMilestone('');
    setModalVisible(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setDate(entry.date);
    setNote(entry.note || '');
    setMilestone(entry.milestone || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingEntry(null);
    setDate(dayjs().format('YYYY-MM-DD'));
    setNote('');
    setMilestone('');
  };

  const handleSave = () => {
    if (!selectedChildId) {
      Alert.alert('Çocuk seçilmedi', 'Lütfen önce bir çocuk seçin.');
      return;
    }
    
    if (!note && !milestone) {
      Alert.alert('Eksik bilgi', 'Lütfen not veya özel an girin.');
      return;
    }

    if (editingEntry) {
      updateJournalEntry(editingEntry.id, {
        date,
        note,
        milestone,
      });
      Alert.alert('Başarılı', 'Günlük kaydı güncellendi! ✅');
    } else {
      addJournalEntry({
        childId: selectedChildId,
        date,
        note,
        milestone,
      });
      Alert.alert('Başarılı', 'Günlük kaydı eklendi! 📝');
    }
    
    closeModal();
  };

  const handleDelete = (entryId) => {
    Alert.alert(
      'Kaydı Sil',
      'Bu günlük kaydını silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteJournalEntry(entryId);
            Alert.alert('Başarılı', 'Kayıt silindi.');
          },
        },
      ]
    );
  };

  if (!child) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.centerBox}>
          <Text style={styles.emptyIcon}>📔</Text>
          <Text style={styles.emptyText}>Günlük eklemek için önce bir çocuk seçin.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Günlük</Text>
          <Text style={styles.subheading}>{entries.length} kayıt</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectorContainer}>
        <ChildSelector />
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Card variant="elevated" style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>Henüz günlük kaydı yok</Text>
            <Text style={styles.emptyText}>
              Özel anları, gelişimleri ve günlük notları kaydedin.
            </Text>
            <PrimaryButton 
              title="İlk Kaydı Ekle" 
              onPress={openAddModal} 
              icon="➕"
              style={{ marginTop: spacing.md }}
            />
          </Card>
        }
        renderItem={({ item }) => (
          <Card style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryDate}>
                <Text style={styles.entryDateText}>{dayjs(item.date).format('DD')}</Text>
                <Text style={styles.entryMonthText}>{dayjs(item.date).format('MMM')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.entryDateFull}>
                  {dayjs(item.date).format('DD MMMM YYYY')}
                </Text>
                {item.milestone && (
                  <View style={styles.milestoneTag}>
                    <Ionicons name="star" size={14} color={colors.accent} />
                    <Text style={styles.milestoneText}>{item.milestone}</Text>
                  </View>
                )}
                {item.note && (
                  <Text style={styles.entryNote}>{item.note}</Text>
                )}
              </View>
            </View>
            <View style={styles.entryActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openEditModal(item)}
              >
                <Ionicons name="create-outline" size={18} color={colors.primary} />
                <Text style={styles.actionButtonText}>Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash-outline" size={18} color={colors.error} />
                <Text style={styles.deleteButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />

      {/* Add Modal */}
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
                  <Text style={styles.modalTitle}>
                    {editingEntry ? 'Günlük Kaydını Düzenle' : 'Yeni Günlük Kaydı'}
                  </Text>
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
                    label="Tarih"
                    value={date}
                    onChange={setDate}
                    placeholder="Tarih seçin"
                    icon="📅"
                    maximumDate={new Date()}
                  />

                  <TextInputField
                    label="Özel An (Opsiyonel)"
                    value={milestone}
                    onChangeText={setMilestone}
                    placeholder="Örn: İlk gülümseme, ilk adım..."
                    icon="⭐"
                    returnKeyType="next"
                  />

                  <TextInputField
                    label="Not"
                    value={note}
                    onChangeText={setNote}
                    placeholder="Bugün neler oldu?"
                    icon="📝"
                    multiline
                    numberOfLines={4}
                    returnKeyType="done"
                  />

                  <View style={styles.modalButtons}>
                    <PrimaryButton 
                      title="İptal" 
                      onPress={closeModal}
                      variant="outline"
                      style={{ flex: 1 }}
                    />
                    <PrimaryButton 
                      title={editingEntry ? 'Güncelle' : 'Kaydet'}
                      onPress={handleSave}
                      icon={editingEntry ? '✅' : '➕'}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  heading: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  subheading: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  addButton: {
    padding: spacing.xs,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
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
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  entryCard: {
    gap: spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  entryDate: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryDateText: {
    ...typography.h3,
    color: colors.accent,
    fontWeight: '700',
  },
  entryMonthText: {
    ...typography.caption,
    color: colors.accent,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  entryDateFull: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  milestoneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  milestoneText: {
    ...typography.bodySmall,
    color: colors.accent,
    fontWeight: '600',
  },
  entryNote: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  entryActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
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
    maxHeight: '85%',
    minHeight: 500,
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
  selectorContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
});

export default JournalScreen;
