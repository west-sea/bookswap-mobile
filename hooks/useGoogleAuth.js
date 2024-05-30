import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
});

export function useGoogleAuth() {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return { userInfo };
    } catch (error) {
      alert("Error: " + error.message);
      return { error };
    }
  };
  return signInWithGoogle;
}
