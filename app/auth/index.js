import { Image, StyleSheet, View } from "react-native";
import GradientBackground from "../../components/brand/GradientBackground";
import Logo from "../../components/brand/Logo";
import Title from "../../components/brand/Title";
import introMessageSrc from "../../assets/images/auth/intro-messages.png";
import IconButton from "../../components/buttons/IconButton";
import { router } from "expo-router";
import { useSession } from "../../contexts/auth.ctx";

export default function Page() {
  const { signIn } = useSession();

  const onGoogleAuth = () => {
    // Implement Google Auth
    signIn();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <GradientBackground />
      {/* Brand logo and title */}
      <View style={styles.container}>
        <View style={styles.brand}>
          <Logo />
          <Title />
        </View>
        {/* Introductory messages image */}
        <View>
          <Image source={introMessageSrc} />
        </View>
        {/* Sign in with Google Button */}
        <View>
          <IconButton
            icon="google"
            label="Sign in With Google"
            onPress={onGoogleAuth}
            iconColor="#DB4437"
            textColor="#000"
            bgColor="#fff"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  brand: {
    alignItems: "center",
    justifyContent: "center",
  },
});
