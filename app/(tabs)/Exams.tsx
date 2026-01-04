import { StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton } from "../../components/layouts/ScreenSkeleton";

export default function Exams() {
  // TODO-API: FETCH_EXAM_RECORDS
  // Request: { userId }
  // Response: { exams[] with id, examType, examDate, doctorName, clinic, visionPrescription, diagnosis, recommendations, documentUrl, notes }
  
  return (
    <ScreenSkeleton>
      <View style={styles.content}>
        <Text style={styles.text}>Annual eye exams record (Blank)</Text>
      </View>
    </ScreenSkeleton>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
});
