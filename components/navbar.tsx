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
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo with breathing glow */}
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Desktop language FLAGS */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
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
                  width: "32px",
                  height: "32px",
                  fontSize: "24px",
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4">
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
                  className={`flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-full ${
                    country === c.code ? "scale-110" : ""
                  }`}
                  style={{
                    width: "36px",
                    height: "36px",
                    fontSize: "28px",
                    lineHeight: 1,
                    filter: country === c.code 
                      ? "drop-shadow(0 0 10px rgba(160, 32, 240, 0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.8))" 
                      : "none",
                    background: country === c.code ? "rgba(160, 32, 240, 0.2)" : "transparent",
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
