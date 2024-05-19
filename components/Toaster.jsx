import Toast from "react-native-toast-message";

export function showError(message) {
  Toast.show({
    type: "error",
    text1: "Something went wrong",
    text2: message,
    position: "bottom",
  });
}

export function showInfo(message) {
  Toast.show({
    type: "info",
    text1: "Info",
    text2: message,
    position: "bottom",
  });
}

export function showSuccess(title, message) {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "bottom",
  });
}
