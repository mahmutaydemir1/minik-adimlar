import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../constants/theme';

const Badge = ({ 
  text, 
  variant = 'primary', // primary, success, warning, info, error
  size = 'medium', // small, medium, large
  icon = null,
}) => {
  return (
    <View style={[styles.badge, styles[variant], styles[size]]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.text, styles[`${size}Text`]]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
    gap: 4,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primaryLight,
  },
  success: {
    backgroundColor: colors.successLight,
  },
  warning: {
    backgroundColor: colors.warningLight,
  },
  info: {
    backgroundColor: colors.infoLight,
  },
  error: {
    backgroundColor: colors.errorLight,
  },
  
  // Sizes
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  medium: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  large: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  mediumText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  largeText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  
  icon: {
    fontSize: 14,
  },
});

export default Badge;
