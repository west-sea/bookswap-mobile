import { useEffect, useState } from "react";
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
import { showError } from "../../components/Toaster";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../store/api";
import { handleApiError } from "../../store/utils";

export default function Page() {
  const [login, { error }] = api.useLoginMutation();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useSession();
  const signInWithGoogle = useGoogleAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!error) return;
    handleApiError(error, i18n);
  }, [error]);

  const switchLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("kr");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const onGoogleAuth = async () => {
    setIsSigningIn(true);
    try {
      const result = await signInWithGoogle();
      if (!result || !result.userInfo) {
        throw result.error || new Error();
      }
      const { idToken, user } = result.userInfo;
      const { email, name } = user;
      // send login request to server
      let { data } = await login({ token: idToken });
      if (!data || !data.success) throw new Error();
      // IF user is not registered, go to boarding page with boardingData
      data = data.data;
      if (data.boarding === true) {
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
        signIn(data.token, data.user);
        router.replace({
          pathname: "/auth/welcome",
          params: {
            name,
          },
        });
      }
    } catch (error) {
      if (!error) {
        showError(i18n.t("errors.UNKNOWN_ERROR"));
        return;
      } else {
        const errorCode = error.code;
        showError(`Code: ${errorCode}. ${error.message}, ${error}`);
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
            // showError(i18n.t("errors.SIGN_IN_ERROR"));
            break;
        }
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
