import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ScreenContainer from '../../components/ScreenContainer';
import PrimaryButton from '../../components/PrimaryButton';
import TextInputField from '../../components/TextInputField';
import useAppStore from '../../store/appStore';
import { STACK_ROUTES } from '../../navigation/types';

dayjs.extend(customParseFormat);

const OnboardingScreen = ({ navigation }) => {
  const [lmpDate, setLmpDate] = useState('');
  const addPregnancy = useAppStore((state) => state.addPregnancy);

  const handleContinue = () => {
    if (lmpDate) {
      const parsed = dayjs(lmpDate, 'YYYY-MM-DD', true);
      if (parsed.isValid()) {
        const dueDate = parsed.add(280, 'day').format('YYYY-MM-DD');
        addPregnancy({ lmpDate: parsed.format('YYYY-MM-DD'), dueDate });
      }
    }
    navigation.replace(STACK_ROUTES.MAIN);
  };

  return (
    <ScreenContainer>
      <View style={styles.heroBox}>
        <Text style={styles.title}>Minik Adımlar'a Hoş Geldin</Text>
        <Text style={styles.subtitle}>
          Hamilelik ve 0-6 yaş gelişim takibini tek yerde topla. Başlamak için son adet
          tarihini girebilirsin veya direkt devam edebilirsin.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hamilelik Takibi (Opsiyonel)</Text>
        <TextInputField
          label="Son adet tarihi"
          placeholder="YYYY-MM-DD"
          value={lmpDate}
          onChangeText={setLmpDate}
        />
        <Text style={styles.hint}>Geçerli bir tarih girersen tahmini doğum tarihi hesaplanacak.</Text>
      </View>

      <PrimaryButton title="Devam et" onPress={handleContinue} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroBox: {
    backgroundColor: '#e0f2fe',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  hint: {
    fontSize: 14,
    color: '#475569',
  },
});

export default OnboardingScreen;
