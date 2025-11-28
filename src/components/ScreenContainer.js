import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = ({ children, scrollable = true }) => {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Wrapper
        contentContainerStyle={styles.content}
        style={styles.flex}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </Wrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  inner: {
    gap: 14,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default ScreenContainer;
