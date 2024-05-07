import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function GradientBackground() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["rgb(17,155,134)", "rgb(64,178,80)"]}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: -1,
  },
});
