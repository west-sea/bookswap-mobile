import { StyleSheet, TextInput } from "react-native";

export default function InputText(props) {
  return <TextInput style={styles.input} {...props} />;
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
