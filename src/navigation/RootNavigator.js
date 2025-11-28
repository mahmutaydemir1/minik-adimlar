import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import MainTabs from './MainTabs';
import { STACK_ROUTES } from './types';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACK_ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={STACK_ROUTES.MAIN} component={MainTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
