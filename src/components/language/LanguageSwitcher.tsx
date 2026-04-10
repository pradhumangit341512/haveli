"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "hi" : "en")}
      aria-label={locale === "en" ? "Switch to Hindi" : "Switch to English"}
      style={{
        background: "none",
        border: "1px solid rgba(200,164,92,0.4)",
        color: "var(--gold-l)",
        padding: "4px 12px",
        fontSize: 11,
        letterSpacing: 1,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.3s",
      }}
    >
      {locale === "en" ? "हिंदी" : "EN"}
    </button>
  );
}
