import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChildrenScreen from '../screens/children/ChildrenScreen';
import ChildOverviewScreen from '../screens/children/ChildOverviewScreen';
import MilestonesScreen from '../screens/children/MilestonesScreen';
import VaccinesScreen from '../screens/children/VaccinesScreen';
import GrowthScreen from '../screens/children/GrowthScreen';
import JournalScreen from '../screens/children/JournalScreen';
import HealthScreen from '../screens/children/HealthScreen';
import PregnancyScreen from '../screens/pregnancy/PregnancyScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { TAB_ROUTES } from './types';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name={TAB_ROUTES.OVERVIEW} 
        component={ChildOverviewScreen} 
        options={{ 
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.PREGNANCY} 
        component={PregnancyScreen} 
        options={{ 
          title: 'Hamilelik',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          tabBarButton: (props) => null, // Gizli - sadece navigasyon için
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.CHILDREN} 
        component={ChildrenScreen} 
        options={{ 
          title: 'Çocuklar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          tabBarButton: (props) => null, // Gizli - sadece navigasyon için
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.VACCINES} 
        component={VaccinesScreen} 
        options={{ 
          title: 'Aşılar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
          tabBarButton: (props) => null, // Gizli - sadece navigasyon için
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.GROWTH} 
        component={GrowthScreen} 
        options={{ 
          title: 'Büyüme',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
          tabBarButton: (props) => null, // Gizli - sadece navigasyon için
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.HEALTH} 
        component={HealthScreen} 
        options={{ 
          title: 'Sağlık',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.MILESTONES} 
        component={MilestonesScreen} 
        options={{ 
          title: 'Gelişim',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.JOURNAL} 
        component={JournalScreen} 
        options={{ 
          title: 'Günlük',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name={TAB_ROUTES.SETTINGS} 
        component={SettingsScreen} 
        options={{ 
          title: 'Ayarlar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
