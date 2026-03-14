"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number }[]>([])
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Hydration fix: only render after mount
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Cinematic scroll-linked animation - Active on all devices with optimized performance
  useEffect(() => {
    if (!mounted) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Calculate scroll progress: 0 at top, 1 after 1200px for dramatic zoom
          const progress = Math.min(window.scrollY / 1200, 1)
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  // Cinematic easing function for smooth Apple-style animation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easedProgress = easeOutCubic(scrollProgress)

  // Ultra dramatic zoom-in animation - aggressive and punchy
  const textScale = 0.7 + easedProgress * 1.2 // 0.7 -> 1.9 (more aggressive zoom!)
  const textMotionBlur = 0 // NO blur for crisp, sharp text
  const textOpacity = 0.85 + easedProgress * 0.15 // 0.85 -> 1.0

  // Background animation values based on scroll - more intense
  const bgPurpleIntensity = 0.25 + easedProgress * 0.4 // 0.25 -> 0.65 (even more intense!)
  const bgCyanIntensity = 0.2 + easedProgress * 0.35 // 0.2 -> 0.55
  const bgRotation = easedProgress * 60 // 0 -> 60deg rotation (more spin!)
  const bgPurpleX = 30 + easedProgress * 25 // 30% -> 55% shift
  const bgCyanX = 70 - easedProgress * 25 // 70% -> 45% shift
  const bgPurpleY = 20 + easedProgress * 35 // 20% -> 55% shift
  const bgCyanY = 80 - easedProgress * 35 // 80% -> 45% shift

  useEffect(() => {
    if (!mounted) return
    
    function handleMouseMove(e: MouseEvent) {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
      
      // Add to trail - keep last 15 points
      setMouseTrail(prev => [...prev.slice(-14), { x, y }])
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mounted])

  // Clean old trail particles
  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.slice(1))
    }, 100)
    return () => clearInterval(interval)
  }, [mounted])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - seamless gradient flow with cinematic animation */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at ${bgPurpleX}% ${bgPurpleY}%, rgba(160,32,240,${bgPurpleIntensity}) 0%, transparent 50%),
            radial-gradient(ellipse 900px 700px at ${bgCyanX}% ${bgCyanY}%, rgba(0,212,255,${bgCyanIntensity}) 0%, transparent 50%),
            radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)
          `,
          opacity: 1,
          willChange: "none",
        }}
      />

      {/* Mouse trail - index-based key instead of ID */}
      {mounted && mouseTrail.map((point, index) => (
        <div
          key={index}
          className="absolute pointer-events-none hidden md:block rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            width: 8,
            height: 8,
            background: `rgba(160, 32, 240, ${0.1 + (index / Math.max(mouseTrail.length, 1)) * 0.4})`,
            boxShadow: `0 0 ${8 + index * 2}px rgba(160, 32, 240, ${0.2 + (index / Math.max(mouseTrail.length, 1)) * 0.3})`,
            transform: `scale(${0.5 + (index / Math.max(mouseTrail.length, 1)) * 0.5})`,
          }}
        />
      ))}

      {/* Mouse follow glow */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(160,32,240,0.15) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)",
          borderRadius: "50%",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 w-full">
        {/* Title with dramatic cinematic zoom-in animation */}
        <div 
          className="w-full flex justify-center mb-6"
          style={{
            overflow: "visible",
          }}
        >
          <h1
            className={`font-bold text-balance transition-opacity duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              fontSize: `clamp(2rem, ${3.5 + textScale * 3}rem, 14rem)`,
              transform: `scale(${textScale})`,
              filter: `blur(${textMotionBlur}px)`,
              opacity: mounted ? textOpacity : 0,
              willChange: "transform, opacity",
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
              whiteSpace: "nowrap",
              transition: "none",
            }}
          >
          <span 
            className="inline-block animate-gradient-text"
            style={{
              background: "linear-gradient(90deg, #A020F0, #00D4FF, #A020F0, #00D4FF)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            XelveTec<sup style={{ fontSize: "0.4em", marginLeft: "0.25em" }}>®</sup>
          </span>
          <br />
          <span
            className="neon-text inline-block"
            style={{
              background: "linear-gradient(135deg, #A020F0 0%, #00D4FF 50%, #A020F0 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            {t("hero_title")}
          </span>
        </h1>
        </div>

        {/* Subtitle - NO zoom, stays fixed size */}
        <p
          className={`text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0 animate-text-reveal" : "opacity-0 translate-y-8"
          }`}
          style={{
            willChange: "opacity, transform",
          }}
        >
          {t("hero_subtitle")}
        </p>

        {/* Liquid morph CTA */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:gap-5"
            style={{
              background: "linear-gradient(135deg, #A020F0, #1E3A8A)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(160, 32, 240, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)",
            }}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{t("hero_cta")}</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125" />
            
            {/* Liquid morph effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#A020F0] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Ripple explosion on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white/20 rounded-full group-hover:animate-ripple-explosion" />
            </div>
            
            {/* Shimmer */}
            <div className="absolute inset-0 animate-shimmer" />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
        }}
      />
    </section>
  )
}
