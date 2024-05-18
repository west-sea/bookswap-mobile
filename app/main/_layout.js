import { Redirect, Slot } from "expo-router";
import { useSession } from "../../contexts/auth.ctx";
import Splash from "../../components/brand/Splash";
import { SocketProvider } from "../../contexts/socket.ctx";

export default function AppLayout() {
  const { token, isLoading } = useSession();

  if (isLoading) {
    return <Splash />;
  }

  if (!token) {
    return <Redirect href="/auth" />;
  }

  return (
    <SocketProvider token={token}>
      <Slot />
    </SocketProvider>
  );
}
