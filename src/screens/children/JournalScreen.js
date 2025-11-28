import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ScreenContainer from '../../components/ScreenContainer';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';

dayjs.extend(customParseFormat);

const JournalScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const journalEntries = useAppStore((state) => state.journalEntries);
  const addJournalEntry = useAppStore((state) => state.addJournalEntry);

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [note, setNote] = useState('');

  const entries = useMemo(() => {
    return journalEntries
      .filter((e) => e.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [journalEntries, selectedChildId]);

  const handleSave = () => {
    if (!selectedChildId) {
      Alert.alert('Çocuk seçilmedi', 'Lütfen önce bir çocuk seçin.');
      return;
    }
    const parsedDate = dayjs(date, 'YYYY-MM-DD', true);
    if (!parsedDate.isValid()) {
      Alert.alert('Geçersiz tarih', 'Tarihi YYYY-MM-DD formatında girin.');
      return;
    }
    addJournalEntry({
      childId: selectedChildId,
      date: parsedDate.format('YYYY-MM-DD'),
      note: note.trim(),
    });
    setNote('');
  };

  if (!selectedChildId) {
    return (
      <ScreenContainer>
        <View style={styles.centerBox}>
          <Text style={styles.muted}>Günlük eklemek için önce bir çocuk seçin.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={false}>
      <Text style={styles.heading}>Günlük</Text>

      <View style={styles.card}>
        <TextInputField label="Tarih" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
        <TextInputField
          label="Not"
          value={note}
          onChangeText={setNote}
          placeholder="Bugün neler oldu?"
          multiline
        />
        <PrimaryButton title="Kaydet" onPress={handleSave} />
      </View>

      <Text style={styles.subHeading}>Kayıtlar</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={<Text style={styles.muted}>Henüz günlük yok.</Text>}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.bold}>{item.date}</Text>
            <Text style={styles.bodyText}>{item.note || 'Not yok'}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
  },
  entryCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  bold: {
    fontWeight: '700',
    color: '#0f172a',
  },
  bodyText: {
    color: '#111827',
    lineHeight: 20,
  },
  muted: {
    color: '#6b7280',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default JournalScreen;
