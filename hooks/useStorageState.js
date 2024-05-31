import React from "react";
import * as SecureStore from "expo-secure-store";

function useAsyncState(initialValue = [true, null]) {
  return React.useReducer(
    (state, action = null) => [false, action],
    initialValue
  );
}

export async function setStorageItemAsync(key, value) {
  if (value === null) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (_) {}
  } else {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (_) {}
  }
}

export function useStorageState(key) {
  const [state, setState] = useAsyncState();

  React.useEffect(() => {
    try {
      SecureStore.getItemAsync(key)
        .then((value) => {
          setState(value);
        })
        .catch((_) => {
          setState(null);
        });
    } catch (_) {}
  }, [key]);

  const setValue = React.useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
