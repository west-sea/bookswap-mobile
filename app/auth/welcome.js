import { StyleSheet, View, Text } from "react-native";
import WelcomingEmojis from "../../assets/svg/auth/welcoming-emojis.svg";
import { useEffect } from "react";
import GradientBackground from "../../components/brand/GradientBackground";
import { router, useLocalSearchParams } from "expo-router";

export default function WelcomePage() {
  const params = useLocalSearchParams();

  useEffect(() => {
    setTimeout(() => {
      router.push("/main");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <GradientBackground />
      <WelcomingEmojis />
      <Text style={styles.text}>Welcome to BookSwap</Text>
      <Text style={styles.name}>{params.name || "Booklover"}!</Text>
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
