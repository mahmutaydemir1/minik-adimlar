import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';

const SettingsScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Uygulama Hakkında</Text>
        <Text style={styles.body}>Minik Adımlar, hamilelikten 6 yaşa kadar gelişimi takip etmen için tasarlandı.</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Önemli Uyarı</Text>
        <Text style={styles.infoText}>
          Bu uygulama tıbbi tavsiye vermez. Sağlıkla ilgili tüm konularda profesyonel destek alın.
        </Text>
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
  infoBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  infoText: {
    color: '#334155',
    lineHeight: 20,
  },
});

export default SettingsScreen;
