import React from "react";
import { usePathname } from "expo-router";
import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/auth.ctx";
import Toast from "react-native-toast-message";
import "intl-pluralrules";
import i18n from "../locales/i18n";
import { Provider } from "react-redux";
import store from "../store";

export default function Root() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Slot />
        <Toast />
      </SessionProvider>
    </Provider>
  );
}
