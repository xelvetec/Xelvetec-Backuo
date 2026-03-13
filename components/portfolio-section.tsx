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
    gradient: "from-[#A020F0]/40 to-[#1E3A8A]/40",
    image: "/images/portfolio-oda-schmidt.png",
    url: "https://magnificent-narwhal-b530a8.netlify.app/",
  },
  {
    id: "istanbul",
    title: "Istanbul Fashion Co.",
    category: "Business",
    gradient: "from-[#00D4FF]/40 to-[#7C3AED]/40",
  },
  {
    id: "fintech",
    title: "Swiss FinTech App",
    category: "E-Commerce",
    gradient: "from-[#1E3A8A]/40 to-[#A020F0]/40",
  },
  {
    id: "berlin",
    title: "Berlin Creative Studio",
    category: "Basic",
    gradient: "from-[#7C3AED]/40 to-[#00D4FF]/40",
  },
  {
    id: "vienna",
    title: "Vienna Coffee House",
    category: "Business",
    gradient: "from-[#A020F0]/40 to-[#00D4FF]/40",
  },
  {
    id: "antalya",
    title: "Antalya Travel Agency",
    category: "E-Commerce",
    gradient: "from-[#00D4FF]/40 to-[#1E3A8A]/40",
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
  const [isHovered, setIsHovered] = useState(false)
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
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    })
  }

  const CardContent = () => (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setIsHovered(false) }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: `perspective(800px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) scale(${isHovered ? 1.05 : 1}) ${
          isVisible ? "translateY(0)" : "translateY(48px)"
        }`,
        boxShadow: isHovered 
          ? "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(160, 32, 240, 0.3)"
          : "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Image or gradient background */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          className="w-full h-full aspect-[4/3] object-cover"
        />
      ) : (
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
        >
          <div className="text-7xl font-bold text-foreground/10">{project.title[0]}</div>
        </div>
      )}
      
      {/* Shimmer scanline effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          backgroundSize: "200% 100%",
          animation: isHovered ? "shimmer 1.5s infinite" : "none",
        }}
      />
      
      {/* Rainbow ring on hover */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "inset 0 0 20px rgba(160, 32, 240, 0.3), inset 0 0 40px rgba(0, 212, 255, 0.2)",
        }}
      />

      {/* Glass overlay with zoom */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "linear-gradient(135deg, rgba(160, 32, 240, 0.2), rgba(0, 212, 255, 0.15))",
        }}
      >
        <ExternalLink className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
        <h4 className="text-lg font-bold text-white text-center px-4">{project.title}</h4>
        <span
          className="text-xs px-4 py-1.5 rounded-full font-medium"
          style={{
            background: "linear-gradient(135deg, rgba(160,32,240,0.4), rgba(0,212,255,0.3))",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 0 15px rgba(160, 32, 240, 0.4)",
          }}
        >
          {project.category}
        </span>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <PortfolioCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
