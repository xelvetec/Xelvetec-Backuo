"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, countryToLanguage, type Country, type Language } from "./translations"

interface LanguageContextType {
  country: Country
  language: Language
  setCountry: (c: Country) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>("de")
  const language = countryToLanguage[country]

  const t = (key: string) => {
    return translations[language]?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ country, language, setCountry, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
