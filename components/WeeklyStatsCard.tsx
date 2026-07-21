import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

type DayData = {
  day: string;
  value: number;
};

type Props = {
  title: string;
  subtitle: string;
  data: DayData[];
  maxValue?: number;
};

const SHADES = [0.25, 0.45, 0.65, 1];

export default function WeeklyStatsCard({ title, subtitle, data, maxValue }: Props) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  const activeSorted = [...data]
    .map((d, i) => ({ ...d, index: i }))
    .filter((d) => d.value > 0)
    .sort((a, b) => a.value - b.value);

  const shadeByIndex: Record<number, number> = {};
  activeSorted.forEach((d, rank) => {
    const shadeIndex = Math.min(rank, SHADES.length - 1);
    shadeByIndex[d.index] = SHADES[shadeIndex];
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const isActive = item.value > 0;
          const heightPercent = (item.value / max) * 100;
          const opacity = shadeByIndex[index] ?? 1;

          return (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barWrap}>
                {isActive ? (
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${heightPercent}%`,
                        backgroundColor: Colors.light.tint,
                        opacity,
                      },
                    ]}
                  />
                ) : (
                  <View style={styles.emptyPill} />
                )}
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 48,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(255, 105, 0, 0.3)",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3335",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#5A6062",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: 112,
    paddingHorizontal: 8,
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
  },
  barWrap: {
    width: 24,
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  emptyPill: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
  },
});