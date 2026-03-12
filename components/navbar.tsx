"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Country } from "@/lib/translations"

const countries: { code: Country; flag: string; label: string }[] = [
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "ch", flag: "🇨🇭", label: "CH" },
  { code: "at", flag: "🇦🇹", label: "AT" },
  { code: "en", flag: "🇬🇧", label: "EN" },
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
        className="mx-0 md:mx-4 mt-0 md:mt-2 rounded-none md:rounded-2xl"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(160, 32, 240, 0.15))",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo 48px desktop, 40px mobile with hover glow */}
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
                textShadow: "0 0 30px rgba(160, 32, 240, 0.3)",
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
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#A020F0] to-[#3B82F6] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop language flags - LARGE 32x32px with GLOW */}
          <div className="hidden md:flex items-center gap-2">
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  country === c.code
                    ? "bg-[#A020F0]/25 ring-2 ring-[#A020F0]/60"
                    : "bg-white/5 hover:bg-white/15"
                }`}
                style={{
                  boxShadow: country === c.code 
                    ? "0 0 20px rgba(160, 32, 240, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)"
                    : "none",
                }}
              >
                <span 
                  className="text-2xl"
                  style={{
                    filter: country === c.code 
                      ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" 
                      : "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                    transition: "filter 0.3s ease",
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
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4">
            {/* Mobile nav links */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 rounded-lg transition-all"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
            
            {/* Mobile language flags - below navbar */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountry(c.code)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    country === c.code
                      ? "bg-[#A020F0]/25 ring-2 ring-[#A020F0]/50"
                      : "bg-white/5 hover:bg-white/15"
                  }`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-foreground/80">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
