import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
};

export default function SmallBox({ title }: Props) {
  return (
    <TouchableOpacity style={styles.box}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
  },
});
