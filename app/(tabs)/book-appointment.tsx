import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function BookAppointmentSkeleton() {
  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Page Title */}
        <Text style={styles.header}>Book Appointment</Text>

        {/* Appointment Type */}
        <Text style={styles.label}>Appointment Type</Text>
        <View style={styles.inputBox}><Text>Type here...</Text></View>

        {/* Preferred Doctor */}
        <Text style={styles.label}>Preferred Doctor</Text>
        <View style={styles.inputBox}><Text>Type here...</Text></View>

        {/* Preferred Date */}
        <Text style={styles.label}>Preferred Date</Text>
        <View style={styles.inputBox}><Text>Select date...</Text></View>

        {/* Mode Selection */}
        <Text style={styles.label}>Mode</Text>
        <View style={styles.optionsRow}>
          <View style={styles.optionBox}><Text>In Person</Text></View>
          <View style={styles.optionBox}><Text>Online</Text></View>
        </View>

        {/* Additional Notes */}
        <Text style={styles.label}>Additional Notes</Text>
        <View style={styles.notesBox}><Text>Type notes here...</Text></View>

        {/* Request Appointment Button */}
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request Appointment</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "500", marginTop: 16, marginBottom: 8 },
  inputBox: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  optionsRow: { flexDirection: "row", justifyContent: "space-between" },
  optionBox: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  notesBox: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 10,
    height: 100,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
