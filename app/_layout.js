import React, { useEffect } from "react";
import { Redirect, router, usePathname } from "expo-router";
import { useSession } from "../contexts/auth.ctx";
import Splash from "../components/brand/Splash";
import { SocketProvider } from "../contexts/socket.ctx";
import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth.ctx";
import Toast from "react-native-toast-message";
import "intl-pluralrules";
import i18n from "../locales/i18n";

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
  const { token } = useSession();

  useEffect(() => {
    if (!token) {
      router.replace("/auth");
    }
  }, [token]);

  return <SocketProvider token={token}>{children}</SocketProvider>;
}
