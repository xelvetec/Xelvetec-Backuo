"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function Navbar() {
  const { country } = useLanguage()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 800, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Logo cinematic zoom animation based on scroll
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const easedProgress = easeInOutCubic(scrollProgress)
  const logoScale = mounted ? 1 + easedProgress * 0.4 : 1

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-float-subtle pt-4 px-4 flex justify-center">
      {/* Logo only - minimal and clean - centered */}
      <a href="#home" className="inline-flex items-center group">
        <div 
          className="relative animate-breathing transition-transform duration-75 ease-out"
          style={{
            transform: `scale(${logoScale})`,
          }}
        >
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110"
          />
          {/* Breathing glow ring */}
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: "0 0 20px rgba(160, 32, 240, 0.6), 0 0 40px rgba(0, 212, 255, 0.3)",
            }}
          />
        </div>
      </a>
    </nav>
  )
}
