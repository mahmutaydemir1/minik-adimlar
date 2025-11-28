import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Card from '../../components/Card';
import TextInputField from '../../components/TextInputField';
import DatePicker from '../../components/DatePicker';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';
import { TAB_ROUTES } from '../../navigation/types';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

dayjs.extend(customParseFormat);

const ChildrenScreen = ({ navigation }) => {
  const children = useAppStore((state) => state.children);
  const addChild = useAppStore((state) => state.addChild);
  const updateChild = useAppStore((state) => state.updateChild);
  const deleteChild = useAppStore((state) => state.deleteChild);
  const selectChild = useAppStore((state) => state.selectChild);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const sortedChildren = useMemo(
    () => [...children].sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate)),
    [children]
  );

  const formatAge = (date) => {
    const birth = dayjs(date);
    if (!birth.isValid()) return 'Tarih yok';
    const totalMonths = dayjs().diff(birth, 'month');
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years <= 0) return `${months} ay`;
    return `${years} yaş ${months} ay`;
  };

  const openAddModal = () => {
    setEditingChild(null);
    setName('');
    setBirthDate('');
    setModalVisible(true);
  };

  const openEditModal = (child) => {
    setEditingChild(child);
    setName(child.name);
    setBirthDate(child.birthDate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingChild(null);
    setName('');
    setBirthDate('');
  };

  const handleSave = () => {
    if (!name || !birthDate) {
      Alert.alert('Eksik bilgi', 'Lütfen isim ve doğum tarihini girin.');
      return;
    }

    if (editingChild) {
      updateChild(editingChild.id, { name, birthDate });
      Alert.alert('Başarılı', `${name} güncellendi! ✅`);
    } else {
      addChild({ name, birthDate });
      Alert.alert('Başarılı', `${name} eklendi! 🎉`);
    }
    
    closeModal();
  };

  const handleDelete = (child) => {
    Alert.alert(
      'Çocuğu Sil',
      `${child.name} silinecek. Tüm büyüme kayıtları ve günlükler de silinecek. Emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteChild(child.id);
            Alert.alert('Silindi', `${child.name} silindi.`);
          },
        },
      ]
    );
  };

  const renderChild = ({ item }) => (
    <Card style={styles.childCard}>
      <TouchableOpacity
        style={styles.childContent}
        onPress={() => {
          selectChild(item.id);
          navigation.navigate(TAB_ROUTES.OVERVIEW);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.childAvatar}>
          <Text style={styles.childAvatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{item.name}</Text>
          <Text style={styles.childMeta}>
            {dayjs(item.birthDate).format('DD MMMM YYYY')}
          </Text>
          <View style={styles.ageTag}>
            <Text style={styles.ageTagText}>{formatAge(item.birthDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.childActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openEditModal(item)}
        >
          <Ionicons name="create-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item)}
        >
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.heading}>Çocuklar</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedChildren}
        renderItem={renderChild}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Card variant="elevated" style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>👶</Text>
            <Text style={styles.emptyTitle}>Henüz çocuk eklenmedi</Text>
            <Text style={styles.emptyText}>
              Sağ üstteki + butonuna tıklayarak ilk çocuğunuzu ekleyin.
            </Text>
            <PrimaryButton 
              title="Çocuk Ekle" 
              onPress={openAddModal} 
              icon="➕"
              style={{ marginTop: spacing.md }}
            />
          </Card>
        }
      />

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
                  <Text style={styles.modalTitle}>
                    {editingChild ? 'Çocuğu Düzenle' : 'Yeni Çocuk Ekle'}
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
                  <TextInputField 
                    label="Ad" 
                    value={name} 
                    onChangeText={setName} 
                    placeholder="Örn. Zeynep" 
                    icon="👶"
                    returnKeyType="done"
                  />
                  
                  <DatePicker
                    label="Doğum Tarihi"
                    value={birthDate}
                    onChange={setBirthDate}
                    placeholder="Tarih seçin"
                    icon="🎂"
                    maximumDate={new Date()}
                  />

                  <View style={styles.modalButtons}>
                    <PrimaryButton 
                      title="İptal" 
                      onPress={closeModal}
                      variant="outline"
                      style={{ flex: 1 }}
                    />
                    <PrimaryButton 
                      title={editingChild ? 'Güncelle' : 'Ekle'}
                      onPress={handleSave}
                      icon={editingChild ? '✅' : '➕'}
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
    backgroundColor: colors.background,
  },
  heading: {
    ...typography.h2,
    color: colors.textPrimary,
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
    textAlign: 'center',
    color: colors.textMuted,
    lineHeight: 24,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  childContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childAvatarText: {
    ...typography.h2,
    color: colors.surface,
    fontWeight: '700',
  },
  childInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  childName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  childMeta: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  ageTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  ageTagText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  childActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default ChildrenScreen;
