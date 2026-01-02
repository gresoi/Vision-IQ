import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";


export default function LearnTips() {
  return (
    <ScreenSkeleton>
      <Text style={styles.header}>Learn & Tips</Text>
      <ScrollView style={styles.scroll}>
        {/* Example skeleton articles */}
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.articleCard}>
            <Image
              style={styles.image}
              source={{ uri: "https://via.placeholder.com/150" }}
            />
            <View style={styles.articleText}>
              <Text style={styles.title}>Article Title {i}</Text>
              <Text style={styles.readTime}>{i * 3} min read</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenSkeleton>
  );
}


const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  articleCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#FFF7F0",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: 80,
  },
  articleText: {
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  readTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
