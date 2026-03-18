"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    id: "mpu",
    title: "MPU Agentur Meiningen",
    category: "Business",
    gradient: "from-purple-600/40 to-blue-900/40",
    accentColor: "#A020F0",
    icon: "briefcase",
    url: "https://mpuagentur-meiningen.de/",
  },
  {
    id: "oda",
    title: "Oda Schmidt Rechtsanwältin",
    category: "Law/Business",
    badge: "Vorlage",
    gradient: "from-purple-600/40 to-blue-900/40",
    accentColor: "#A020F0",
    icon: "scale",
    url: "https://magnificent-narwhal-b530a8.netlify.app/",
  },
  {
    id: "kunsthandwerk",
    title: "Maler / Lackierer",
    category: "Handcraft/Design",
    badge: "Vorlage",
    gradient: "from-cyan-500/40 to-purple-600/40",
    accentColor: "#00D4FF",
    icon: "palette",
    url: "https://jade-cranachan-bab53b.netlify.app/",
  },
  {
    id: "goldener-gabel",
    title: "Goldener Gabel Restaurant",
    category: "Gastronomy",
    badge: "Vorlage",
    gradient: "from-blue-900/40 to-purple-600/40",
    accentColor: "#FFD700",
    icon: "utensils",
    url: "https://enchanting-custard-6a0bcb.netlify.app/",
  },
]

function getIcon(iconName: string, color: string) {
  switch (iconName) {
    case "briefcase":
      return (
        <svg className="w-20 h-20" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v8m0 0H5m14 0H9" />
        </svg>
      )
    case "scale":
      return (
        <svg className="w-20 h-20" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M9 17l3 9m3-9l-3 9m0-9v-3m0 3h.01" />
        </svg>
      )
    case "palette":
      return (
        <svg className="w-20 h-20" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    case "utensils":
      return (
        <svg className="w-20 h-20" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    default:
      return null
  }
}

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
        {/* Gradient background with animated overlay - NO IMAGES */}
        <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
          {/* Animated radial gradient overlay */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${project.accentColor}20 0%, transparent 50%),
                           radial-gradient(circle at 70% 70%, ${project.accentColor}10 0%, transparent 50%)`,
            }}
          />

          {/* Icon with Accent Color */}
          <div className="relative z-10 transition-all duration-300 transform group-hover:scale-110">
            {getIcon(project.icon, project.accentColor)}
          </div>
        </div>

        {/* Overlay on hover */}
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
          <h4 className="text-lg font-bold text-white text-center px-4">{project.title}</h4>
          <div className="flex items-center gap-2 justify-center flex-wrap px-4">
            <span
              className="text-xs px-4 py-1.5 rounded-full font-medium"
              style={{
                background: `${project.accentColor}30`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}60`,
              }}
            >
              {project.category}
            </span>
            {project.badge && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: "rgba(255,215,0,0.2)",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.4)",
                }}
              >
                {project.badge}
              </span>
            )}
          </div>
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
    </section>
  )
}
