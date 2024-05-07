import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth.ctx";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
