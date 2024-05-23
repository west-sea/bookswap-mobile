import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { signIn, signOut } from "../store/auth";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext({
  signIn: () => null,
  signOut: () => null,
  token: null,
  user: null,
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
  const [[_, user], setUser] = useStorageState("user");
  const dispatch = useDispatch();

  return (
    <AuthContext.Provider
      value={{
        signIn: (token, user) => {
          // Perform sign-in logic here
          dispatch(signIn({ token, user }));
          setSession(token);
          setUser(JSON.stringify(user));
        },
        signOut: () => {
          // Perform sign-out logic here
          dispatch(signOut());
          setSession(null);
        },
        token: session,
        user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
