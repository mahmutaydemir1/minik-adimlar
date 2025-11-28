import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';

const HealthScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Sağlık</Text>
        <Text style={styles.body}>
          Bu ekranda ileride aşı takvimi, doktor randevuları ve sağlık kayıtları yer alacak.
        </Text>
        <Text style={styles.muted}>Şimdilik placeholder içerik.</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  body: {
    color: '#111827',
    lineHeight: 20,
  },
  muted: {
    color: '#6b7280',
  },
});

export default HealthScreen;
