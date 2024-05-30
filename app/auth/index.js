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
import { showError, showInfo } from "../../components/Toaster";
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
  const [errors, setErrors] = useState([]);

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
    const newErrors = ["START"];
    newErrors.push("ENV LOADING");
    newErrors.push(`ENV: ${process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID}`);
    newErrors.push(`ENV: ${process.env.EXPO_PUBLIC_API_BASE_URL}`);
    newErrors.push(`ENV: ${process.env.EXPO_PUBLIC_API_SOCKET_URL}`);
    newErrors.push(`ENV LOADED`);
    setIsSigningIn(true);
    try {
      newErrors.push("START TRY");
      const result = await signInWithGoogle();
      newErrors.push("GOT RESULT");
      if (!result || !result.userInfo) {
        newErrors.push(`NO RESULT. GOOGLE ERROR: ${result?.error}`);
        throw result?.error || new Error();
      }
      newErrors.push(`AFTER RESULT CHECK`);
      const { idToken, user } = result.userInfo;
      const { email, name } = user;
      newErrors.push(`AFTER DESTRUCTURE`);
      // send login request to server
      let { data } = await login({ token: idToken });
      newErrors.push(`AFTER LOGIN REQUEST`);
      if (!data || !data.success) {
        newErrors.push(
          `NO DATA. API ERROR: ${data?.success} - ${JSON.stringify(
            data?.issues || { nothing: true }
          )}`
        );
        throw new Error();
      }
      newErrors.push(`AFTER DATA CHECK`);
      // IF user is not registered, go to boarding page with boardingData
      data = data.data;
      newErrors.push(`BEFORE BOARDING CHECK: ${JSON.stringify(data)}`);
      if (data.boarding === true) {
        newErrors.push(`GO TO BOARDING`);
        // router.push({
        //   pathname: "/auth/boarding",
        //   params: {
        //     userId: data.userId,
        //     email,
        //     name,
        //   },
        // });
      } else {
        newErrors.push(`GO TO WELCOME: ${JSON.stringify(data)}`);
        // IF successful, store token in session and go to welcome page
        // signIn(data.token, data.user);
        // router.replace({
        //   pathname: "/auth/welcome",
        //   params: {
        //     name,
        //   },
        // });
      }
    } catch (error) {
      if (!error) {
        newErrors.push(`NO ERROR`);
        // showError(i18n.t("errors.UNKNOWN_ERROR"));
        return;
      } else {
        newErrors.push(`THERE IS ERROR: ${JSON.stringify(error)}`);
        const errorCode = error.code;
        newErrors.push(`ERROR CODE: ${errorCode}`);
        // showError(`Code: ${errorCode}. ${error.message}, ${error}`);
        switch (errorCode) {
          case statusCodes.SIGN_IN_CANCELLED:
            newErrors.push(`SIGN IN CANCELLED`);
            // showError(i18n.t("errors.SIGN_IN_CANCELLED"));
            break;
          case statusCodes.IN_PROGRESS:
            newErrors.push(`SIGN IN IN PROGRESS`);
            // showError(i18n.t("errors.SIGN_IN_IN_PROGRESS"));
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            newErrors.push(`PLAY SERVICES NOT AVAILABLE`);
            // showError(i18n.t("errors.SIGN_IN_NOT_SUPPORTED"));
            break;
          default:
            newErrors.push(`SIGN IN ERROR`);
            // showError(i18n.t("errors.SIGN_IN_ERROR"));
            break;
        }
      }
    }
    setIsSigningIn(false);
    setErrors(newErrors);
  };

  if (errors.length > 0) {
    return (
      <View
        style={{
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}
      >
        {errors.map((error, index) => (
          <Text key={index}>
            {index}. {error}
          </Text>
        ))}
      </View>
    );
  }

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
