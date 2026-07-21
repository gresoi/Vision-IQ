import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export type QuestVariant = "blue" | "orange" | "green";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  xp: number;
  variant?: QuestVariant;
};

const variantColors: Record<QuestVariant, { bg: string; badge: string; badgeText: string }> = {
  blue: {
    bg: "#EFF6FF",
    badge: "#2563EB",
    badgeText: "#F7F9FF",
  },
  orange: {
    bg: "#FFF7ED",
    badge: "#FFF7ED",
    badgeText: "#F54900",
  },
  green: {
    bg: "#F0FDF4",
    badge: "#16A34A",
    badgeText: "#DCFCE7",
  },
};

export default function QuestCard({
  icon,
  title,
  description,
  xp,
  variant = "blue",
}: Props) {
  const colors = variantColors[variant];

  return (
    <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
        <Ionicons name={icon} size={28} color={variant === "blue" ? "#155DFC" : variant === "orange" ? "#F54900" : "#00A63E"} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={[styles.badge, { backgroundColor: colors.badge }]}>
        <Text style={[styles.badgeText, { color: colors.badgeText }]}>{xp} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 48,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3335",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#5A6062",
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 9999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
