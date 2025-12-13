import { StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton } from "../../components/layouts/ScreenSkeleton"

export default function Prep() {
  return (
    <ScreenSkeleton>
      <View style={styles.content}>
        <Text style={styles.text}>Appointment prep toolkit (Blank)</Text>
      </View>
    </ScreenSkeleton>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
});
