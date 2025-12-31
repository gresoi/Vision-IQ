import Card from "@/components/Card";
import Header from "@/components/Header";
import { ScreenSkeleton } from "@/components/ScreenSkeleton";
import SmallBox from "@/components/SmallBox";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScreenSkeleton>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Header name="User" />

        <Card
          title="Daily Eye Check"
          subtitle="Check how your eyes are feeling today"
          buttonText="Start Check"
          onPress={() => {}}
        />

        <Card
          title="Log Symptoms"
          subtitle="Track discomfort or changes"
          buttonText="Log Now"
          onPress={() => {}}
        />

        <Card
          title="Your Eye Health"
          subtitle="Screen time, recent trends"
          buttonText="See All"
          onPress={() => {}}
        />

        <Card
          title="Upcoming Appointments"
          subtitle="Your next scheduled visit"
          buttonText="See All"
          onPress={() => {}}
        />

        <Card
          title="Today's Tip"
          subtitle="Blink more often when using screens"
        />

        <View style={styles.row}>
          <SmallBox title="My Notes" />
          <SmallBox title="Symptom Tracker" />
        </View>

        <View style={styles.row}>
          <SmallBox title="Find Doctor" />
          <SmallBox title="Family History" />
        </View>

        <View style={styles.row}>
          <SmallBox title="Appointment Prep" />
          <SmallBox title="Exam Records" />
        </View>

        <Card
          title="Recent Exams"
          subtitle="View your recent eye exam results"
        />

      </ScrollView>
    </ScreenSkeleton>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
