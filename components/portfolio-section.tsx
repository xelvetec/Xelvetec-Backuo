"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const projects = [
  {
    title: "Alpine Luxus Hotel",
    category: "E-Commerce",
    gradient: "from-[#A020F0]/30 to-[#1E3A8A]/30",
  },
  {
    title: "Istanbul Fashion Co.",
    category: "Business",
    gradient: "from-[#3B82F6]/30 to-[#7C3AED]/30",
  },
  {
    title: "Swiss FinTech App",
    category: "E-Commerce",
    gradient: "from-[#1E3A8A]/30 to-[#A020F0]/30",
  },
  {
    title: "Berlin Creative Studio",
    category: "Basic",
    gradient: "from-[#7C3AED]/30 to-[#3B82F6]/30",
  },
  {
    title: "Vienna Coffee House",
    category: "Business",
    gradient: "from-[#A020F0]/30 to-[#3B82F6]/30",
  },
  {
    title: "Antalya Travel Agency",
    category: "E-Commerce",
    gradient: "from-[#3B82F6]/30 to-[#1E3A8A]/30",
  },
]

function PortfolioCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 25,
      y: (e.clientY - rect.top - rect.height / 2) / 25,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: `perspective(800px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) ${
          isVisible ? "translateY(0)" : "translateY(48px)"
        }`,
      }}
    >
      {/* Background */}
      <div
        className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
      >
        <div className="text-6xl font-bold text-foreground/5">{project.title[0]}</div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
        <ExternalLink className="w-6 h-6 text-foreground" />
        <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            background: "rgba(160,32,240,0.2)",
            color: "#d4a5ff",
            border: "1px solid rgba(160,32,240,0.3)",
          }}
        >
          {project.category}
        </span>
      </div>
    </div>
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
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(160,32,240,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 neon-text text-balance">
            {t("portfolio_title")}
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">{t("portfolio_subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <PortfolioCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
