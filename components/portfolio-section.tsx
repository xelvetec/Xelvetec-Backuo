"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    id: "mpu",
    title: "MPU Agentur Meiningen",
    category: "Business",
    gradient: "from-[#A020F0]/40 to-[#1E3A8A]/40",
    image: "/images/portfolio-mpu.png",
    url: "https://mpuagentur-meiningen.de/",
  },
  {
    id: "oda",
    title: "Oda Schmidt Rechtsanwältin",
    category: "Law/Business",
    badge: "Vorlage",
    gradient: "from-[#A020F0]/40 to-[#1E3A8A]/40",
    image: "/images/portfolio-oda-schmidt.png",
    url: "https://magnificent-narwhal-b530a8.netlify.app/",
  },
  {
    id: "kunsthandwerk",
    title: "Maler / Lackierer",
    category: "Handcraft/Design",
    badge: "Vorlage",
    gradient: "from-[#00D4FF]/40 to-[#7C3AED]/40",
    image: "/images/portfolio-xelvetec-kunsthandwerk.png",
    url: "https://jade-cranachan-bab53b.netlify.app/",
  },
  {
    id: "goldener-gabel",
    title: "Goldener Gabel Restaurant",
    category: "Gastronomy",
    badge: "Vorlage",
    gradient: "from-[#1E3A8A]/40 to-[#A020F0]/40",
    image: "/images/portfolio-goldener-gabel.png",
    url: "https://enchanting-custard-6a0bcb.netlify.app/",
  },
]

function PortfolioCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const CardContent = () => (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden aspect-video cursor-pointer transition-all duration-300 ${
        isHovered ? "scale-105" : "scale-100"
      }`}
      style={{
        boxShadow: isHovered 
          ? "0 20px 40px rgba(160, 32, 240, 0.3)"
          : "0 10px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Image or gradient background */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-full object-contain object-center bg-black/20"
          loading="lazy"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
        >
          <div className="text-6xl font-bold text-white/10">{project.title[0]}</div>
        </div>
      )}

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
        <ExternalLink className="w-8 h-8 text-white" />
        <h4 className="text-lg font-bold text-white text-center px-4">{project.title}</h4>
        <div className="flex items-center gap-2 justify-center flex-wrap px-4">
          <span
            className="text-xs px-4 py-1.5 rounded-full font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(160,32,240,0.4), rgba(0,212,255,0.3))",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
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
  )

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      <CardContent />
    </a>
  ) : (
    <CardContent />
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
          {projects.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
