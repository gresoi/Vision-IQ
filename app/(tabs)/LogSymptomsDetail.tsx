import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onClose?: () => void; // optional (tab or full screen)
};

const SYMPTOMS = [
  { label: "Dryness", icon: "water-outline", color: "#3B82F6" },
  { label: "Redness", icon: "alert-circle-outline", color: "#EF4444" },
  { label: "Pain", icon: "flash-outline", color: "#F97316" },
  { label: "Blurry Vision", icon: "eye-outline", color: "#8B5CF6" },
  { label: "Watery Eyes", icon: "water", color: "#06B6D4" },
  { label: "Light Sensitivity", icon: "weather-sunny", color: "#FACC15" },
];

const INTENSITY = ["Mild", "Moderate", "Severe"];

export default function LogSymptomsDetail({ onClose }: Props) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<"Mild" | "Moderate" | "Severe">(
    "Moderate"
  );
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    const payload = {
      symptoms: selectedSymptoms,
      intensity,
      notes,
      date: new Date(),
    };

    console.log("Saved Symptom Log:", payload);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Log Symptoms</Text>
          {onClose && (
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} />
            </TouchableOpacity>
          )}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Track your eye symptoms to help identify patterns and prepare for appointments.
          </Text>
        </View>

        {/* Symptoms */}
        <Text style={styles.sectionTitle}>What are you experiencing?</Text>
        <View style={styles.symptomGrid}>
          {SYMPTOMS.map((item) => {
            const active = selectedSymptoms.includes(item.label);
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => toggleSymptom(item.label)}
                style={[
                  styles.symptomBox,
                  active && styles.symptomActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={active ? "#F97316" : item.color}
                />
                <Text
                  style={[
                    styles.symptomText,
                    active && styles.symptomTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Intensity */}
        <Text style={styles.sectionTitle}>How intense is it?</Text>
        <View style={styles.intensityRow}>
          {INTENSITY.map((level) => {
            const active = intensity === level;
            return (
              <TouchableOpacity
                key={level}
                onPress={() => setIntensity(level as any)}
                style={[
                  styles.intensityChip,
                  active && styles.intensityActive,
                ]}
              >
                <Text
                  style={[
                    styles.intensityText,
                    active && styles.intensityTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={styles.sectionTitle}>Additional notes (optional)</Text>
        <TextInput
          placeholder="Any additional details? When did it start? What were you doing?"
          style={styles.notesInput}
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        {/* Save */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            selectedSymptoms.length === 0 && { opacity: 0.6 },
          ]}
          disabled={selectedSymptoms.length === 0}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save Symptom Log</Text>
        </TouchableOpacity>

        {/* Recent Logs */}
        <Text style={styles.sectionTitle}>Recent Logs</Text>

        <View style={styles.logCard}>
          <View style={styles.logHeader}>
            <MaterialCommunityIcons
              name="water-outline"
              size={18}
              color="#3B82F6"
            />
            <Text style={styles.logTitle}>Dryness</Text>
            <Text style={styles.logTime}>2 hours ago</Text>
          </View>
          <Text style={styles.logSub}>
            Moderate intensity · After 3 hours of screen time
          </Text>
        </View>

        <View style={styles.logCard}>
          <View style={styles.logHeader}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={18}
              color="#EF4444"
            />
            <Text style={styles.logTitle}>Redness</Text>
            <Text style={styles.logTime}>Yesterday</Text>
          </View>
          <Text style={styles.logSub}>Mild intensity</Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  infoText: {
    fontSize: 13,
    color: "#2563EB",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 16,
  },

  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  symptomBox: {
    width: "47%",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 12,
  },

  symptomActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
  },

  symptomText: {
    marginTop: 6,
    fontSize: 13,
    color: "#374151",
  },

  symptomTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },

  intensityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  intensityChip: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },

  intensityActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
  },

  intensityText: {
    fontSize: 13,
    color: "#374151",
  },

  intensityTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },

  notesInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
    textAlignVertical: "top",
  },

  saveBtn: {
    backgroundColor: "#FDBA74",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
  },

  saveText: {
    fontSize: 14,
    fontWeight: "600",
  },

  logCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },

  logHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logTitle: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },

  logTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  logSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
