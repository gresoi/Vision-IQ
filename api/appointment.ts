import { supabase } from "@/lib/supabase";

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";


export type Appointment = Tables<"appointments">;

type AppointmentInsert = TablesInsert<"appointments">;
type AppointmentUpdate = TablesUpdate<"appointments">;

// CREATE APPOINTMENT
export async function createAppointment(
  appointment: Omit<
    AppointmentInsert,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      ...appointment,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// GET ALL APPOINTMENTS
export async function getAppointments() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", user.id)
    .order("appointment_date", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

// GET SINGLE APPOINTMENT
export async function getAppointment(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// UPDATE APPOINTMENT
export async function updateAppointment(
  id: string,
  updates: Omit<
    AppointmentUpdate,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// DELETE APPOINTMENT
export async function deleteAppointment(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}



