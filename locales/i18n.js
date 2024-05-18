import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import englishLocales from "./english.json";
import koreanLocales from "./korean.json";

const i18n = new I18n({
  en: englishLocales,
  kr: koreanLocales,
});

i18n.enableFallback = true;

i18n.locale = getLocales()[0].languageCode;
// i18n.locale = "kr";

export default i18n;
