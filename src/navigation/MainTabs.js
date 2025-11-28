import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChildrenScreen from '../screens/children/ChildrenScreen';
import ChildOverviewScreen from '../screens/children/ChildOverviewScreen';
import GrowthScreen from '../screens/children/GrowthScreen';
import HealthScreen from '../screens/children/HealthScreen';
import JournalScreen from '../screens/children/JournalScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { TAB_ROUTES } from './types';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen name={TAB_ROUTES.CHILDREN} component={ChildrenScreen} options={{ title: 'Çocuklar' }} />
      <Tab.Screen name={TAB_ROUTES.OVERVIEW} component={ChildOverviewScreen} options={{ title: 'Özet' }} />
      <Tab.Screen name={TAB_ROUTES.GROWTH} component={GrowthScreen} options={{ title: 'Büyüme' }} />
      <Tab.Screen name={TAB_ROUTES.HEALTH} component={HealthScreen} options={{ title: 'Sağlık' }} />
      <Tab.Screen name={TAB_ROUTES.JOURNAL} component={JournalScreen} options={{ title: 'Günlük' }} />
      <Tab.Screen name={TAB_ROUTES.SETTINGS} component={SettingsScreen} options={{ title: 'Ayarlar' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
