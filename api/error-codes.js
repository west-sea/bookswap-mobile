export function getErrorMessage(code, i18n) {
  let message = i18n.t(`errors.${code}`);
  if (!message) {
    message = i18n.t("errors.UNKNOWN_ERROR");
  }
  return message;
}
