import { StyleSheet, TextInput } from "react-native";

export default function InputText() {
  return <TextInput style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 100,
    fontSize: 16,
  },
});
