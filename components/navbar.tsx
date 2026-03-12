"use client"

import { useState, useEffect, useRef } from "react"
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
  
  // Cinematic logo scroll state
  const [scrollProgress, setScrollProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const currentTime = Date.now()
      const deltaTime = Math.max(currentTime - lastTime.current, 1)
      const deltaY = currentY - lastScrollY.current
      
      // Calculate velocity (pixels per millisecond, clamped)
      const newVelocity = Math.min(Math.abs(deltaY / deltaTime), 3)
      setVelocity(newVelocity)
      
      // Scroll progress: 0 at top, 1 at 400px scroll
      const progress = Math.min(currentY / 400, 1)
      setScrollProgress(progress)
      
      lastScrollY.current = currentY
      lastTime.current = currentTime
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Cinematic easing function (slow ease in/out)
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const easedProgress = easeInOutCubic(scrollProgress)
  
  // Logo transform values
  const logoScale = 1 + easedProgress * 1.8 // 1 -> 2.8
  const logoTranslateZ = easedProgress * 150 // 0 -> 150px
  const logoRotateX = easedProgress * -8 // 0 -> -8deg (tilt toward camera)
  const logoRotateY = easedProgress * 3 // 0 -> 3deg (slight side tilt)
  const logoGlow = easedProgress * 0.8 // glow intensity
  const motionBlur = Math.min(velocity * 4, 8) // motion blur based on scroll velocity

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-pulse-glow">
      <div className="glass-strong rounded-none md:rounded-b-2xl mx-0 md:mx-4 mt-0 md:mt-2">
        <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo with cinematic fly-in effect */}
          <a href="#home" className="flex items-center gap-3 group" style={{ perspective: "1000px" }}>
            <div
              className="relative transition-none"
              style={{
                transform: `
                  perspective(1000px)
                  translateZ(${logoTranslateZ}px)
                  scale(${logoScale})
                  rotateX(${logoRotateX}deg)
                  rotateY(${logoRotateY}deg)
                `,
                filter: `blur(${motionBlur}px)`,
                transformStyle: "preserve-3d",
                willChange: "transform, filter",
              }}
            >
              <Image
                src="/images/xelvetec-logo.png"
                alt="XelveTec"
                width={36}
                height={36}
                className="relative z-10"
                style={{
                  filter: `
                    drop-shadow(0 0 ${10 + logoGlow * 40}px rgba(160, 32, 240, ${0.3 + logoGlow * 0.5}))
                    drop-shadow(0 0 ${20 + logoGlow * 60}px rgba(59, 130, 246, ${0.2 + logoGlow * 0.4}))
                  `,
                }}
              />
              {/* Cinematic light flare */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${logoGlow * 0.4}), transparent 60%)`,
                  transform: "scale(1.5)",
                  opacity: easedProgress,
                }}
              />
            </div>
            <span
              className="text-lg font-bold tracking-wider neon-text transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 1 - easedProgress * 0.7, // fade text as logo zooms
                transform: `translateX(${-easedProgress * 20}px)`, // slide left as logo grows
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
