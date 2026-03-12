"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ParticleField } from "./particles"

export function HeroSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - seamless gradient flow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(160,32,240,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)
          `,
        }}
      />

      {/* Particles */}
      <ParticleField />

      {/* Mouse follow glow */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(160,32,240,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-balance transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-foreground">XelveTec</span>
          <br />
          <span
            className="neon-text"
            style={{
              background: "linear-gradient(135deg, #A020F0 0%, #3B82F6 50%, #A020F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
            }}
          >
            {t("hero_title")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t("hero_subtitle")}
        </p>

        {/* CTA */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #A020F0, #1E3A8A)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(160, 32, 240, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
            }}
          >
            <span className="relative z-10">{t("hero_cta")}</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#A020F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 animate-shimmer" />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade - seamless transition to services */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
        }}
      />
    </section>
  )
}
