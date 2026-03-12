"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import type { Country } from "@/lib/translations"

const countries: { code: Country; flag: string }[] = [
  { code: "de", flag: "🇩🇪" },
  { code: "tr", flag: "🇹🇷" },
  { code: "ch", flag: "🇨🇭" },
  { code: "at", flag: "🇦🇹" },
  { code: "en", flag: "🇬🇧" },
]

const navLinks = [
  { key: "nav_home", href: "#home" },
  { key: "nav_services", href: "#services" },
  { key: "nav_portfolio", href: "#portfolio" },
  { key: "nav_contact", href: "#contact" },
]

export function Navbar() {
  const { country, setCountry, t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-float-subtle">
      <div 
        className="mx-4 mt-2 rounded-2xl transition-all duration-300"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Desktop and Mobile unified navbar - Logo left + flags right */}
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Left side: Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative animate-breathing">
              <Image
                src="/images/xelvetec-logo.png"
                alt="XelveTec"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
              />
              {/* Breathing glow ring */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(160, 32, 240, 0.6), 0 0 40px rgba(0, 212, 255, 0.3)",
                }}
              />
            </div>
            <span
              className="text-lg font-bold tracking-wider hidden sm:block animate-gradient-text"
              style={{
                background: "linear-gradient(90deg, #A020F0, #00D4FF, #A020F0)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              XelveTec
            </span>
          </a>

          {/* Middle: Desktop nav links only */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group hover:scale-105"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#A020F0] to-[#00D4FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side: Language FLAGS (both desktop and mobile) */}
          <div 
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-full md:gap-2 md:px-3"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`flex items-center justify-center transition-all duration-300 hover:scale-125 rounded-full ${
                  country === c.code ? "scale-110" : ""
                }`}
                style={{
                  width: "28px",
                  height: "28px",
                  fontSize: "20px",
                  lineHeight: 1,
                  filter: country === c.code 
                    ? "drop-shadow(0 0 10px rgba(160, 32, 240, 0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.8))" 
                    : "drop-shadow(0 0 3px rgba(255,255,255,0.4))",
                  background: country === c.code ? "rgba(160, 32, 240, 0.2)" : "transparent",
                }}
              >
                {c.flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
