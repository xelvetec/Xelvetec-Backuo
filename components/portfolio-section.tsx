"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    id: "mpu",
    title: "MPU Agentur Meiningen",
    gradient: "from-purple-600/40 to-blue-900/40",
    accentColor: "#A020F0",
    url: "https://mpuagentur-meiningen.de/",
  },
  {
    id: "oda",
    title: "Oda Schmidt Rechtsanwältin",
    gradient: "from-purple-600/40 to-blue-900/40",
    accentColor: "#A020F0",
    url: "https://magnificent-narwhal-b530a8.netlify.app/",
  },
  {
    id: "kunsthandwerk",
    title: "Maler / Lackierer",
    gradient: "from-cyan-500/40 to-purple-600/40",
    accentColor: "#00D4FF",
    url: "https://jade-cranachan-bab53b.netlify.app/",
  },
  {
    id: "goldener-gabel",
    title: "Goldener Gabel Restaurant",
    gradient: "from-blue-900/40 to-purple-600/40",
    accentColor: "#FFD700",
    url: "https://enchanting-custard-6a0bcb.netlify.app/",
  },
]

function PortfolioCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative rounded-2xl overflow-hidden aspect-video cursor-pointer transition-all duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        style={{
          boxShadow: isHovered
            ? `0 20px 40px ${project.accentColor}40`
            : "0 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${project.accentColor}20 0%, transparent 50%),
                           radial-gradient(circle at 70% 70%, ${project.accentColor}10 0%, transparent 50%)`,
            }}
          />

          <div className="relative z-10 transition-all duration-300 transform group-hover:scale-110 text-center px-6">
            <h3 className="text-2xl md:text-3xl font-bold text-balance" style={{ color: project.accentColor }}>
              {project.title}
            </h3>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "linear-gradient(135deg, rgba(160, 32, 240, 0.2), rgba(0, 212, 255, 0.15))",
          }}
        >
        </div>
      </div>
    </a>
  )
}

export function PortfolioSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(160,32,240,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-balance"
            style={{
              background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            {t("portfolio_title")}
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">{t("portfolio_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
