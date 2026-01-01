import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function SmallBox({ title, icon, color }: Props) {
  return (
    <View style={styles.box}>
      <View style={[styles.iconWrap, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
  },
});

