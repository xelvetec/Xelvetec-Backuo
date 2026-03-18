"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "E-Commerce Beast",
    subtitle: "Shopify • 400% Wachstum",
    icon: "shopping-bag",
    gradient: "from-purple-600/30 via-transparent to-cyan-500/20",
  },
  {
    id: 2,
    title: "Corporate Mastery",
    subtitle: "Enterprise • SaaS-Redesign",
    icon: "briefcase",
    gradient: "from-cyan-500/30 via-transparent to-purple-600/20",
  },
  {
    id: 3,
    title: "Landing Rocket",
    subtitle: "Growth • 250% Conversions",
    icon: "rocket",
    gradient: "from-blue-600/30 via-transparent to-cyan-400/20",
  },
  {
    id: 4,
    title: "App UI Magic",
    subtitle: "Mobile • Design System",
    icon: "smartphone",
    gradient: "from-pink-500/30 via-transparent to-purple-600/20",
  },
  {
    id: 5,
    title: "SEO Powerhouse",
    subtitle: "Organic • +800% Traffic",
    icon: "trending-up",
    gradient: "from-green-500/30 via-transparent to-cyan-500/20",
  },
  {
    id: 6,
    title: "Brand Explosion",
    subtitle: "Identity • Full Rebrand",
    icon: "sparkles",
    gradient: "from-orange-500/30 via-transparent to-pink-500/20",
  },
]

const iconMap: Record<string, React.ReactNode> = {
  "shopping-bag": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v8m0 0H5m14 0H9" />
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  smartphone: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  "trending-up": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  sparkles: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

interface PortfolioCardProps {
  project: (typeof projects)[0]
  index: number
}

function PortfolioCard({ project, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x: x * 20, y: y * 20 })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="h-64 md:h-72 cursor-pointer group"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? mousePosition.y : 0,
          rotateY: isHovered ? mousePosition.x : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          perspective: "1000px",
        }}
        className="w-full h-full relative"
      >
        {/* Glass Card Container */}
        <div
          className="w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br"
          style={{
            background: `linear-gradient(135deg, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8))`,
            backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)`,
            boxShadow: isHovered
              ? "0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.1)"
              : "0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between relative">
            {/* Radial gradient background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)`,
              }}
            />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top: Icon */}
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-cyan-400 mb-4 flex-shrink-0"
              >
                {iconMap[project.icon]}
              </motion.div>

              {/* Middle: Title & Subtitle */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-white/60">{project.subtitle}</p>
              </div>

              {/* Bottom: CTA - Only visible on hover */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-cyan-400 font-semibold text-sm pt-4 border-t border-white/10"
              >
                <span>Entdecke Case Study</span>
                <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Neon glow pulse on hover */}
            {isHovered && (
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 10px rgba(0, 255, 136, 0.4)",
                    "0 0 30px rgba(0, 255, 136, 0.8)",
                    "0 0 10px rgba(0, 255, 136, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
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
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
      style={{ background: "#0a0a0a" }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(160, 32, 240, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 text-balance bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff, #00ff88, #00d4ff)",
              backgroundSize: "200% 100%",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            {t("portfolio_title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {t("portfolio_subtitle")}
          </motion.p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <a href={`/portfolio/projekt${project.id}`} className="block h-full">
                <PortfolioCard project={project} index={i} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}

