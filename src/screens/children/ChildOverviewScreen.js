import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import ScreenContainer from '../../components/ScreenContainer';
import useAppStore from '../../store/appStore';

const formatAge = (date) => {
  const birth = dayjs(date);
  if (!birth.isValid()) return 'Bilinmiyor';
  const totalMonths = dayjs().diff(birth, 'month');
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years <= 0) return `${months} ay`;
  return `${years} yaş ${months} ay`;
};

const ChildOverviewScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const children = useAppStore((state) => state.children);
  const growthRecords = useAppStore((state) => state.growthRecords);
  const journalEntries = useAppStore((state) => state.journalEntries);

  const child = children.find((c) => c.id === selectedChildId);

  const lastGrowth = useMemo(() => {
    return growthRecords
      .filter((r) => r.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [growthRecords, selectedChildId]);

  const lastJournal = useMemo(() => {
    return journalEntries
      .filter((e) => e.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [journalEntries, selectedChildId]);

  if (!child) {
    return (
      <ScreenContainer>
        <View style={styles.centerBox}>
          <Text style={styles.muted}>Lütfen önce Çocuklar sekmesinden bir çocuk seç.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.heading}>{child.name}</Text>
      <Text style={styles.subHeading}>Yaş: {formatAge(child.birthDate)}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Son Büyüme Kaydı</Text>
        {lastGrowth ? (
          <View style={styles.rowBetween}>
            <Text style={styles.bold}>{lastGrowth.date}</Text>
            <Text style={styles.muted}>
              {lastGrowth.weightKg ? `${lastGrowth.weightKg} kg` : '-'} | {lastGrowth.heightCm ? `${lastGrowth.heightCm} cm` : '-'}
            </Text>
          </View>
        ) : (
          <Text style={styles.muted}>Henüz kayıt yok.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Son Günlük</Text>
        {lastJournal ? (
          <View style={{ gap: 6 }}>
            <Text style={styles.bold}>{lastJournal.date}</Text>
            <Text style={styles.bodyText}>{lastJournal.note || 'Not eklenmemiş.'}</Text>
          </View>
        ) : (
          <Text style={styles.muted}>Henüz günlük eklenmedi.</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Bu uygulama tıbbi tavsiye vermez. Herhangi bir sağlık sorusunda profesyonel destek alın.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subHeading: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {
    fontWeight: '700',
    color: '#0f172a',
  },
  muted: {
    color: '#6b7280',
  },
  bodyText: {
    color: '#111827',
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoText: {
    color: '#334155',
    fontSize: 14,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChildOverviewScreen;
