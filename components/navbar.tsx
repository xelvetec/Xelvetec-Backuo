"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Country } from "@/lib/translations"

const countries: { code: Country; flag: string; label: string }[] = [
  { code: "de", flag: "\uD83C\uDDE9\uD83C\uDDEA", label: "DE" },
  { code: "tr", flag: "\uD83C\uDDF9\uD83C\uDDF7", label: "TR" },
  { code: "ch", flag: "\uD83C\uDDE8\uD83C\uDDED", label: "CH" },
  { code: "at", flag: "\uD83C\uDDE6\uD83C\uDDF9", label: "AT" },
  { code: "en", flag: "\uD83C\uDDEC\uD83C\uDDE7", label: "EN" },
]

const navLinks = [
  { key: "nav_home", href: "#home" },
  { key: "nav_services", href: "#services" },
  { key: "nav_about", href: "#about" },
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
          {/* Logo in navbar - static 40x40 with smooth hover glow */}
          <a href="#home" className="flex items-center gap-3 group">
            <Image
              src="/images/xelvetec-logo.png"
              alt="XelveTec"
              width={40}
              height={40}
              className="transition-all duration-300 group-hover:scale-110"
              style={{
                filter: "drop-shadow(0 0 10px rgba(160, 32, 240, 0.5))",
              }}
            />
            <span
              className="text-lg font-bold tracking-wider"
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
          <div className="hidden md:flex items-center gap-6">
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

          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-1">
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  country === c.code
                    ? "bg-[#A020F0]/20 text-foreground ring-1 ring-[#A020F0]/50"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <span className="mr-1">{c.flag}</span>
                {c.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground py-2 border-b border-foreground/10"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="flex items-center gap-1 pt-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountry(c.code)
                    setMobileOpen(false)
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    country === c.code
                      ? "bg-[#A020F0]/20 text-foreground ring-1 ring-[#A020F0]/50"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <span className="mr-1">{c.flag}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
