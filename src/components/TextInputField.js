import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        style={[styles.input, multiline && styles.multiline]}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  label: {
    fontWeight: '700',
    color: '#0f172a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d7e2',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#0f172a',
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default TextInputField;
