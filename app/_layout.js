import React from "react";
import { Redirect, usePathname } from "expo-router";
import { useSession } from "../contexts/auth.ctx";
import Splash from "../components/brand/Splash";
import { SocketProvider } from "../contexts/socket.ctx";
import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth.ctx";
import Toast from "react-native-toast-message";

export default function Root() {
  const pathname = usePathname();

  return (
    <SessionProvider>
      {pathname === "/auth" ? (
        <Slot />
      ) : (
        <ProtectedLayout>
          <Slot />
        </ProtectedLayout>
      )}
      <Toast />
    </SessionProvider>
  );
}

function ProtectedLayout({ children }) {
  const { token, isLoading } = useSession();

  if (isLoading) {
    return <Splash />;
  }

  if (!token) {
    return <Redirect href="/auth" />;
  }

  return <SocketProvider token={token}>{children}</SocketProvider>;
}
