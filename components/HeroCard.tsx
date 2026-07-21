import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

type Props = {
  title: string;
  subtitle: string;
  streakDays: number;
  level: number;
};

export default function HeroCard({ title, subtitle, streakDays, level }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.badges}>
        <View style={styles.badge}>
          <Ionicons name="flame" size={18} color={Colors.light.tint} />
          <Text style={styles.badgeText}>{streakDays}-day streak</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="star" size={18} color="#2563EB" />
          <Text style={styles.badgeText}>Level {level}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 48,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFF7ED",
    textAlign: "center",
    lineHeight: 45,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF7ED",
    textAlign: "center",
    lineHeight: 28,
    marginTop: 8,
  },
  badges: {
    marginTop: 20,
    gap: 12,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#101828",
  },
});
