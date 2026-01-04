import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function AppointmentsSkeleton() {
  // TODO-API: FETCH_UPCOMING_APPOINTMENTS
  // Request: { userId, status: "upcoming", limit }
  // Response: { appointments[] with id, appointmentType, doctorName, dateTime, location, visitType, status, meetingLink }
  
  return (
    <View style={styles.container}>
      <ScrollView>


        {/* Tabs */}
        <View style={styles.tabsRow}>
          <View style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Upcoming</Text>
          </View>
          <View style={styles.tab}>
            <Text>Past</Text>
          </View>
        </View>


        {/* Appointment 1 */}
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentTitle}>Session Name</Text>
          <Text>Dr. Name</Text>
          <Text>Date & Time</Text>
          <Text>Place</Text>
          <View style={styles.buttonRow}>
            <View style={styles.smallButton}><Text>Reschedule</Text></View>
            <View style={styles.smallButton}><Text>View Details</Text></View>
          </View>
        </View>


        {/* Appointment 2 */}
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentTitle}>Session Name</Text>
          <Text>Dr. Name</Text>
          <Text>Date & Time</Text>
          <Text>Place</Text>
          <View style={styles.buttonRow}>
            <View style={styles.smallButton}><Text>Reschedule</Text></View>
            <View style={styles.smallButton}><Text>View Details</Text></View>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
 
  // Tabs
  tabsRow: { flexDirection: "row", marginBottom: 16 },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#FF6A00",
  },
  activeTabText: { color: "#fff", fontWeight: "600" },


  // Appointment card
  appointmentCard: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  appointmentTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },


  // Buttons row
  buttonRow: { flexDirection: "row", marginTop: 8 },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
});
