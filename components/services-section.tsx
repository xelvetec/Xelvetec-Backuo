"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { prices } from "@/lib/translations"

interface PricingCardProps {
  titleKey: string
  descKey: string
  featureKeys: string[]
  priceKey: keyof typeof prices
  popular?: boolean
  delay: number
}

function PricingCard({ titleKey, descKey, featureKeys, priceKey, popular, delay }: PricingCardProps) {
  const { country, t } = useLanguage()
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
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setMousePos({ x, y })
  }

  function handleMouseLeave() {
    setMousePos({ x: 0, y: 0 })
  }

  const price = prices[priceKey][country]

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl p-px transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${popular ? "md:-mt-4 md:mb-4" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) ${
          isVisible ? "translateY(0)" : "translateY(48px)"
        }`,
        background: popular
          ? "linear-gradient(135deg, #A020F0, #3B82F6)"
          : "linear-gradient(135deg, rgba(160,32,240,0.3), rgba(59,130,246,0.3))",
      }}
    >
      <div 
        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden"
        style={{
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          background: "linear-gradient(135deg, rgba(160, 32, 240, 0.12), rgba(59, 130, 246, 0.08))",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(160, 32, 240, 0.1)",
        }}
      >
        {/* Popular badge */}
        {popular && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, #A020F0, #3B82F6)",
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

        {/* Price */}
        <div className="mb-8">
          <span className="text-4xl font-bold text-foreground">{price}</span>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {featureKeys.map((key) => (
            <li key={key} className="flex items-start gap-3 text-sm text-foreground/70">
              <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#A020F0" }} />
              {t(key)}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
          style={
            popular
              ? {
                  background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(160,32,240,0.3)",
                }
              : {
                  background: "rgba(160,32,240,0.1)",
                  color: "#fff",
                  border: "1px solid rgba(160,32,240,0.3)",
                }
          }
        >
          {t("hero_cta")}
        </a>

        {/* Shimmer */}
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
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(160,32,240,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance neon-text">
            {t("services_title")}
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">{t("services_subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <PricingCard
            titleKey="basic_title"
            descKey="basic_desc"
            featureKeys={["basic_f1", "basic_f2", "basic_f3", "basic_f4", "basic_f5"]}
            priceKey="basic"
            delay={0}
          />
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
            popular
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
        </div>
      </div>
    </section>
  )
}
