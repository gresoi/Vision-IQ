import { supabase } from "@/lib/supabase";

import type { Tables } from "@/types/database.types";

export type ExamRecord = Tables<"exam_records">;
// type ExamRecordInsert = TablesInsert<"exam_records">;
// type ExamRecordUpdate = TablesUpdate<"exam_records">;
export interface RecentExam {
  id: string;
  diagnosis: string | null;
  created_at: string;
  doctor: {
    name: string;
  };
}

//Get exam record by appointment ID
export async function getExamRecordByAppointment(
  appointmentId: string
): Promise<ExamRecord | null> {
  const { data, error } = await supabase
    .from("exam_records")
    .select("*")
    .eq("appointment_id", appointmentId)
    .single();

  if (error) throw error;
  return data;
}

//get recent exam appointment  moved to another file
export async function getRecentExams(): Promise<RecentExam[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("3: user auth failed");
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("exam_records")
    .select(
      `
  id,
  diagnosis,
  created_at,
  doctor:doctors!exam_records_doctor_id_fkey(name),
  appointments!inner(user_id)
`,
    )
    .eq("appointments.user_id", user.id);

  if (error) throw error;

  return data.map((exam) => {
    const doctor = Array.isArray(exam.doctor) ? exam.doctor[0] : exam.doctor;
    return {
      id: exam.id,
      diagnosis: exam.diagnosis,
      created_at: exam.created_at,
      doctor: {
        name: doctor?.name ?? "Unknown Doctor",
      },
    };
  });
}

//Create exam record
// export async function createExamRecord(
//   examRecord: Omit<
//     ExamRecordInsert,
//     "id" | "created_at" | "updated_at"
//   >
// ): Promise<ExamRecord> {
//   const { data, error } = await supabase
//     .from("exam_records")
//     .insert(examRecord)
//     .select()
//     .single();

//   if (error) throw error;

//   return data;
// }

// Update exam record
// export async function updateExamRecord(
//   id: string,
//   updates: Omit<
//     ExamRecordUpdate,
//     "id" | "created_at" | "updated_at"
//   >
// ): Promise<ExamRecord> {
//   const { data, error } = await supabase
//     .from("exam_records")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw error;

//   return data;
// }
 
// Delete exam record
// export async function deleteExamRecord(id: string): Promise<void> {
//   const { error } = await supabase
//     .from("exam_records")
//     .delete()
//     .eq("id", id);

//   if (error) throw error;
// }