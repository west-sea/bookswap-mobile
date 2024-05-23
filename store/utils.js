import { showError } from "../components/Toaster";

export function handleApiError(error, i18n) {
  if (error.data && error.data.issues) {
    const code = error.data.issues[0].code;
    if (!code) return;
    showError(getErrorMessage(code, i18n));
  }
}

export function getErrorMessage(code, i18n) {
  let message;
  if (!code) {
    message = i18n.t("errors.UNKNOWN_ERROR");
  } else {
    message = i18n.t(`errors.${code}`);
  }
  return message;
}
