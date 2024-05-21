import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
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
import { showError } from "../../components/Toaster";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useSession();
  const signInWithGoogle = useGoogleAuth();
  const { i18n } = useTranslation();

  const switchLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("kr");
    } else {
      i18n.changeLanguage("en");
    }
  };

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
        const message = getErrorMessage(data.code, i18n);
        showError(message);
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
        router.replace({
          pathname: "/auth/welcome",
          params: {
            name,
          },
        });
      }
      setIsSigningIn(false);
    }
    if (!result) {
      showError(i18n.t("errors.UNKNOWN_ERROR"));
      setIsSigningIn(false);
    }
    if (result.error) {
      // TODO: Handle error
      const error = result.error;
      const errorCode = error.code;
      switch (errorCode) {
        case statusCodes.SIGN_IN_CANCELLED:
          showError(i18n.t("errors.SIGN_IN_CANCELLED"));
          break;
        case statusCodes.IN_PROGRESS:
          showError(i18n.t("errors.SIGN_IN_IN_PROGRESS"));
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showError(i18n.t("errors.SIGN_IN_NOT_SUPPORTED"));
          break;
        default:
          showError(i18n.t("errors.SIGN_IN_ERROR"));
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
        <TouchableOpacity
          onPress={switchLanguage}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Ionicons name="language" size={24} color="white" />
          <Text
            style={{
              color: "white",
            }}
          >
            {i18n.t("auth.switchLanguage")}
          </Text>
        </TouchableOpacity>
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
