import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TRANSLATIONS } from "../data/i18n";

const LANG_KEY = "neratix-lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    return saved === "en" ? "en" : "id";
  });

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: TRANSLATIONS[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
