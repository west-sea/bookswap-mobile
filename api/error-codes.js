import i18n from "../locales/i18n";

export function getErrorMessage(code) {
  let message = i18n.t(`errors.${code}`);
  if (!message) {
    message = i18n.t("errors.UNKNOWN_ERROR");
  }
  return message;
}
