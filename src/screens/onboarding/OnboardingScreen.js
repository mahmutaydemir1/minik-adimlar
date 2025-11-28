import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PrimaryButton from '../../components/PrimaryButton';
import Card from '../../components/Card';
import TextInputField from '../../components/TextInputField';
import DatePicker from '../../components/DatePicker';
import useAppStore from '../../store/appStore';
import { STACK_ROUTES } from '../../navigation/types';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

dayjs.extend(customParseFormat);

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [lmpDate, setLmpDate] = useState('');
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const addPregnancy = useAppStore((state) => state.addPregnancy);
  const addChild = useAppStore((state) => state.addChild);

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (lmpDate) {
        const dueDate = dayjs(lmpDate).add(280, 'day').format('YYYY-MM-DD');
        addPregnancy({ lmpDate, dueDate });
      }
      setStep(3);
    } else {
      if (childName && childBirthDate) {
        addChild({ name: childName, birthDate: childBirthDate });
      }
      navigation.replace(STACK_ROUTES.MAIN);
    }
  };

  const handleSkip = () => {
    if (step === 2) {
      setStep(3);
    } else {
      navigation.replace(STACK_ROUTES.MAIN);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <View style={styles.heroSection}>
              <Text style={styles.emoji}>👶💕</Text>
              <Text style={styles.title}>Minik Adımlar'a Hoş Geldiniz</Text>
            <Text style={styles.subtitle}>
              Hamilelik ve 0-6 yaş arası çocuk gelişimini takip etmek için tasarlanmış 
              kapsamlı bir rehber uygulaması.
            </Text>
          </View>

          <Card variant="elevated" style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤰</Text>
            <Text style={styles.featureTitle}>Hamilelik Takibi</Text>
            <Text style={styles.featureText}>
              Haftalık gelişim bilgileri, önemli kontroller ve öneriler
            </Text>
          </Card>

          <Card variant="elevated" style={styles.featureCard}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureTitle}>Gelişim Kilometre Taşları</Text>
            <Text style={styles.featureText}>
              Yaşa uygun gelişim beklentileri ve rehberlik
            </Text>
          </Card>

          <Card variant="elevated" style={styles.featureCard}>
            <Text style={styles.featureIcon}>💉</Text>
            <Text style={styles.featureTitle}>Aşı Takvimi</Text>
            <Text style={styles.featureText}>
              Türkiye aşı takvimine uygun hatırlatıcılar
            </Text>
          </Card>

          <PrimaryButton 
            title="Başlayalım" 
            onPress={handleContinue}
            icon="🚀"
            size="large"
          />
        </>
      )}

      {step === 2 && (
        <>
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Adım 2/3</Text>
            <Text style={styles.stepTitle}>Hamilelik Bilgileri</Text>
            <Text style={styles.stepSubtitle}>
              Hamileyseniz son adet tarihinizi girin. Değilseniz atlayabilirsiniz.
            </Text>
          </View>

          <Card variant="elevated" style={styles.inputCard}>
            <Text style={styles.cardIcon}>🤰</Text>
            <DatePicker
              label="Son Adet Tarihi (Opsiyonel)"
              placeholder="Tarih seçin"
              value={lmpDate}
              onChange={setLmpDate}
              icon="📅"
              maximumDate={new Date()}
              minimumDate={dayjs().subtract(10, 'month').toDate()}
            />
            <Text style={styles.hint}>
              Bu bilgi ile haftalık hamilelik takibi yapabilir, tahmini doğum tarihinizi öğrenebilirsiniz.
            </Text>
          </Card>

          <View style={styles.buttonRow}>
            <PrimaryButton 
              title="Atla" 
              onPress={handleSkip}
              variant="outline"
              style={{ flex: 1 }}
            />
            <PrimaryButton 
              title="Devam" 
              onPress={handleContinue}
              style={{ flex: 1 }}
            />
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Adım 3/3</Text>
            <Text style={styles.stepTitle}>Çocuk Bilgileri</Text>
            <Text style={styles.stepSubtitle}>
              Çocuğunuz varsa bilgilerini girin. Daha sonra da ekleyebilirsiniz.
            </Text>
          </View>

          <Card variant="elevated" style={styles.inputCard}>
            <Text style={styles.cardIcon}>👶</Text>
            <TextInputField
              label="Çocuğun Adı (Opsiyonel)"
              placeholder="Örn: Zeynep"
              value={childName}
              onChangeText={setChildName}
              icon="👶"
              returnKeyType="done"
            />
            <DatePicker
              label="Doğum Tarihi (Opsiyonel)"
              placeholder="Tarih seçin"
              value={childBirthDate}
              onChange={setChildBirthDate}
              icon="🎂"
              maximumDate={new Date()}
              minimumDate={dayjs().subtract(7, 'year').toDate()}
            />
            <Text style={styles.hint}>
              Bu bilgiler ile yaşa uygun gelişim takibi, aşı hatırlatıcıları ve öneriler alabilirsiniz.
            </Text>
          </Card>

          <View style={styles.buttonRow}>
            <PrimaryButton 
              title="Atla" 
              onPress={handleSkip}
              variant="outline"
              style={{ flex: 1 }}
            />
            <PrimaryButton 
              title="Tamamla" 
              onPress={handleContinue}
              icon="✅"
              style={{ flex: 1 }}
            />
          </View>
        </>
      )}

      <View style={styles.progressDots}>
        <View style={[styles.dot, step >= 1 && styles.dotActive]} />
        <View style={[styles.dot, step >= 2 && styles.dotActive]} />
        <View style={[styles.dot, step >= 3 && styles.dotActive]} />
      </View>
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
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  heroSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  featureCard: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  featureIcon: {
    fontSize: 40,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stepHeader: {
    gap: spacing.sm,
  },
  stepNumber: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  stepTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  stepSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  inputCard: {
    gap: spacing.md,
  },
  cardIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textMuted,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
});

export default OnboardingScreen;
