import { getAppointment, updateAppointment } from "@/api/appointment";
import { DoctorNote, getDoctorNotesByAppointmentId } from "@/api/doctorNotes";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, Modal, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------------- TYPES ---------------- */
type UserNote = {
  id: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
};

/* ---------------- SCREEN ---------------- */
export default function AppointmentNotesScreen() {
  const [activeTab, setActiveTab] = useState<"USER" | "DOCTOR">("USER");

  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [doctorNotes, setDoctorNotes] = useState<DoctorNote[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [noteType, setNoteType] = useState<
    "Note" | "Question" | "Symptom" | "Reminder"
  >("Note");

  const [noteContent, setNoteContent] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  // const { appointmentId } = useLocalSearchParams<{
  //   appointmentId: string;
  // }>();
  const appointmentId = "4988d069-b394-4359-bf6a-74d4d34aeb8f"; // for testing
  const [loadingUserNotes, setLoadingUserNotes] = useState(false);
  const [loadingDoctorNotes, setLoadingDoctorNotes] = useState(false);

  /* ---------------- USER ACTIONS ---------------- */
  const addUserNote = async () => {
    if (!noteContent.trim()) {
      Alert.alert("Please enter a note.");
      return;
    }

    const newNote: UserNote = {
      id: Date.now().toString(),
      type: noteType,
      content: noteContent.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...userNotes];

    try {
      await updateAppointment(appointmentId, {
        user_notes: updatedNotes,
      });

      setUserNotes(updatedNotes);

      setNoteContent("");
      setNoteType("Note");
      setShowNoteModal(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add note.");
    }
  };

  const deleteUserNote = async (id: string) => {
    if (!appointmentId || Array.isArray(appointmentId)) {
      return;
    }

    const updatedNotes = userNotes.filter((note) => note.id !== id);

    try {
      await updateAppointment(appointmentId, {
        user_notes: updatedNotes,
      });

      setUserNotes(updatedNotes);

      if (editingId === id) {
        setEditingId(null);
        setEditingText("");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete note.");
    }
  };

  const saveEdit = async (id: string) => {
    if (!appointmentId || Array.isArray(appointmentId)) {
      return;
    }

    const updatedNotes = userNotes.map((note) =>
      note.id === id
        ? {
            ...note,
            content: editingText,
            updated_at: new Date().toISOString(),
          }
        : note,
    );

    try {
      await updateAppointment(appointmentId, {
        user_notes: updatedNotes,
      });

      setUserNotes(updatedNotes);
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update note.");
    }
  };
  /* ---------------- DOCTOR NOTES ---------------- */

  async function loadUserNotes() {
    try {
      setLoadingUserNotes(true);
      if (!appointmentId || Array.isArray(appointmentId)) return;
      const appointment = await getAppointment(appointmentId);

      setUserNotes(appointment.user_notes ?? []);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load appointment.");
    } finally {
      setLoadingUserNotes(false);
    }
  }

  async function loadDoctorNotes() {
    try {
      setLoadingDoctorNotes(true);
      if (!appointmentId || Array.isArray(appointmentId)) return;
      const doctorNotes = await getDoctorNotesByAppointmentId(appointmentId);
      setDoctorNotes(doctorNotes);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load doctor notes.");
    } finally {
      setLoadingDoctorNotes(false);
    }
  }

  useEffect(() => {
    loadUserNotes();
    loadDoctorNotes();
  }, []);
  /* ---------------- UI ---------------- */

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Appointment Notes</Text>
      <Text style={styles.subHeader}>Annual Eye Exam</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TabButton
          title="Your Notes"
          active={activeTab === "USER"}
          onPress={() => setActiveTab("USER")}
          type="USER"
        />

        <TabButton
          title="Doctor Notes"
          active={activeTab === "DOCTOR"}
          onPress={() => setActiveTab("DOCTOR")}
          type="DOCTOR"
        />
      </View>

      {/* ================= USER NOTES ================= */}
      {activeTab === "USER" && (
        <>
          <View style={styles.infoCardBlue}>
            <Text style={styles.infoTitle}>Your Personal Notes</Text>
            <Text style={styles.infoText}>
              Track symptoms, questions, and observations to discuss with your
              doctor. Only you can see and edit these notes.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowNoteModal(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color="#2563EB" />
            <Text style={styles.addText}>Add New Note</Text>
          </TouchableOpacity>

          {/* Loading */}
          {loadingUserNotes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.loadingText}>Loading your notes...</Text>
            </View>
          ) : userNotes.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="document-text-outline"
                size={48}
                color="#9CA3AF"
              />
              <Text style={styles.emptyTitle}>No Notes Yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap "Add New Note" to create your first appointment note.
              </Text>
            </View>
          ) : (
            userNotes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <View
                  style={[
                    styles.badge,
                    note.type === "Symptom" && styles.symptom,
                    note.type === "Question" && styles.question,
                    note.type === "Reminder" && styles.reminder,
                    note.type === "Note" && styles.noteBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      note.type === "Symptom" && styles.symptomText,
                      note.type === "Question" && styles.questionText,
                      note.type === "Reminder" && styles.reminderText,
                      note.type === "Note" && styles.noteBadgeText,
                    ]}
                  >
                    {note.type}
                  </Text>
                </View>

                <Text style={styles.date}>
                  {new Date(note.created_at).toLocaleString()}
                </Text>

                {editingId === note.id ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={editingText}
                      onChangeText={setEditingText}
                      multiline
                      autoFocus
                    />

                    <TouchableOpacity onPress={() => saveEdit(note.id)}>
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.noteText}>
                      {note.content || "Tap Edit to add note..."}
                    </Text>

                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        onPress={() => {
                          setEditingId(note.id);
                          setEditingText(note.content);
                        }}
                      >
                        <Text style={styles.editText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => deleteUserNote(note.id)}>
                        <Feather name="trash-2" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ))
          )}
        </>
      )}

      {/* ================= DOCTOR NOTES ================= */}
      {activeTab === "DOCTOR" && (
        <>
          <View style={styles.infoCardGreen}>
            <Text style={styles.infoTitleGreen}>
              Clinical Notes from Your Doctor
            </Text>

            <Text style={styles.infoTextGreen}>
              These notes are provided by your healthcare provider and contain
              diagnosis, prescriptions, and recommendations.
            </Text>
          </View>

          <View style={styles.infoCardYellow}>
            <Text style={styles.infoTextYellow}>
              Doctor notes are read-only. Contact your provider if you have
              questions.
            </Text>
          </View>

          {/* Loading */}
          {loadingDoctorNotes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#16A34A" />
              <Text style={styles.loadingText}>Loading doctor notes...</Text>
            </View>
          ) : doctorNotes.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="clipboard-outline" size={48} color="#9CA3AF" />

              <Text style={styles.emptyTitle}>No Doctor Notes</Text>

              <Text style={styles.emptySubtitle}>
                Your doctor hasn't added any clinical notes for this appointment
                yet.
              </Text>
            </View>
          ) : (
            doctorNotes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.date}>
                  {new Date(note.created_at).toLocaleString()}
                </Text>

                <Text style={styles.noteText}>{note.content}</Text>

                <Text style={styles.doctorName}>{note.doctor_name}</Text>
              </View>
            ))
          )}
        </>
      )}

      <View style={{ height: 40 }} />
      <Modal
        visible={showNoteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNoteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Note</Text>

            <Text style={styles.modalLabel}>Note Type</Text>

            <View style={styles.typeContainer}>
              {["Note", "Question", "Symptom", "Reminder"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    noteType === type && styles.typeButtonSelected,
                  ]}
                  onPress={() => setNoteType(type as any)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      noteType === type && styles.typeButtonTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.noteInput}
              placeholder="Write your note..."
              multiline
              numberOfLines={5}
              value={noteContent}
              onChangeText={setNoteContent}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowNoteModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={addUserNote}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ---------------- TAB COMPONENT ---------------- */

const TabButton = ({
  title,
  active,
  onPress,
  type,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
  type: "USER" | "DOCTOR";
}) => (
  <TouchableOpacity
    style={[
      styles.tabBtn,
      active &&
        (type === "USER" ? styles.tabActiveUser : styles.tabActiveDoctor),
    ]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  header: { fontSize: 22, fontWeight: "700" },
  subHeader: { color: "#6b7280", marginBottom: 16 },

  /* tabs */
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center" },
  tabActiveUser: { backgroundColor: "#2563eb" },
  tabActiveDoctor: { backgroundColor: "#16a34a" },
  tabText: { fontWeight: "600", color: "#6b7280" },
  tabTextActive: { color: "#fff" },

  /* info cards */
  infoCardBlue: {
    backgroundColor: "#e0f2fe",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  infoTitle: { fontWeight: "700", marginBottom: 4, color: "#0369a1" },
  infoText: { fontSize: 13, color: "#0369a1" },

  infoCardGreen: {
    backgroundColor: "#dcfce7",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  infoTitleGreen: { fontWeight: "700", color: "#166534", marginBottom: 4 },
  infoTextGreen: { fontSize: 13, color: "#166534" },

  infoCardYellow: {
    backgroundColor: "#fef3c7",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  infoTextYellow: { fontSize: 13, color: "#92400e" },

  /* add btn */
  addBtn: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  addText: { marginLeft: 6, color: "#2563eb", fontWeight: "600" },

  /* note card */
  noteCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  /* badge */
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "600" },
  symptom: { backgroundColor: "#fee2e2" },
  question: { backgroundColor: "#e0e7ff" },
  reminder: { backgroundColor: "#fef9c3" },
  symptomText: { color: "#dc2626" },
  questionText: { color: "#3730a3" },
  reminderText: { color: "#a16207" },

  date: { fontSize: 11, color: "#6b7280", marginBottom: 6 },
  noteText: { fontSize: 14, marginBottom: 8 },
  doctorName: { fontSize: 12, color: "#2563eb", fontWeight: "600" },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: { color: "#2563eb", fontWeight: "600" },
  saveText: { color: "#16a34a", fontWeight: "700" },

  editInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },

  noteBadge: {
    backgroundColor: "#F3F4F6",
  },

  noteBadgeText: {
    color: "#374151",
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
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

modalLabel: {
  fontWeight: "600",
  marginBottom: 8,
},

typeContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: 20,
},

typeButton: {
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 20,
  paddingHorizontal: 14,
  paddingVertical: 8,
  marginRight: 8,
  marginBottom: 8,
},

typeButtonSelected: {
  backgroundColor: "#2563EB",
  borderColor: "#2563EB",
},

typeButtonText: {
  color: "#374151",
},

typeButtonTextSelected: {
  color: "#fff",
  fontWeight: "600",
},

noteInput: {
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 10,
  padding: 12,
  minHeight: 120,
  textAlignVertical: "top",
  marginBottom: 20,
},

modalButtons: {
  flexDirection: "row",
  justifyContent: "flex-end",
},

cancelButton: {
  paddingHorizontal: 20,
  paddingVertical: 10,
  marginRight: 10,
},

saveButton: {
  backgroundColor: "#2563EB",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
},
});
