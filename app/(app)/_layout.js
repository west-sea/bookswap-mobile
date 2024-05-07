import { Redirect, Slot } from "expo-router";
import { useSession } from "../../contexts/auth.ctx";
import Splash from "../../components/brand/Splash";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Splash />;
  }

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}
