import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { statusCodes } from "@react-native-google-signin/google-signin";
import GradientBackground from "../../components/brand/GradientBackground";
import Logo from "../../components/brand/Logo";
import Title from "../../components/brand/Title";
import IntroMessagesSvg from "../../assets/svg/auth/intro-messages.svg";
import { router } from "expo-router";
import { useSession } from "../../contexts/auth.ctx";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import GoogleSignInButton from "../../components/buttons/GoogleSignInButton";
import api from "../../api";
import { getErrorMessage } from "../../api/error-codes";

export default function Page() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useSession();
  const signInWithGoogle = useGoogleAuth();

  const onGoogleAuth = async () => {
    setIsSigningIn(true);
    const result = await signInWithGoogle();
    if (result?.userInfo) {
      const { idToken, user } = result.userInfo;
      const { email, name } = user;
      // send login request to server
      const data = await api.auth.login(idToken);
      if (!data || data?.code) {
        // IF error, handle error
        const message = getErrorMessage(data.code);
        alert(message);
        setIsSigningIn(false);
        return;
      }
      if (data.boarding === true) {
        // IF user is not registered, go to boarding page with boardingData
        router.push({
          pathname: "/auth/boarding",
          params: {
            userId: data.userId,
            email,
            name,
          },
        });
      } else {
        // IF successful, store token in session and go to welcome page
        signIn(data.token);
        router.push({
          pathname: "/auth/welcome",
          params: {
            name,
          },
        });
      }
      setIsSigningIn(false);
    }
    if (!result) {
      alert("Something went wrong. Please try again.");
      setIsSigningIn(false);
    }
    if (result.error) {
      // TODO: Handle error
      const error = result.error;
      const errorCode = error.code;
      switch (errorCode) {
        case statusCodes.SIGN_IN_CANCELLED:
          alert("You cancelled the sign in process.");
          break;
        case statusCodes.IN_PROGRESS:
          alert("Sign in is already in progress. Please, be patient.");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          alert("Play Service not available.");
          break;
        default:
          alert("Something went wrong. Please try again.");
      }
      setIsSigningIn(false);
    }
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
          <IntroMessagesSvg />
        </View>
        {/* Sign in with Google Button */}
        <View>
          <GoogleSignInButton onPress={onGoogleAuth} isLoading={isSigningIn} />
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
