import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/buttons/Button";
import ImageSelector from "../../components/input/ImageSelector";
import InputText from "../../components/input/InputText";
import { router } from "expo-router";

export default function BoardingPage() {
  const onBoardComplete = () => {
    router.push("/auth/welcome");
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        {/* Welcome text */}
        <View>
          <Text style={styles.text}>Welcome to BookSwap!</Text>
          <Text style={styles.text}>Let me know about you.</Text>
        </View>
        {/* Profile image selector */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Avatar</Text>
          <ImageSelector />
        </View>
        {/* Nickname input */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Nickname</Text>
          <InputText />
        </View>
        {/* Genre selector (conditionally rendered) */}
        {/* Next/Complete button */}
      </View>
      <View style={styles.button}>
        <Button label="Next" onPress={onBoardComplete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  text: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 32,
  },
  field: {
    textAlign: "left",
    width: "80%",
    gap: 8,
  },
  fieldLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginBottom: 50,
    alignItems: "center",
  },
});
