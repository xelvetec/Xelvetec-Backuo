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
    <>
      {/* Main Navbar - fully transparent */}
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
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <Image
                src="/images/xelvetec-logo.png"
                alt="XelveTec"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(160, 32, 240, 0.6))",
                }}
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

            {/* Desktop language flags - FLAGS ONLY */}
            <div className="hidden md:flex items-center gap-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    country === c.code
                      ? "bg-[#A020F0]/30 ring-2 ring-[#A020F0]/70 scale-110"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  style={{
                    boxShadow: country === c.code 
                      ? "0 0 20px rgba(160, 32, 240, 0.5)"
                      : "none",
                  }}
                >
                  <span 
                    className="text-2xl leading-none"
                    style={{
                      filter: country === c.code 
                        ? "drop-shadow(0 0 8px rgba(255,255,255,0.9))" 
                        : "drop-shadow(0 0 2px rgba(255,255,255,0.4))",
                    }}
                  >
                    {c.flag}
                  </span>
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

          {/* Mobile menu - nav links only, NO flags inside */}
          {mobileOpen && (
            <div className="md:hidden px-4 pb-4">
              <div className="flex flex-wrap gap-2">
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
            </div>
          )}
        </div>
      </nav>

      {/* Mobile language flags - OUTSIDE navbar, below it */}
      {mobileOpen && (
        <div 
          className="fixed top-20 left-0 right-0 z-40 md:hidden px-4"
        >
          <div 
            className="flex items-center justify-center gap-3 py-3 rounded-xl"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCountry(c.code)
                  setMobileOpen(false)
                }}
                className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                  country === c.code
                    ? "bg-[#A020F0]/30 ring-2 ring-[#A020F0]/70 scale-110"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                style={{
                  boxShadow: country === c.code 
                    ? "0 0 16px rgba(160, 32, 240, 0.5)"
                    : "none",
                }}
              >
                <span 
                  className="text-2xl leading-none"
                  style={{
                    filter: country === c.code 
                      ? "drop-shadow(0 0 6px rgba(255,255,255,0.9))" 
                      : "none",
                  }}
                >
                  {c.flag}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
