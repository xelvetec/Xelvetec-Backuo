"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const { country } = useLanguage()
  const { user } = useAuth()
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
    <nav className="fixed top-0 left-0 right-0 z-50 animate-float-subtle pt-4 px-4 flex justify-center items-center">
      {/* Logo - centered */}
      <a href="#home" className="absolute left-1/2 -translate-x-1/2 inline-flex items-center group">
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
            className="w-12 h-12 md:w-14 md:h-14 transition-all duration-300 group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 0 0px rgba(160, 32, 240, 0)) drop-shadow(0 0 0px rgba(0, 212, 255, 0))",
              transition: "filter 0.3s ease",
            }}
          />
        </div>
      </a>
      
      {/* Auth buttons - right side */}
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <Link href="/dashboard">
            <button
              type="button"
              className="px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all"
            >
              Mein Konto
            </button>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              window.location.href = '/auth'
            }}
            className="px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all"
          >
            Anmelden
          </button>
        )}
      </div>

      {/* Hidden glow element that applies only on group hover */}
      <style>{`
        .group:hover > div > img {
          filter: drop-shadow(0 0 20px rgba(160, 32, 240, 0.8)) drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)) !important;
        }
      `}</style>
    </nav>
  )
}
