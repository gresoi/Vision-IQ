import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Item = {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

type CardProps = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onPress?: () => void;
  rightText?: string;
  items?: Item[];
  variant?: "default" | "highlight";
};

export default function Card({
  title,
  subtitle,
  buttonText,
  onPress,
  rightText,
  items,
  variant = "default",
}: CardProps) {
  const highlight = variant === "highlight";

  return (
    <View style={[styles.card, highlight && styles.highlightCard]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, highlight && styles.white]}>
          {title}
        </Text>

        {rightText && (
          <Text style={[styles.viewAll, highlight && styles.lightWhite]}>
            {rightText}
          </Text>
        )}
      </View>

      {/* Subtitle */}
      {subtitle && (
        <Text style={[styles.subtitle, highlight && styles.lightWhite]}>
          {subtitle}
        </Text>
      )}

      {/* Items */}
      {items?.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={styles.itemLeft}>
            {item.icon && (
              <Ionicons
                name={item.icon}
                size={18}
                color="#F97316"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={styles.itemLabel}>{item.label}</Text>
          </View>
          <Text style={styles.itemValue}>{item.value}</Text>
        </View>
      ))}

      {/* Button */}
      {buttonText && onPress && (
        <TouchableOpacity
          style={[styles.button, highlight && styles.whiteBtn]}
          onPress={onPress}
        >
          <Text style={[styles.buttonText, highlight && styles.orange]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  highlightCard: {
    backgroundColor: "#FF7A00",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginVertical: 6,
  },
  viewAll: {
    fontSize: 13,
    color: "#F97316",
  },
  white: { color: "#FFFFFF" },
  lightWhite: { color: "#FFE7D1" },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  itemValue: {
    fontSize: 12,
    color: "#6B7280",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#F97316",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  whiteBtn: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  orange: {
    color: "#F97316",
  },
});
