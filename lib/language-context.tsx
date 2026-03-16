"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, countryToLanguage, type Country, type Language } from "./translations"

interface LanguageContextType {
  country: Country
  language: Language
  setCountry: (c: Country) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// Map common country codes to our supported countries
const countryCodeMap: Record<string, Country> = {
  "DE": "de",
  "AT": "at",
  "CH": "ch",
  "TR": "tr",
  "GB": "en",
  "US": "en",
  "IE": "en",
  "AU": "en",
  "NZ": "en",
  "CA": "en",
  "FR": "en",
  "IT": "en",
  "ES": "en",
  "NL": "en",
  "BE": "en",
  "SE": "en",
  "NO": "en",
  "DK": "en",
  "PL": "en",
  "CZ": "en",
  "SK": "en",
  "HU": "en",
  "RO": "en",
  "BG": "en",
  "GR": "en",
  "PT": "en",
  "JP": "en",
  "KR": "en",
  "CN": "en",
  "IN": "en",
  "BR": "en",
  "MX": "en",
  "RU": "en",
  "UA": "en",
}

async function detectCountry(): Promise<Country> {
  try {
    // Use Vercel's native geolocation via our API route (most reliable)
    const response = await fetch("/api/geolocation")
    const data = await response.json()
    const countryCode = data.country?.toUpperCase()
    
    console.log("[v0] Detected country code from Vercel header:", countryCode)
    
    if (countryCode && countryCode in countryCodeMap) {
      console.log("[v0] Mapped to:", countryCodeMap[countryCode])
      return countryCodeMap[countryCode]
    }
  } catch (error) {
    console.log("[v0] Geolocation detection failed:", error)
  }
  
  return "de" // Default fallback
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country>("de")
  const [mounted, setMounted] = useState(false)

  // Auto-detect country on mount
  useEffect(() => {
    detectCountry().then((detectedCountry) => {
      console.log("[v0] Detected country:", detectedCountry)
      setCountryState(detectedCountry)
      setMounted(true)
    })
  }, [])

  const language = countryToLanguage[country]

  const t = (key: string) => {
    return translations[language]?.[key] ?? key
  }

  const setCountry = (c: Country) => {
    setCountryState(c)
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
