import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="n.square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="n.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Symptoms"
        options={{
          title: 'Symptoms tracking',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medical.thermometer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'Family and Health history',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medical.thermometer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Prep"
        options={{
          title: 'Appointment prep toolkit',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medical.thermometer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Exams"
        options={{
          title: 'Annual Eye Exam Records',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medical.thermometer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="DocFinder"
        options={{
          title: 'Doctor Finder',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="medical.thermometer" color={color} />,
        }}
      />
    </Tabs>
  );
}
