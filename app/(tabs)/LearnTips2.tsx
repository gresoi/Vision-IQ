import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";


export default function LearnTips2() {
  return (
    <ScreenSkeleton>
      <Text style={styles.header}>Learn & Tips</Text>
     
      {/* Category Tabs */}
      <View style={styles.tabsRow}>
        {["All", "Screen Time", "Prevention", "Nutrition", "Sleep"].map((tab) => (
          <TouchableOpacity key={tab} style={tab === "Screen Time" ? styles.activeTab : styles.tab}>
            <Text style={tab === "Screen Time" ? styles.activeText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Daily Tip */}
      <View style={styles.dailyTip}>
        <Text style={styles.tipTitle}>Daily Tip Title</Text>
        <Text style={styles.tipDesc}>A short tip description goes here...</Text>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>


      {/* Featured Topics */}
      <View style={styles.featuredContainer}>
        {["Eye Exercises", "Eye Conditions", "Topic 3", "Topic 4"].map((topic) => (
          <View key={topic} style={styles.featuredBox}>
            <Text style={styles.featuredText}>{topic}</Text>
          </View>
        ))}
      </View>
    </ScreenSkeleton>
  );
}


const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FF6A00",
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: { color: "#6B7280", fontSize: 12 },
  activeText: { color: "#fff", fontSize: 12 },
  dailyTip: {
    backgroundColor: "#FF6A00",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  tipTitle: { fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 8 },
  tipDesc: { fontSize: 14, color: "#fff", marginBottom: 12 },
  learnMoreButton: { backgroundColor: "#fff", padding: 8, borderRadius: 12, alignSelf: "flex-start" },
  learnMoreText: { color: "#FF6A00", fontWeight: "600" },
  featuredContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featuredBox: {
    width: "48%",
    height: 80,
    backgroundColor: "#FFF7F0",
    borderRadius: 16,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredText: { fontSize: 14, fontWeight: "600" },
});



