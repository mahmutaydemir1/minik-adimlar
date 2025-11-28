import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ScreenContainer from '../../components/ScreenContainer';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';

dayjs.extend(customParseFormat);

const GrowthScreen = () => {
  const selectedChildId = useAppStore((state) => state.selectedChildId);
  const growthRecords = useAppStore((state) => state.growthRecords);
  const addGrowthRecord = useAppStore((state) => state.addGrowthRecord);

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const records = useMemo(() => {
    return growthRecords
      .filter((r) => r.childId === selectedChildId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [growthRecords, selectedChildId]);

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
    const weightNumber = weight ? parseFloat(weight) : undefined;
    const heightNumber = height ? parseFloat(height) : undefined;
    addGrowthRecord({
      childId: selectedChildId,
      date: parsedDate.format('YYYY-MM-DD'),
      weightKg: weightNumber,
      heightCm: heightNumber,
    });
    setWeight('');
    setHeight('');
  };

  if (!selectedChildId) {
    return (
      <ScreenContainer>
        <View style={styles.centerBox}>
          <Text style={styles.muted}>Büyüme kaydı eklemek için önce bir çocuk seçin.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={false}>
      <Text style={styles.heading}>Büyüme Takibi</Text>

      <View style={styles.card}>
        <TextInputField label="Tarih" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
        <TextInputField
          label="Kilo (kg)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Örn. 12.5"
          keyboardType="decimal-pad"
        />
        <TextInputField
          label="Boy (cm)"
          value={height}
          onChangeText={setHeight}
          placeholder="Örn. 90"
          keyboardType="numeric"
        />
        <PrimaryButton title="Kaydet" onPress={handleSave} />
      </View>

      <Text style={styles.subHeading}>Son Kayıtlar</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={<Text style={styles.muted}>Henüz kayıt yok.</Text>}
        renderItem={({ item }) => (
          <View style={styles.recordCard}>
            <View>
              <Text style={styles.bold}>{item.date}</Text>
              <Text style={styles.muted}>{item.note || 'Not yok'}</Text>
            </View>
            <Text style={styles.valueText}>
              {item.weightKg ? `${item.weightKg} kg` : '-'} | {item.heightCm ? `${item.heightCm} cm` : '-'}
            </Text>
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
  recordCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '700',
    color: '#0f172a',
  },
  muted: {
    color: '#6b7280',
  },
  valueText: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GrowthScreen;
