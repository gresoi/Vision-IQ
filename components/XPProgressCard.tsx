import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/theme";

type Props = {
  currentXP: number;
  goalXP: number;
  label?: string;
};

export default function XPProgressCard({ currentXP, goalXP, label = "EXPERIENCE POINTS" }: Props) {
  const progress = Math.min(currentXP / goalXP, 1);
  const remaining = goalXP - currentXP;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.xpRow}>
            <Text style={styles.currentXP}>{currentXP.toLocaleString()} </Text>
            <Text style={styles.xpUnit}>XP</Text>
          </View>
        </View>
        <Text style={styles.goal}>Goal: {goalXP.toLocaleString()}</Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={[Colors.light.tint, "#FFF3E9", "#FFFFFF"]}
          locations={[0, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${progress * 100}%` }]}
        />
      </View>
      <Text style={styles.remaining}>{remaining.toLocaleString()} XP until Level 6!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 48,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#64748B",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },
  currentXP: {
    fontSize: 48,
    fontWeight: "900",
    color: Colors.light.tint,
    lineHeight: 48,
  },
  xpUnit: {
    fontSize: 20,
    fontWeight: "900",
    color: "rgba(255, 105, 0, 0.4)",
    lineHeight: 28,
  },
  goal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 6,
  },
  track: {
    height: 40,
    backgroundColor: "#E5E7EB",
    borderRadius: 9999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 9999,
  },
  remaining: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.tint,
    textAlign: "center",
  },
});