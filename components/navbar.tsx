"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="mx-4 mt-2 rounded-2xl"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo - NO glow */}
          <a href="#home" className="flex items-center gap-3 group">
            <Image
              src="/images/xelvetec-logo.png"
              alt="XelveTec"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-lg font-bold tracking-wider hidden sm:block"
              style={{
                background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              XelveTec
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#A020F0] to-[#3B82F6] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop language FLAGS - 28x28px with glow */}
          <div 
            className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  country === c.code ? "scale-110" : ""
                }`}
                style={{
                  width: "28px",
                  height: "28px",
                  fontSize: "22px",
                  lineHeight: 1,
                  filter: country === c.code 
                    ? "drop-shadow(0 0 8px rgba(160, 32, 240, 0.8)) drop-shadow(0 0 4px rgba(255,255,255,0.6))" 
                    : "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                }}
              >
                {c.flag}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu - nav links AND flags inside navbar */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4">
            {/* Nav links */}
            <div className="flex flex-wrap gap-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
            
            {/* Language flags inside mobile nav */}
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountry(c.code)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    country === c.code ? "scale-110" : ""
                  }`}
                  style={{
                    width: "32px",
                    height: "32px",
                    fontSize: "26px",
                    lineHeight: 1,
                    filter: country === c.code 
                      ? "drop-shadow(0 0 8px rgba(160, 32, 240, 0.8)) drop-shadow(0 0 4px rgba(255,255,255,0.6))" 
                      : "none",
                  }}
                >
                  {c.flag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
