// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          allNews: "All News",
          topHeadlines: "Top Headlines",
          // Add other keys and translations as needed
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          allNews: "Toutes les actualités",
          topHeadlines: "Titres principaux",
          // Add other keys and translations as needed
        },
      },
      // Add more languages here
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
