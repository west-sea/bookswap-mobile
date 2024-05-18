import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth.ctx";
import Toast from "react-native-toast-message";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
      <Toast />
    </SessionProvider>
  );
}
