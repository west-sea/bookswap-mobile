import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import korean from "./korean.json";
import { getLocales } from "expo-localization";

// Dayjs plugins
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const resources = {
  en: { translation: english },
  kr: { translation: korean },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLocales()[0].languageCode,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
