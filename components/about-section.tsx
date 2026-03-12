"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ParticleField } from "./particles"

const stats = [
  { key: "about_stat1_label", value: "150+" },
  { key: "about_stat2_label", value: "200+" },
  { key: "about_stat3_label", value: "4" },
  { key: "about_stat4_label", value: "5+" },
]

export function AboutSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Particles background */}
      <ParticleField />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 neon-text text-balance">
              {t("about_title")}
            </h2>
            <p className="text-foreground/60 leading-relaxed text-lg">
              {t("about_text")}
            </p>
          </div>

          {/* Right - Stats */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.key}
                className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:neon-glow"
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/50">{t(stat.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
