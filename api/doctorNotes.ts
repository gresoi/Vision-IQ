import { supabase } from "@/lib/supabase";

import type {
    Tables,
    TablesInsert,
    TablesUpdate,
} from "@/types/database.types";

export type DoctorNote = Tables<"doctor_notes">;

type DoctorNoteInsert = TablesInsert<"doctor_notes">;
type DoctorNoteUpdate = TablesUpdate<"doctor_notes">;

// get doctor notes for a specific appointment id
export async function getDoctorNotesByAppointmentId(
  appointment_id: string,
): Promise<DoctorNote[]> {
const { data, error } = await supabase
  .from("doctor_notes")
  .select("*")
  .eq("appointment_id", appointment_id)
  .order("created_at", {
    ascending: false,
  });
  if (error) throw error;
  return data;
}
