import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ChildSelector from '../../components/ChildSelector';
import useAppStore from '../../store/appStore';
import { developmentalMilestones } from '../../constants/milestones';
import { colors, spacing, typography } from '../../constants/theme';

const MilestonesScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  
  const child = children.find((c) => c.id === selectedChildId);
  
  const ageInMonths = useMemo(() => {
    if (!child) return 0;
    return dayjs().diff(dayjs(child.birthDate), 'month');
  }, [child]);
  
  const relevantMilestones = useMemo(() => {
    if (ageInMonths <= 3) return developmentalMilestones['0-3'];
    if (ageInMonths <= 6) return developmentalMilestones['4-6'];
    if (ageInMonths <= 12) return developmentalMilestones['7-12'];
    if (ageInMonths <= 24) return developmentalMilestones['12-24'];
    if (ageInMonths <= 36) return developmentalMilestones['24-36'];
    if (ageInMonths <= 48) return developmentalMilestones['36-48'];
    if (ageInMonths <= 60) return developmentalMilestones['48-60'];
    return developmentalMilestones['60-72'];
  }, [ageInMonths]);

  const groupedMilestones = child ? relevantMilestones.milestones.reduce((acc, milestone) => {
    if (!acc[milestone.category]) {
      acc[milestone.category] = [];
    }
    acc[milestone.category].push(milestone);
    return acc;
  }, {}) : {};

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Gelişim Kilometre Taşları</Text>
        {child && <Badge text={relevantMilestones.title} variant="info" size="large" icon="📅" />}
      </View>

      <View style={styles.selectorContainer}>
        <ChildSelector />
      </View>

      {!child ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={styles.emptyText}>Gelişim kilometre taşlarını görmek için yukarıdan bir çocuk seçin.</Text>
        </Card>
      ) : (
        <>

      <Card variant="elevated" style={styles.infoCard}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Her çocuk kendine özgü bir hızda gelişir. Bu kilometre taşları genel bir rehberdir. 
          Endişeleriniz varsa çocuk doktorunuza danışın.
        </Text>
      </Card>

      {Object.entries(groupedMilestones).map(([category, milestones]) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {milestones.map((milestone, index) => (
            <Card key={index} style={styles.milestoneCard}>
              <Text style={styles.milestoneIcon}>{milestone.icon}</Text>
              <Text style={styles.milestoneText}>{milestone.text}</Text>
            </Card>
          ))}
        </View>
      ))}

      <Card variant="outlined" style={styles.allMilestonesCard}>
        <Text style={styles.sectionTitle}>Tüm Yaş Grupları</Text>
        {Object.values(developmentalMilestones).map((group) => (
          <Badge 
            key={group.title} 
            text={group.title} 
            variant={group.title === relevantMilestones.title ? 'primary' : 'info'}
            size="medium"
            style={styles.ageGroupBadge}
          />
        ))}
      </Card>
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
  categorySection: {
    gap: spacing.md,
  },
  categoryTitle: {
    ...typography.h3,
    color: colors.primary,
  },
  milestoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  milestoneIcon: {
    fontSize: 28,
  },
  milestoneText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  allMilestonesCard: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  ageGroupBadge: {
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
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

export default MilestonesScreen;
