import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure();

export function useGoogleAuth() {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return { userInfo };
    } catch (error) {
      return { error };
    }
  };
  return signInWithGoogle;
}
