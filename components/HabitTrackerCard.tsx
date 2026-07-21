import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Habit = {
  label: string;
  completed: boolean;
};

type Props = {
  title: string;
  habits: Habit[];
};

export default function HabitTrackerCard({ title, habits }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.list}>
        {habits.map((habit, index) => (
          <View key={index} style={styles.habitRow}>
            <Ionicons
              name={habit.completed ? "checkmark-circle" : "ellipse-outline"}
              size={22}
              color={habit.completed ? Colors.light.tint : "#D1D5DB"}
            />
            <Text
              style={[
                styles.habitText,
                !habit.completed && styles.incompleteText,
              ]}
            >
              {habit.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.tint,
  },
  list: {
    gap: 24,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  habitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#101828",
  },
  incompleteText: {
    color: "#9CA3AF",
  },
});
