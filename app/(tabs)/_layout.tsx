import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { Dashboard, History, Home, More, Symptoms } from "@/components/icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? "light"].tint;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 50 + insets.bottom,
          paddingTop: 2,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Home size={22} color={color} active={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Dashboard size={22} color={color} active={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Symptoms"
        options={{
          title: "Tracking",
          tabBarIcon: ({ color }) => <Symptoms size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="familyHealthHistory"
        options={{
          title: "Family",
          tabBarIcon: ({ color }) => <History size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <More size={22} color={color} />,
        }}
      />

      {/* Screens that exist in app/(tabs)/ but should NOT show as tab icons */}
      <Tabs.Screen name="Exams" options={{ href: null }} />
      <Tabs.Screen name="DocFinder" options={{ href: null }} />
      <Tabs.Screen name="appointments" options={{ href: null }} />
      <Tabs.Screen name="book-appointment" options={{ href: null }} />
      <Tabs.Screen name="Learning" options={{ href: null }} />
      <Tabs.Screen name="log-symptoms" options={{ href: null }} />
      <Tabs.Screen name="Logout" options={{ href: null }} />
      <Tabs.Screen name="LogSymptomsDetail" options={{ href: null }} />
      <Tabs.Screen name="LogSymptomsMain" options={{ href: null }} />
      <Tabs.Screen name="Profile" options={{ href: null }} />
    </Tabs>
  );
}
