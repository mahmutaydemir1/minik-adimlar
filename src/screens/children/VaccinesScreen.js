import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ChildSelector from '../../components/ChildSelector';
import useAppStore from '../../store/appStore';
import { vaccineSchedule, optionalVaccines } from '../../constants/vaccines';
import { colors, spacing, typography } from '../../constants/theme';

const VaccinesScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const vaccineRecords = useAppStore((state) => state.vaccineRecords);
  const toggleVaccine = useAppStore((state) => state.toggleVaccine);
  
  const child = children.find((c) => c.id === selectedChildId);
  
  const completedVaccines = useMemo(() => {
    if (!selectedChildId) return [];
    return vaccineRecords
      .filter((r) => r.childId === selectedChildId)
      .map((r) => r.vaccineId);
  }, [selectedChildId, vaccineRecords]);
  
  const ageInMonths = useMemo(() => {
    if (!child) return 0;
    return dayjs().diff(dayjs(child.birthDate), 'month');
  }, [child]);

  const vaccineStatus = useMemo(() => {
    return vaccineSchedule.map((vaccine) => ({
      ...vaccine,
      status: completedVaccines.includes(vaccine.id) 
        ? 'completed' 
        : vaccine.ageMonths <= ageInMonths 
        ? 'due' 
        : 'upcoming',
    }));
  }, [ageInMonths, completedVaccines]);

  const handleToggleVaccine = (vaccineId) => {
    if (!selectedChildId) return;
    toggleVaccine(selectedChildId, vaccineId);
  };

  const dueVaccines = child ? vaccineStatus.filter(v => v.status === 'due' && !completedVaccines.includes(v.id)) : [];
  const upcomingVaccines = child ? vaccineStatus.filter(v => v.status === 'upcoming') : [];
  const completedList = child ? vaccineStatus.filter(v => v.status === 'completed') : [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Aşı Takvimi</Text>
        {child && (
          <View style={styles.statsRow}>
            <Badge text={`${completedList.length} Tamamlandı`} variant="success" icon="✅" />
            <Badge text={`${dueVaccines.length} Bekliyor`} variant="warning" icon="⏰" />
          </View>
        )}
      </View>

      <View style={styles.selectorContainer}>
        <ChildSelector />
      </View>

      {!child ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>💉</Text>
          <Text style={styles.emptyText}>Aşı takviminizi görmek için yukarıdan bir çocuk seçin.</Text>
        </Card>
      ) : (
        <>

      {dueVaccines.length > 0 && (
        <Card variant="elevated" style={styles.alertCard}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Yapılması Gereken Aşılar</Text>
            <Text style={styles.alertText}>
              {dueVaccines.length} adet aşı zamanı geldi. Doktorunuza danışın.
            </Text>
          </View>
        </Card>
      )}

      <Text style={styles.sectionTitle}>Zorunlu Aşılar</Text>
      {vaccineStatus.map((vaccine) => (
        <Card 
          key={vaccine.id} 
          style={[
            styles.vaccineCard,
            vaccine.status === 'completed' && styles.completedCard,
          ]}
          onPress={() => vaccine.status !== 'upcoming' && handleToggleVaccine(vaccine.id)}
        >
          <View style={styles.vaccineHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vaccineName}>{vaccine.name}</Text>
              <Text style={styles.vaccineAge}>{vaccine.ageLabel}</Text>
            </View>
            <View style={styles.statusBadge}>
              {vaccine.status === 'completed' && <Text style={styles.statusIcon}>✅</Text>}
              {vaccine.status === 'due' && <Text style={styles.statusIcon}>⏰</Text>}
              {vaccine.status === 'upcoming' && <Text style={styles.statusIcon}>📅</Text>}
            </View>
          </View>
          <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
          {vaccine.important && (
            <Badge text="Önemli" variant="error" size="small" icon="⭐" />
          )}
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Opsiyonel Aşılar</Text>
      <Card variant="outlined">
        <Text style={styles.optionalInfo}>
          Bu aşılar zorunlu değildir ancak çocuğunuzu ek hastalıklardan korur. 
          Doktorunuzla görüşerek karar verebilirsiniz.
        </Text>
      </Card>
      
      {optionalVaccines.map((vaccine) => (
        <Card key={vaccine.id} style={styles.vaccineCard}>
          <View style={styles.vaccineHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.vaccineName}>{vaccine.name}</Text>
              <Text style={styles.vaccineAge}>{vaccine.ageRange}</Text>
            </View>
            {vaccine.seasonal && (
              <Badge text="Mevsimsel" variant="info" size="small" icon="🍂" />
            )}
          </View>
          <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
        </Card>
      ))}
          </>
        )}
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
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.warningLight,
  },
  alertIcon: {
    fontSize: 32,
  },
  alertTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  alertText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  vaccineCard: {
    gap: spacing.md,
  },
  completedCard: {
    opacity: 0.6,
    backgroundColor: colors.successLight,
  },
  vaccineHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  vaccineName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  vaccineAge: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  vaccineDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statusBadge: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    fontSize: 24,
  },
  optionalInfo: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});

export default VaccinesScreen;
