import { supabase } from "@/lib/supabase";

import type {
  Tables,
  TablesInsert,
} from "@/types/database.types";

export type Symptom = Tables<"symptoms">;
type SymptomInsert = TablesInsert<"symptoms">;

// CREATE OR UPDATE USER SYMPTOMS
export async function saveSymptoms(
  symptoms: Omit<
    SymptomInsert,
    "id" | "user_id" | "created_at" | "recorded_at"
  >
) {
  const {
    data:{ user },
    error:userError
  } = await supabase.auth.getUser();
  if( userError || !user ){
    throw new Error("User not authenticated");
  }
  const {data,error}=await supabase
    .from("symptoms")
    .upsert(
      {
        ...symptoms,
        user_id:user.id,
      },
      {
        onConflict:"user_id"
      }
    )
    .select()
    .single();
  if(error){
    throw error;
  }
  return data;
}

// GET CURRENT USER SYMPTOMS
export async function getUserSymptoms(){
const {
data:{user},
error:userError
}=await supabase.auth.getUser();
if(userError || !user){
throw new Error("User not authenticated");
}
const {data,error}=await supabase
.from("symptoms")
.select("*")
.eq("user_id",user.id)
.maybeSingle();
if(error){
throw error;
}
return data;
}