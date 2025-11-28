import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import useAppStore from '../store/appStore';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

const ChildSelector = ({ style }) => {
  const children = useAppStore((state) => state.children);
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const selectChild = useAppStore((state) => state.selectChild);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  const formatAge = (date) => {
    const birth = dayjs(date);
    if (!birth.isValid()) return '';
    const totalMonths = dayjs().diff(birth, 'month');
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years <= 0) return `${months} ay`;
    return `${years} yaş ${months} ay`;
  };

  const handleSelect = (childId) => {
    selectChild(childId);
    setModalVisible(false);
  };

  if (children.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.selector, style]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        {selectedChild ? (
          <>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {selectedChild.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{selectedChild.name}</Text>
              <Text style={styles.age}>{formatAge(selectedChild.birthDate)}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.placeholder}>Çocuk Seçin</Text>
        )}
        <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Çocuk Seçin</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={28} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={children}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.childItem,
                      item.id === selectedChildId && styles.childItemSelected,
                    ]}
                    onPress={() => handleSelect(item.id)}
                  >
                    <View style={styles.childAvatar}>
                      <Text style={styles.childAvatarText}>
                        {item.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.childInfo}>
                      <Text style={styles.childName}>{item.name}</Text>
                      <Text style={styles.childAge}>{formatAge(item.birthDate)}</Text>
                    </View>
                    {item.id === selectedChildId && (
                      <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
              />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  age: {
    ...typography.caption,
    color: colors.textMuted,
  },
  placeholder: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '50%',
    paddingBottom: 34, // Tab bar için boşluk
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
  listContent: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  childItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  childItemSelected: {
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childAvatarText: {
    ...typography.h3,
    color: colors.white,
    fontWeight: '700',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  childAge: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

export default ChildSelector;
