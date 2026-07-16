import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Prep, Exams, DocFinder } from '@/components/icons';

const ORANGE = '#FF6900'; // replace with your exact Figma hex if different
const INACTIVE_TEXT = '#99A1AF';

const ITEMS = [
  { key: 'appointments', label: 'Appointment Prep', Icon: Prep, route: '/AppointmentPrepScreen' as const },
  { key: 'exams', label: 'Eye Exam Records', Icon: Exams, route: '/Exams' as const },
  { key: 'docfinder', label: 'Doctor Finder', Icon: DocFinder, route: '/DocFinder' as const },
];

export default function MoreScreen() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <View style={styles.handle} />
        {ITEMS.map(({ key, label, Icon, route }, index) => {
          const isActive = pathname === route;

          return (
            <Pressable
              key={key}
              style={[
                styles.row,
                index === ITEMS.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => router.push(route)}
            >
              {({ pressed }) => {
                const color = isActive || pressed ? ORANGE : INACTIVE_TEXT;
                return (
                  <>
                    <Icon size={22} color={color} />
                    <Text style={[styles.label, { color }]}>{label}</Text>
                    <Text style={[styles.chevron, { color }]}>{'>'}</Text>
                  </>
                );
              }}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 18,
  },
});