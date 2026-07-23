import { Tables } from "@/types/database.types";
import { Appointment, getUpcomingAppointment } from "./appointment";
import { getRecentExams } from "./examRecordDoctor";
import { getProfile, Profile } from "./profile";
import { type RecentExam } from "./examRecordDoctor";

export type ExamRecord = Tables<"exam_records">;
export type Symptom = Tables<"symptoms">;

export interface HomeData {
  user: Profile | null;
  screenTime: string;
  upcomingAppointment: Appointment | null;
  recentExams: RecentExam[];
  dailyTip: {
    title: string;
    description: string;
  };
}


export async function getHomeData(): Promise<HomeData> {

  const [
    profile,
    upcomingAppointment,
    recentExams,
    // visionTrend,
    // alreadyLoggedToday,
  ] = await Promise.all([
    getProfile(),
    getUpcomingAppointment(),
    getRecentExams(),
    // getVisionTrend(user.id),
    // hasLoggedSymptomsToday(user.id),
  ]);

  return {
    user: profile,
    // visionTrend,
    screenTime: "6.5 hours today", // Replace later
    upcomingAppointment,
    recentExams,
    // alreadyLoggedToday,
    // Could later come from DB
    dailyTip: {
      title: "20-20-20 Rule",
      description: "Every 20 minutes, look 20 feet away for 20 seconds.",
    },
  };
}

//vision trend
// async function getVisionTrend(userId: string): Promise<string> {
//   const { data, error } = await supabase
//     .from("symptoms")
//     .select("severity, created_at")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: false })
//     .limit(30);

//   if (error) throw error;

//   if (!data || data.length === 0) {
//     return "No symptom history";
//   }

//   const avg =
//     data.reduce((sum, item) => sum + (item.severity ?? 0), 0) /
//     data.length;

//   if (avg <= 2) return "Improving";
//   if (avg <= 4) return "Stable this month";

//   return "Needs attention";
// }

//Logged symptoms today?

// async function hasLoggedSymptomsToday(
//   userId: string
// ): Promise<boolean> {
//   const today = new Date().toISOString().split("T")[0];

//   const { data, error } = await supabase
//     .from("symptoms")
//     .select("id")
//     .eq("user_id", userId)
//     .gte("created_at", `${today}T00:00:00`)
//     .lte("created_at", `${today}T23:59:59`)
//     .limit(1);

//   if (error) throw error;

//   return (data?.length ?? 0) > 0;
// }
