import { View, StyleSheet } from "react-native";
import LoginCard from "../components/login-card";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LoginCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});
