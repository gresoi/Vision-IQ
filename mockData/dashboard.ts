import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export const dashboardMockData = {
  userStats: {
    appointmentsThisMonth: 2,
    symptomsLoggedThisWeek: 5,
    daysUntilNextExam: 12,
    healthScore: 85,
  },
  upcomingAppointments: [
    {
      id: "1",
      title: "Annual Eye Exam",
      date: "Dec 18, 2025 at 2:00 PM",
      doctor: "Dr. Sarah Johnson",
    },
  ],
  recentSymptoms: [
    {
      id: "1",
      symptom: "Mild eye strain",
      date: "Dec 12, 2025",
      eye: "Both",
    },
    {
      id: "2",
      symptom: "Dryness",
      date: "Dec 10, 2025",
      eye: "Left",
    },
  ],
  healthInsights: [
    {
      id: "1",
      title: "Screen time is up",
      message: "Try the 20-20-20 rule to reduce strain.",
    },
  ],
  hero: {
    title: "Great job,\nJane!",
    subtitle: "Your eyes are feeling super strong today! Keep going!",
    streakDays: 3,
    level: 5,
  },
  xpProgress: {
    currentXP: 1250,
    goalXP: 2000,
  },
  habits: {
    title: "Daily Vision Habits",
    items: [
      { label: "Screen breaks (3/3)", completed: true },
      { label: "Wore glasses today", completed: true },
      { label: "Eye exercises (0/2)", completed: false },
    ],
  },
  quests: {
    title: "Today's Quests",
    viewAll: "View All",
    items: [
      {
        id: "1",
        icon: "eye-outline" as IconName,
        title: "Blink Battle",
        description: "Rest your eyes for 2 minutes.",
        xp: 100,
        variant: "blue" as const,
      },
      {
        id: "2",
        icon: "glasses-outline" as IconName,
        title: "Glass Glimmer",
        description: "Clean your glasses for clear view!",
        xp: 50,
        variant: "orange" as const,
      },
      {
        id: "3",
        icon: "location-outline" as IconName,
        title: "Far-Away Find",
        description: "Look at something far away outside.",
        xp: 150,
        variant: "green" as const,
      },
    ],
  },
  weeklyStats: {
    title: "Weekly Super Vision",
    subtitle: "You've protected your eyes for 12 hours this week!",
    data: [
      { day: "M", value: 2 },
      { day: "T", value: 4 },
      { day: "W", value: 6 },
      { day: "T", value: 8 },
      { day: "F", value: 0 },
      { day: "S", value: 0 },
      { day: "S", value: 0 },
    ],
    maxValue: 8,
  },
};

export type DashboardData = typeof dashboardMockData;