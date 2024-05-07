import React from "react";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = React.createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession("session-token");
        },
        signOut: () => {
          // Perform sign-out logic here
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
