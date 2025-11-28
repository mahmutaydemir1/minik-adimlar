import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

const DatePicker = ({ 
  label, 
  value, // YYYY-MM-DD formatında string
  onChange, // (dateString) => void
  placeholder = 'Tarih seçin',
  icon = '📅',
  error = null,
  maximumDate = new Date(),
  minimumDate = null,
}) => {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // String'i Date objesine çevir
  const dateValue = value ? dayjs(value).toDate() : new Date();

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      onChange(formattedDate);
    }
  };

  const handlePress = () => {
    setShow(true);
    setIsFocused(true);
  };

  const handleClose = () => {
    setShow(false);
    setIsFocused(false);
  };

  const displayValue = value 
    ? dayjs(value).format('DD MMMM YYYY')
    : placeholder;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[
          styles.input,
          !value && styles.placeholder,
          icon && styles.inputWithIcon,
        ]}>
          {displayValue}
        </Text>
        <Ionicons 
          name="calendar-outline" 
          size={22} 
          color={colors.primary} 
          style={styles.calendarIcon}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <>
          {Platform.OS === 'ios' && (
            <View style={styles.iosPickerContainer}>
              <View style={styles.iosPickerHeader}>
                <TouchableOpacity onPress={handleClose}>
                  <Text style={styles.iosPickerButton}>Tamam</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={dateValue}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale="tr-TR"
                textColor={colors.textPrimary}
              />
            </View>
          )}
          
          {Platform.OS === 'android' && (
            <DateTimePicker
              value={dateValue}
              mode="date"
              display="default"
              onChange={handleChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          )}
        </>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
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
    fontSize: 22,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    ...typography.body,
    color: colors.textPrimary,
  },
  inputWithIcon: {
    paddingLeft: spacing.xxxl + spacing.lg,
  },
  placeholder: {
    color: colors.textLight,
  },
  calendarIcon: {
    marginRight: spacing.lg,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  iosPickerContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginTop: spacing.md,
    ...shadows.lg,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  iosPickerButton: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default DatePicker;
