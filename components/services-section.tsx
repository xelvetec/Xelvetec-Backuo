"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { prices } from "@/lib/translations"

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number
    let animationId: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(target * easeOut))
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [target, duration, isVisible])
  
  return count
}

interface PricingCardProps {
  titleKey: string
  descKey: string
  featureKeys: string[]
  priceKey: keyof typeof prices
  popular?: boolean
  delay: number
  badge?: string
  featured?: boolean
}

function PricingCard({ titleKey, descKey, featureKeys, priceKey, popular, delay, badge, featured }: PricingCardProps) {
  const { country, t } = useLanguage()
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
    // Magnetic cursor attract - card follows mouse slightly
    const x = (e.clientX - rect.left - rect.width / 2) / 15
    const y = (e.clientY - rect.top - rect.height / 2) / 15
    setMousePos({ x, y })
  }

  function handleMouseLeave() {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const priceString = prices[priceKey][country]
  console.log("[v0] Country:", country, "Price Key:", priceKey, "Price String:", priceString)
  const priceNum = parseInt(priceString.replace(/[^\d]/g, ""))
  const animatedPrice = useAnimatedCounter(priceNum, 1500, isVisible)
  const currency = priceString.includes("CHF") ? " CHF" : priceString.includes("€") ? "€" : " ₺"
  const formattedPrice = currency === "€" 
    ? `${animatedPrice.toLocaleString("de-DE")}${currency}`
    : `${animatedPrice.toLocaleString("de-DE")}${currency}`

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl p-px transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) translateX(${mousePos.x * 2}px) translateY(${mousePos.y * 2}px) ${
          isVisible ? "translateY(0)" : "translateY(48px)"
        }`,
        background: popular
          ? "linear-gradient(135deg, #A020F0, #00D4FF)"
          : "linear-gradient(135deg, rgba(160,32,240,0.4), rgba(0,212,255,0.3))",
      }}
    >
      <div 
        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden transition-all duration-300"
        style={{
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          background: "linear-gradient(135deg, rgba(160, 32, 240, 0.15), rgba(0, 212, 255, 0.08))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered 
            ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(160, 32, 240, 0.3), 0 0 80px rgba(0, 212, 255, 0.2)"
            : "0 12px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(160, 32, 240, 0.1)",
        }}
      >
        {/* Neon glow pulse on hover */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: "inset 0 0 30px rgba(160, 32, 240, 0.15), inset 0 0 60px rgba(0, 212, 255, 0.1)",
          }}
        />

        {/* Bestseller badge - overrides popular badge for featured */}
        {badge && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #A020F0, #00D4FF)",
              color: "#fff",
            }}
          >
            <Sparkles className="w-4 h-4" />
            {badge}
          </div>
        )}

        {/* Popular badge - secondary indicator */}
        {popular && !badge && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #A020F0, #00D4FF)",
              color: "#fff",
            }}
          >
            <Sparkles className="w-3 h-3" />
            {t("popular")}
          </div>
        )}

        {/* Title & description */}
        <h3 className="text-xl font-bold text-foreground mb-2">{t(titleKey)}</h3>
        <p className="text-sm text-foreground/50 mb-6">{t(descKey)}</p>

        {/* Animated Price */}
        <div className="mb-8">
          <span 
            className="text-4xl font-bold animate-gradient-text"
            style={{
              background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF, #fff)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: isVisible ? "gradient-shift 3s ease infinite" : "none",
            }}
          >
            {formattedPrice}
          </span>
        </div>

        {/* Features with stagger animation */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {featureKeys.map((key, i) => (
            <li 
              key={key} 
              className={`flex items-start gap-3 text-sm text-foreground/70 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${delay + 100 + i * 80}ms` }}
            >
              <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00D4FF" }} />
              {t(key)}
            </li>
          ))}
        </ul>

        {/* CTA with liquid effect */}
        <a
          href="#contact"
          className="group block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
          style={
            popular
              ? {
                  background: "linear-gradient(135deg, #A020F0, #00D4FF)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(160,32,240,0.4)",
                }
              : {
                  background: "rgba(160,32,240,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(160,32,240,0.4)",
                }
          }
        >
          <span className="relative z-10">{t("hero_cta")}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#A020F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>

        {/* Shimmer scanline */}
        <div className="absolute inset-0 animate-shimmer rounded-3xl pointer-events-none" />
      </div>
    </div>
  )
}

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with more purple/cyan */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(160,32,240,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(0,212,255,0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header with glitch reveal */}
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
            {t("services_title")}
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">{t("services_subtitle")}</p>
        </div>

        {/* Cards - Starter Bundle featured first with 4-column on desktop */}
        <div className="grid md:grid-cols-4 gap-6 items-start mb-10">
          {/* Featured Starter Bundle - takes 2 columns on desktop */}
          <PricingCard
            titleKey="starter_bundle_title"
            descKey="starter_bundle_desc"
            featureKeys={["starter_bundle_f1", "starter_bundle_f2", "starter_bundle_f3", "starter_bundle_f4", "starter_bundle_f5"]}
            priceKey="basic"
            popular
            badge={t("starter_bundle_badge") || "Bestseller"}
            delay={0}
            featured
          />

          {/* Other packages */}
          <PricingCard
            titleKey="business_title"
            descKey="business_desc"
            featureKeys={[
              "business_f1",
              "business_f2",
              "business_f3",
              "business_f4",
              "business_f5",
              "business_f6",
            ]}
            priceKey="business"
            delay={150}
          />
          <PricingCard
            titleKey="ecommerce_title"
            descKey="ecommerce_desc"
            featureKeys={[
              "ecommerce_f1",
              "ecommerce_f2",
              "ecommerce_f3",
              "ecommerce_f4",
              "ecommerce_f5",
              "ecommerce_f6",
            ]}
            priceKey="ecommerce"
            delay={300}
          />
          
          {/* Hourly solutions */}
          <PricingCard
            titleKey="hourly_title"
            descKey="hourly_desc"
            featureKeys={["hourly_f1", "hourly_f2", "hourly_f3", "hourly_f4", "hourly_f5"]}
            priceKey="hourly"
            delay={450}
          />
        </div>

        {/* Old grid kept for reference - will be removed after testing */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-start">
        </div>

        {/* Individuelle Lösungen – mittig darunter */}
        <div className="flex justify-center mt-10">
          <div className="w-full md:max-w-sm">
            <PricingCard
              titleKey="hourly_title"
              descKey="hourly_desc"
              featureKeys={["hourly_f1", "hourly_f2", "hourly_f3", "hourly_f4", "hourly_f5"]}
              priceKey="hourly"
              delay={450}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
