import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, borderRadius, typography, shadows } from '../constants/theme';

const PrimaryButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  icon = null,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.surface} />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    gap: 8,
    minHeight: 48,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary,
    ...shadows.lg,
  },
  secondary: {
    backgroundColor: colors.secondary,
    ...shadows.lg,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.sm,
  },
  
  // Sizes
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    ...typography.button,
    color: colors.surface,
    fontWeight: '700',
  },
  primaryText: {
    color: colors.surface,
  },
  secondaryText: {
    color: colors.surface,
  },
  outlineText: {
    color: colors.primary,
    fontWeight: '700',
  },
  
  smallText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mediumText: {
    fontSize: 16,
    fontWeight: '700',
  },
  largeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  
  icon: {
    fontSize: 22,
  },
});

export default PrimaryButton;
