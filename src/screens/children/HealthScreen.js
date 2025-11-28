import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ChildSelector from '../../components/ChildSelector';
import useAppStore from '../../store/appStore';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const HealthScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const vaccineRecords = useAppStore((state) => state.vaccineRecords);
  const growthRecords = useAppStore((state) => state.growthRecords);
  
  const child = children.find((c) => c.id === selectedChildId);
  
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
});

export default HealthScreen;
