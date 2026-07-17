import { getAppointment, updateAppointment } from "@/api/appointment";
import {
  createMedication,
  deleteMedication,
  getMedications,
  Medication,
} from "@/api/medication";
import { getUserSymptoms, Symptom } from "@/api/symptoms";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppointmentPrepScreen() {
  //types
  type AppointmentQuestion = {
    id: string;
    question: string;
  };
  /* ------------------ STATES ------------------ */
  const [symptoms, setSymptoms] = useState<Symptom | null>(null);
  const [notes, setUserNotes] = useState([]); /// later removed from the database
  const [providerName, setProviderName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [place, setPlace] = useState("");
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [loadingmedication, setLoadingmedication] = useState(true);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");

  const [questions, setQuestions] = useState<AppointmentQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loadingAppointment, setLoadingAppointment] = useState(true);
  const [medications, setMedications] = useState<Medication[]>([]);
  // const { appointmentId } = useLocalSearchParams<{
  //   appointmentId: string;
  // }>();

  const appointmentId = "4988d069-b394-4359-bf6a-74d4d34aeb8f"; // for testing

  async function loadAppointment() {
    try {
      setLoadingAppointment(true);
      const appointment = await getAppointment(appointmentId);

      setQuestions(appointment.doctor_questions ?? []);
      setUserNotes(appointment.notes ?? []);
      setProviderName(appointment.provider_name);
      setAppointmentDate(appointment.appointment_date);
      setPlace(appointment.place);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load appointment.");
    } finally {
      setLoadingAppointment(false);
    }
  }
  async function loadSymptoms() {
    try {
      setLoadingSymptoms(true);
      const data = await getUserSymptoms();
      setSymptoms(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load symptoms.");
    } finally {
      setLoadingSymptoms(false);
    }
  }

  async function loadMedication() {
    try {
      setLoadingmedication(true);
      const data = await getMedications();
      setMedications(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load medications.");
    } finally {
      setLoadingmedication(false);
    }
  }

  const addQuestion = async () => {
    if (!newQuestion.trim()) return;

    const updatedQuestions = [
      ...questions,
      {
        id: Date.now().toString(),
        question: newQuestion.trim(),
      },
    ];

    try {
      setQuestions(updatedQuestions);
      await updateAppointment(appointmentId, {
        doctor_questions: updatedQuestions,
      });

      // Clear input
      setNewQuestion("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save question.");

      // Roll back UI if save fails
      setQuestions(questions);
    }
  };
  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const addMedication = async () => {
    if (!medicationName.trim()) {
      Alert.alert("Medication name is required");
      return;
    }

    try {
      const medication = await createMedication({
        name: medicationName.trim(),
        dosage: dosage.trim(),
        frequency: frequency.trim(),
      });

      setMedications((prev) => [...prev, medication]);

      setMedicationName("");
      setDosage("");
      setFrequency("");

      setShowMedicationModal(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add medication.");
    }
  };

  const removeMedication = async (id: string) => {
    try {
      await deleteMedication(id);

      setMedications((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete medication.");
    }
  };

  useEffect(() => {
    loadAppointment();
    loadSymptoms();
    loadMedication();
  }, []);

  /* ------------------ UI ------------------ */

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Appointment Prep</Text>
      <Text style={styles.subHeader}>Get ready for your visit</Text>

      {/* Appointment Card */}
      <View style={styles.cardOrange}>
        <Text style={styles.cardTitle}>Next Appointment</Text>
        <Text style={styles.cardBold}>
          {/* Annual Eye Exam with Dr. Sarah Johnson */}
          {notes}
        </Text>
        <View style={styles.rowBetween}>
          <Text style={styles.cardText}>{appointmentDate}</Text>
          <Text style={styles.cardText}>{place}</Text>
        </View>
      </View>

      {/* Symptoms */}
      <SectionHeader title="Symptoms to Discuss" />

      {symptoms?.symptoms.map((symptom: string, index: number) => (
        <View key={symptom} style={styles.card}>
          <Text style={styles.inputTitle}>{symptom}</Text>

          <Text>Affected Eye: {symptoms.affected_eye}</Text>

          <Text>
            {/* Severity: {symptoms.severity} */}
            Severity: {"severity"}
          </Text>

          {symptoms.notes ? <Text>Notes: {symptoms.notes}</Text> : null}
        </View>
      ))}
      {/* <AddButton label="Add Symptom" 
      onPress={addSymptom}
       /> */}

      {/* Questions */}
      <SectionHeader title="Questions for Doctor" />
      {questions.map((q) => (
        <View key={q.id} style={styles.rowInput}>
          <Ionicons name="ellipse-outline" size={18} color="#666" />
          <TextInput
            style={styles.questionInput}
            placeholder="Type your question"
            value={q.question}
            onChangeText={(t) =>
              setQuestions((prev) =>
                prev.map((item) =>
                  item.id === q.id ? { ...item, question: t } : item,
                ),
              )
            }
          />
          <TouchableOpacity onPress={() => removeQuestion(q.id)}>
            <Feather name="x" size={18} color="#999" />
          </TouchableOpacity>
        </View>
      ))}
      <TextInput
        placeholder="Add a question..."
        value={newQuestion}
        onChangeText={setNewQuestion}
      />
      {/* <TouchableOpacity onPress={addQuestion}>
        <Ionicons name="add" size={22} color="#fff" />
      </TouchableOpacity> */}
      <AddButton label="Add Question" onPress={addQuestion} />

      {/* Medications */}
      <SectionHeader title="Current Medications & Supplements" />
      {medications.map((m) => (
        <View key={m.id} style={styles.card}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Medication name"
            value={m.name}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, name: t } : item,
                ),
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={m.dosage || ""}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, dosage: t } : item,
                ),
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Frequency"
            value={m.frequency || ""}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, frequency: t } : item,
                ),
              )
            }
          />
          <TouchableOpacity onPress={() => removeMedication(m.id)}>
            <Ionicons name="trash-outline" size={20} color="#ff5a5a" />
          </TouchableOpacity>
        </View>
      ))}

      <AddButton
        label="Add Medication"
        onPress={() => setShowMedicationModal(true)}
      />

      {/* Footer Buttons */}
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Share Prep Summary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>Print Checklist</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />

      {/* Medication Modal */}
      <Modal visible={showMedicationModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Medication</Text>

            <TextInput
              placeholder="Medication Name"
              style={styles.modalInput}
              value={medicationName}
              onChangeText={setMedicationName}
            />

            <TextInput
              placeholder="Dosage"
              style={styles.modalInput}
              value={dosage}
              onChangeText={setDosage}
            />

            <TextInput
              placeholder="Frequency"
              style={styles.modalInput}
              value={frequency}
              onChangeText={setFrequency}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowMedicationModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={addMedication}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ------------------ REUSABLE COMPONENTS ------------------ */

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const AddButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.addBtn} onPress={onPress}>
    <MaterialIcons name="add-circle-outline" size={20} color="#ff6b00" />
    <Text style={styles.addText}>{label}</Text>
  </TouchableOpacity>
);

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb", padding: 16 },
  header: { fontSize: 22, fontWeight: "700" },
  subHeader: { color: "#777", marginBottom: 16 },

  cardOrange: {
    backgroundColor: "#ff6b00",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  cardTitle: { color: "#fff", opacity: 0.9 },
  cardBold: { color: "#fff", fontWeight: "700", marginVertical: 6 },
  cardText: { color: "#fff", fontSize: 12 },

  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  inputTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginBottom: 6,
    paddingVertical: 4,
  },

  severity: {
    backgroundColor: "#ffe5d0",
    color: "#ff6b00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },

  questionInput: {
    flex: 1,
    marginHorizontal: 8,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  addText: {
    marginLeft: 6,
    color: "#ff6b00",
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#ff6b00",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: { color: "#fff", fontWeight: "700" },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ff6b00",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: { color: "#ff6b00", fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },

  saveButton: {
    backgroundColor: "#ff6b00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
