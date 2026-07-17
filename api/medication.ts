import { supabase } from "@/lib/supabase";

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";

export type Medication = Tables<"medications">;

type MedicationInsert = TablesInsert<"medications">;
type MedicationUpdate = TablesUpdate<"medications">;

// CREATE MEDICATION
export async function createMedication(
  medication: Omit<
    MedicationInsert,
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
    .from("medications")
    .insert({
      ...medication,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// GET USER MEDICATIONS
export async function getMedications() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error)  throw error;

  return data;
}

// GET SINGLE MEDICATION
export async function getMedication(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// UPDATE MEDICATION
export async function updateMedication(
  id: string,
  updates: Omit<
    MedicationUpdate,
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
    .from("medications")
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

// DELETE MEDICATION
export async function deleteMedication(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("medications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}