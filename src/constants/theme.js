// Tasarım Sistemi - Renkler, Boyutlar, Tipografi

export const colors = {
  // Ana Renkler
  primary: '#FF6B9D',      // Pembe - Ana renk
  primaryLight: '#FFE5EE',  // Açık pembe
  primaryDark: '#E5527D',   // Koyu pembe
  
  secondary: '#4ECDC4',     // Turkuaz
  secondaryLight: '#E0F7F5',
  
  accent: '#FFD93D',        // Sarı
  accentLight: '#FFF8E1',
  
  // Nötr Renkler
  background: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  
  // Metin Renkleri
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textMuted: '#718096',
  textLight: '#A0AEC0',
  
  // Durum Renkleri
  success: '#48BB78',
  successLight: '#E6F9F0',
  warning: '#F6AD55',
  warningLight: '#FFF5E6',
  error: '#F56565',
  errorLight: '#FFF0F0',
  info: '#4299E1',
  infoLight: '#E6F2FF',
  
  // Özel Renkler
  pregnancy: '#9F7AEA',     // Hamilelik - Mor
  baby: '#63B3ED',          // Bebek - Mavi
  toddler: '#F6AD55',       // Yürümeye başlayan - Turuncu
  preschool: '#48BB78',     // Okul öncesi - Yeşil
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 15,
  },
};
