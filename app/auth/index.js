import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import GradientBackground from "../../components/brand/GradientBackground";
import Logo from "../../components/brand/Logo";
import Title from "../../components/brand/Title";
import introMessageSrc from "../../assets/images/auth/intro-messages.png";
import { router } from "expo-router";
import { useSession } from "../../contexts/auth.ctx";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import IconButton from "../../components/buttons/IconButton";

export default function Page() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useSession();
  const signInWithGoogle = useGoogleAuth();

  const onGoogleAuth = async () => {
    setIsSigningIn(true);
    const result = await signInWithGoogle();
    if (result.userInfo) {
      // TODO: Handle successful sign in appropriately
      const { idToken, user } = result.userInfo;
      const { email, name, photo } = user;
      const loginData = {
        idToken,
        email,
      };
      // TODO: send login request to server
      // IF successful, store token in session
      signIn();
      router.replace("/");
      // ELSE IF user is not registered, go to boarding page with boardingData
      const boardingData = {
        name,
        photo,
      };
      // router.replace("/auth/boarding");
      // ELSE handle error
    } else if (result.error) {
      // TODO: Handle error
      const error = result.error;
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      switch (errorCode) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log("User cancelled the login flow");
          break;
        case statusCodes.IN_PROGRESS:
          console.log("Sign in is in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play Services not available");
          break;
        default:
          console.log("Something went wrong");
      }
    }
    setIsSigningIn(false);
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
          {/* <IconButton
            icon="google"
            label="Sign in with Google"
            onPress={onGoogleAuth}
            iconColor="#DB4437"
            textColor="#000"
            bgColor="#fff"
          /> */}
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            disabled={isSigningIn}
            onPress={onGoogleAuth}
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
