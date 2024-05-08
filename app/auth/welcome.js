import { StyleSheet, View, Text } from "react-native";
import WelcomingEmojis from "../../assets/svg/auth/welcoming-emojis.svg";
import { useEffect, useState } from "react";
import GradientBackground from "../../components/brand/GradientBackground";
import { router } from "expo-router";

export default function WelcomePage() {
  const [name, setName] = useState("Rainbow");

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <GradientBackground />
      <WelcomingEmojis />
      <Text style={styles.text}>Welcome to BookSwap</Text>
      <Text style={styles.name}>{name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 28,
  },
});
