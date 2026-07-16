export const mockAppointment = {
  id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",

  provider_name: "Dr. Sarah Johnson",

  appointment_date: "2026-07-20 10:30 AM",

  place: "Vision Eye Clinic",

  notes: [
    "Discuss worsening night vision",
    "Review current prescription"
  ],

  doctor_questions: [
    {
      id: "q1",
      question: "Has my vision changed since my last visit?"
    },
    {
      id: "q2",
      question: "Should I continue using my eye drops?"
    },
    {
      id: "q3",
      question: "Do I need a new prescription?"
    }
  ]
};
export const mockSymptoms = {
  id: "symptom-1",

  affected_eye: "Left Eye",

  severity: "Moderate",

  symptoms: [
    "Blurred Vision",
    "Eye Dryness",
    "Light Sensitivity",
    "Headaches"
  ],

  notes:
    "Symptoms are worse after working on a computer for long hours."
};
export const mockMedications = [
  {
    id: "med-1",

    name: "Refresh Tears",

    dosage: "1 Drop",

    frequency: "Twice Daily",

    created_at: "2026-07-12T09:15:00Z"
  },

  {
    id: "med-2",

    name: "Vitamin A",

    dosage: "5000 IU",

    frequency: "Once Daily",

    created_at: "2026-07-10T11:30:00Z"
  },

  {
    id: "med-3",

    name: "Artificial Tears",

    dosage: "2 Drops",

    frequency: "Every 4 Hours",

    created_at: "2026-07-08T14:20:00Z"
  }
];
