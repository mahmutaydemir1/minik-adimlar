import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import useAppStore from '../../store/appStore';
import { TAB_ROUTES } from '../../navigation/types';
import { colors, spacing, typography } from '../../constants/theme';

const formatAge = (date) => {
  const birth = dayjs(date);
  if (!birth.isValid()) return 'Bilinmiyor';
  const totalMonths = dayjs().diff(birth, 'month');
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years <= 0) return `${months} ay`;
  return `${years} yaş ${months} ay`;
};

const QuickActionCard = ({ icon, title, subtitle, onPress, color }) => (
  <Card onPress={onPress} variant="elevated" style={styles.quickAction}>
    <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.quickActionTitle}>{title}</Text>
    <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
  </Card>
);

const ChildOverviewScreen = () => {
  const navigation = useNavigation();
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const pregnancies = useAppStore((state) => state.pregnancies);
  const growthRecords = useAppStore((state) => state.growthRecords);

  const child = children.find((c) => c.id === selectedChildId);
  const activePregnancy = pregnancies[pregnancies.length - 1];

  const pregnancyInfo = useMemo(() => {
    if (!activePregnancy) return null;
    const lmp = dayjs(activePregnancy.lmpDate);
    const today = dayjs();
    const daysPregnant = today.diff(lmp, 'day');
    const weeksPregnant = Math.floor(daysPregnant / 7);
    return { weeksPregnant };
  }, [activePregnancy]);

  const lastGrowth = useMemo(() => {
    if (!child) return null;
    return growthRecords
      .filter((r) => r.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [growthRecords, selectedChildId, child]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Merhaba! 👋</Text>
        <Text style={styles.date}>{dayjs().format('DD MMMM YYYY')}</Text>
      </View>

      {activePregnancy && pregnancyInfo && (
        <Card 
          variant="elevated" 
          style={styles.pregnancyCard}
          onPress={() => navigation.navigate(TAB_ROUTES.PREGNANCY)}
        >
          <View style={styles.pregnancyHeader}>
            <Text style={styles.pregnancyIcon}>🤰</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.pregnancyTitle}>Hamilelik Takibi</Text>
              <Text style={styles.pregnancyWeek}>
                {pregnancyInfo.weeksPregnant}. Hafta
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
          </View>
        </Card>
      )}

      {child && (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => navigation.navigate(TAB_ROUTES.CHILDREN)}
        >
          <Card variant="elevated" style={styles.childCard}>
            <View style={styles.childHeader}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>
                  {child.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childAge}>{formatAge(child.birthDate)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
            </View>

            {lastGrowth && (
              <View style={styles.childStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Kilo</Text>
                  <Text style={styles.statValue}>
                    {lastGrowth.weightKg ? `${lastGrowth.weightKg} kg` : '-'}
                  </Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Boy</Text>
                  <Text style={styles.statValue}>
                    {lastGrowth.heightCm ? `${lastGrowth.heightCm} cm` : '-'}
                  </Text>
                </View>
              </View>
            )}
          </Card>
        </TouchableOpacity>
      )}

      {!child && !activePregnancy && (
        <Card variant="elevated" style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>👶</Text>
          <Text style={styles.emptyTitle}>Hoş Geldiniz!</Text>
          <Text style={styles.emptyText}>
            Başlamak için hamilelik bilgilerinizi veya çocuğunuzun bilgilerini ekleyin.
          </Text>
        </Card>
      )}

      <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
      <View style={styles.quickActionsGrid}>
        <QuickActionCard
          icon="star"
          title="Gelişim"
          subtitle="Kilometre taşları"
          color={colors.primary}
          onPress={() => navigation.navigate(TAB_ROUTES.MILESTONES)}
        />
        <QuickActionCard
          icon="medical"
          title="Aşılar"
          subtitle="Aşı takvimi"
          color={colors.secondary}
          onPress={() => navigation.navigate(TAB_ROUTES.VACCINES)}
        />
      </View>

      <Card variant="outlined" style={styles.infoCard}>
        <Text style={styles.infoIcon}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Önemli Not</Text>
          <Text style={styles.infoText}>
            Bu uygulama bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. 
            Sağlık konularında mutlaka doktorunuza danışın.
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
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  date: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  pregnancyCard: {
    backgroundColor: colors.primaryLight,
  },
  pregnancyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pregnancyIcon: {
    fontSize: 40,
  },
  pregnancyTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  pregnancyWeek: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  childCard: {
    gap: spacing.md,
  },
  childHeader: {
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
  },
  childName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  childAge: {
    ...typography.body,
    color: colors.textSecondary,
  },
  childStats: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  statValue: {
    ...typography.h4,
    color: colors.primary,
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
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  quickActionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  infoCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.infoLight,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default ChildOverviewScreen;
