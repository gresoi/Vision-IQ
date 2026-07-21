import { ScrollView, StyleSheet, View, Text } from "react-native";

import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import HeroCard from "@/components/HeroCard";
import XPProgressCard from "@/components/XPProgressCard";
import HabitTrackerCard from "@/components/HabitTrackerCard";
import QuestCard from "@/components/QuestCard";
import WeeklyStatsCard from "@/components/WeeklyStatsCard";
import { dashboardMockData } from "@/mockData/dashboard";
import { Colors } from "@/constants/theme";

export default function Dashboard() {
  // TODO-API: FETCH_DASHBOARD_DATA
  // Request: { userId }
  // Response: { userStats { appointmentsThisMonth, symptomsLoggedThisWeek, daysUntilNextExam, healthScore }, upcomingAppointments[], recentSymptoms[], healthInsights[] }

  const { hero, xpProgress, habits, quests, weeklyStats } = dashboardMockData;

  return (
    <ScreenSkeleton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Hero Section */}
        <HeroCard
          title={hero.title}
          subtitle={hero.subtitle}
          streakDays={hero.streakDays}
          level={hero.level}
        />

        {/* XP Progress */}
        <XPProgressCard
          currentXP={xpProgress.currentXP}
          goalXP={xpProgress.goalXP}
        />

        {/* Daily Vision Habits */}
        <HabitTrackerCard title={habits.title} habits={habits.items} />

        {/* Today's Quests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{quests.title}</Text>
          <Text style={styles.viewAll}>{quests.viewAll}</Text>
        </View>

        {quests.items.map((quest) => (
          <QuestCard
            key={quest.id}
            icon={quest.icon}
            title={quest.title}
            description={quest.description}
            xp={quest.xp}
            variant={quest.variant}
          />
        ))}

        {/* Weekly Stats */}
        <WeeklyStatsCard
          title={weeklyStats.title}
          subtitle={weeklyStats.subtitle}
          data={weeklyStats.data}
          maxValue={weeklyStats.maxValue}
        />
      </ScrollView>
    </ScreenSkeleton>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#101828",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.tint,
  },
});
