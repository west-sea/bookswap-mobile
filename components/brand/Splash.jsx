import { Image, StyleSheet, View } from "react-native";
import splashSource from "../../assets/splash.png";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image source={splashSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
