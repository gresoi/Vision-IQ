import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
};

export default function Header({ name }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Good morning, {name}</Text>
        <Text style={styles.sub}>How are your eyes today?</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={26} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
  },
  sub: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
