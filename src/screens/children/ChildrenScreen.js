import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ScreenContainer from '../../components/ScreenContainer';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import useAppStore from '../../store/appStore';
import { TAB_ROUTES } from '../../navigation/types';

dayjs.extend(customParseFormat);

const ChildrenScreen = ({ navigation }) => {
  const children = useAppStore((state) => state.children);
  const addChild = useAppStore((state) => state.addChild);
  const selectChild = useAppStore((state) => state.selectChild);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const sortedChildren = useMemo(
    () => [...children].sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate)),
    [children]
  );

  const formatAge = (date) => {
    const birth = dayjs(date);
    if (!birth.isValid()) return 'Tarih yok';
    const totalMonths = dayjs().diff(birth, 'month');
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years <= 0) return `${months} ay`;
    return `${years} yaş ${months} ay`;
  };

  const handleAddChild = () => {
    if (!name || !birthDate) {
      Alert.alert('Eksik bilgi', 'Lütfen isim ve doğum tarihini girin.');
      return;
    }
    const parsed = dayjs(birthDate, 'YYYY-MM-DD', true);
    if (!parsed.isValid()) {
      Alert.alert('Geçersiz tarih', 'Tarihi YYYY-MM-DD formatında girin.');
      return;
    }
    addChild({ name, birthDate: parsed.format('YYYY-MM-DD') });
    setName('');
    setBirthDate('');
  };

  const renderChild = ({ item }) => (
    <TouchableOpacity
      style={styles.childCard}
      onPress={() => {
        selectChild(item.id);
        navigation.navigate(TAB_ROUTES.OVERVIEW);
      }}
    >
      <View>
        <Text style={styles.childName}>{item.name}</Text>
        <Text style={styles.childMeta}>Doğum: {item.birthDate}</Text>
      </View>
      <Text style={styles.ageTag}>{formatAge(item.birthDate)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer scrollable={false}>
      <Text style={styles.heading}>Çocuklar</Text>

      <FlatList
        data={sortedChildren}
        renderItem={renderChild}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>Henüz çocuk eklenmedi.</Text>}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Yeni çocuk ekle</Text>
        <TextInputField label="Ad" value={name} onChangeText={setName} placeholder="Örn. Ada" />
        <TextInputField
          label="Doğum tarihi"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="YYYY-MM-DD"
        />
        <PrimaryButton title="Ekle" onPress={handleAddChild} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginVertical: 8,
  },
  childCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  childMeta: {
    color: '#475569',
    marginTop: 4,
  },
  ageTag: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: '700',
  },
  card: {
    marginTop: 12,
    backgroundColor: '#fff',
    padding: 14,
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
});

export default ChildrenScreen;
