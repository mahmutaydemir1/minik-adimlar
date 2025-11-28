import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

const TextInputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default', 
  multiline = false,
  error = null,
  icon = null,
  autoCapitalize = 'sentences',
  returnKeyType = 'done',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
      ]}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          style={[
            styles.input, 
            multiline && styles.multiline,
            icon && styles.inputWithIcon,
          ]}
          keyboardType={keyboardType}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          blurOnSubmit={!multiline}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing.sm,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.sm,
    transition: 'all 0.2s',
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    ...shadows.md,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  icon: {
    position: 'absolute',
    left: spacing.lg,
    top: multiline => multiline ? spacing.lg : '50%',
    transform: [{ translateY: -12 }],
    fontSize: 22,
    zIndex: 1,
  },
  input: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    ...typography.body,
    color: colors.textPrimary,
    minHeight: 48,
  },
  inputWithIcon: {
    paddingLeft: spacing.xxxl + spacing.lg,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.lg,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default TextInputField;
