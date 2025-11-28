import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../constants/theme';

const Card = ({ 
  children, 
  style, 
  onPress, 
  variant = 'default', // default, elevated, outlined, gradient
  padding = 'medium', // none, small, medium, large
}) => {
  const cardStyle = [
    styles.card,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity 
        style={cardStyle} 
        onPress={onPress} 
        activeOpacity={0.8}
        activeScale={0.98}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  
  // Variants
  default: {
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  elevated: {
    ...shadows.lg,
    borderWidth: 0,
  },
  outlined: {
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.sm,
  },
  gradient: {
    borderWidth: 0,
    ...shadows.md,
  },
  
  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: spacing.md,
  },
  paddingMedium: {
    padding: spacing.lg,
  },
  paddingLarge: {
    padding: spacing.xl,
  },
});

export default Card;
