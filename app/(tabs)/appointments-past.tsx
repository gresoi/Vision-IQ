import { ScrollView, View, Text, StyleSheet } from "react-native";


export default function AppointmentsPastSkeleton() {
  return (
    <View style={styles.container}>
      <ScrollView>


        {/* Tab label */}
        <View style={styles.tabContainer}>
          <View style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Past</Text>
          </View>
        </View>


        {/* Completed Appointment 1 */}
        <View style={styles.appointmentCard}>
          <Text style={styles.completedLabel}>Completed</Text>
          <Text style={styles.appointmentTitle}>Session Name</Text>
          <Text>Dr. Name</Text>
          <Text>Date & Time</Text>
          <Text>Place</Text>
          <View style={styles.buttonRow}>
            <View style={styles.summaryButton}><Text>Show Summary</Text></View>
          </View>
        </View>


        {/* Completed Appointment 2 */}
        <View style={styles.appointmentCard}>
          <Text style={styles.completedLabel}>Completed</Text>
          <Text style={styles.appointmentTitle}>Session Name</Text>
          <Text>Dr. Name</Text>
          <Text>Date & Time</Text>
          <Text>Place</Text>
          <View style={styles.buttonRow}>
            <View style={styles.summaryButton}><Text>Show Summary</Text></View>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },


  // Tab
  tabContainer: { flexDirection: "row", marginBottom: 16 },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    marginHorizontal: 4,
  },
  activeTab: { backgroundColor: "#4CAF50" }, // green highlight
  activeTabText: { color: "#fff", fontWeight: "600" },


  // Appointment card
  appointmentCard: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  completedLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },
  appointmentTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },


  // Button
  buttonRow: { flexDirection: "row", marginTop: 8 },
  summaryButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
});
