"use client";

import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

type Language = {
  code: string;
  label: string;
  country: string;
};

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const languages: Language[] = [
    { code: "en", label: "English", country: "US" },
    { code: "es", label: "Spanish", country: "ES" },
    { code: "fr", label: "French", country: "FR" },
    { code: "de", label: "German", country: "DE" },
    { code: "pt", label: "Portuguese", country: "PT" },
    { code: "ru", label: "Russian", country: "RU" },
  ];

  /* Initialize Google Translate */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setCurrentLang(savedLang);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map(l => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    /* Hide navbar on load */
    const hideBar = setInterval(() => {
      const frame = document.querySelector(
        ".goog-te-banner-frame"
      ) as HTMLElement | null;
      if (frame) {
        frame.style.display = "none";
        document.body.style.top = "0px";
        clearInterval(hideBar);
      }
    }, 300);

    return () => clearInterval(hideBar);
  }, []);

  /* Switch language + hide navbar every time */
  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem("lang", lang);

    const interval = setInterval(() => {
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 300);

    /* Hide Google navbar after changing language */
    const hideAfterSwitch = setInterval(() => {
      const frame = document.querySelector(
        ".goog-te-banner-frame"
      ) as HTMLElement | null;
      if (frame) {
        frame.style.display = "none";
        document.body.style.top = "0px";
        clearInterval(hideAfterSwitch);
      }
    }, 300);

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow text-gray-900 text-sm sm:text-base"
      >
        <ReactCountryFlag
          svg
          countryCode={
            languages.find(l => l.code === currentLang)?.country || "US"
          }
          style={{ width: 18, height: 18 }}
        />
        <span className="font-medium">{currentLang.toUpperCase()}</span>
        <span>⌄</span>
      </button>

      {open && (
        <div className="absolute left-0 sm:right-0 mt-2 w-44 max-h-64 overflow-y-auto bg-white text-gray-900 rounded-lg shadow-lg z-50 border border-gray-200">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className="flex items-center gap-2 w-full px-4 py-3 text-gray-800 text-sm hover:bg-gray-100"
            >
              <ReactCountryFlag
                svg
                countryCode={lang.country}
                style={{ width: 18, height: 18 }}
              />
              {lang.label}
            </button>
          ))}
        </div>
      )}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
}