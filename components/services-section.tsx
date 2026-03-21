"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles, Globe, Lock, Zap, Headphones, RotateCcw } from "lucide-react"
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
  oneTimePrice?: string
  subscriptionPrice?: string
  subscriptionFeatures?: Array<{ icon: React.ReactNode; key: string }>
}

function PricingCard({ 
  titleKey, 
  descKey, 
  featureKeys, 
  priceKey, 
  popular, 
  delay,
  oneTimePrice,
  subscriptionPrice,
  subscriptionFeatures
}: PricingCardProps) {
  const { country, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [pricingMode, setPricingMode] = useState<'onetime' | 'subscription'>('onetime')
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
    const x = (e.clientX - rect.left - rect.width / 2) / 15
    const y = (e.clientY - rect.top - rect.height / 2) / 15
    setMousePos({ x, y })
  }

  function handleMouseLeave() {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const priceString = prices[priceKey][country]
  const priceNum = parseInt(priceString.replace(/[^\d]/g, ""))
  const animatedPrice = useAnimatedCounter(priceNum, 1500, isVisible)
  const currency = priceString.includes("CHF") ? " CHF" : priceString.includes("€") ? "€" : " ₺"
  const formattedPrice = currency === "€" 
    ? `${animatedPrice.toLocaleString("de-DE")}${currency}`
    : `${animatedPrice.toLocaleString("de-DE")}${currency}`

  // Subscription price handling
  let subscriptionPriceFormatted = ""
  if (subscriptionPrice) {
    const subNum = parseInt(subscriptionPrice.replace(/[^\d]/g, ""))
    const subAnimated = useAnimatedCounter(subNum, 1500, isVisible)
    subscriptionPriceFormatted = currency === "€" 
      ? `${subAnimated.toLocaleString("de-DE")}${currency}`
      : `${subAnimated.toLocaleString("de-DE")}${currency}`
  }

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

        {/* Popular badge */}
        {popular && (
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

        {/* Pricing Mode Toggle */}
        <div className="flex gap-2 mb-6 p-1 rounded-lg" style={{ background: "rgba(160,32,240,0.1)" }}>
          <button
            onClick={() => setPricingMode('onetime')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
              pricingMode === 'onetime' 
                ? 'text-white' 
                : 'text-foreground/60'
            }`}
            style={{
              background: pricingMode === 'onetime' ? 'linear-gradient(135deg, #A020F0, #00D4FF)' : 'transparent'
            }}
          >
            {t("pricing_onetime")}
          </button>
          {subscriptionPrice && (
            <button
              onClick={() => setPricingMode('subscription')}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
                pricingMode === 'subscription' 
                  ? 'text-white' 
                  : 'text-foreground/60'
              }`}
              style={{
                background: pricingMode === 'subscription' ? 'linear-gradient(135deg, #A020F0, #00D4FF)' : 'transparent'
              }}
            >
              {t("pricing_subscription")}
            </button>
          )}
        </div>

        {/* Animated Price */}
        {pricingMode === 'onetime' ? (
          <div className="mb-2">
            <div className="text-sm text-foreground/60 mb-1">{t("pricing_onetime")}</div>
            <span 
              className="text-4xl font-bold"
              style={{
                background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF, #fff)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formattedPrice}
            </span>
            <p className="text-xs text-foreground/50 mt-1">{t("pricing_onetime_desc")}</p>
          </div>
        ) : (
          <div className="mb-2">
            <div className="text-sm text-foreground/60 mb-1">{t("pricing_subscription")}</div>
            <div className="flex items-baseline gap-1">
              <span 
                className="text-4xl font-bold"
                style={{
                  background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF, #fff)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {subscriptionPriceFormatted}
              </span>
              <span className="text-foreground/50 text-sm">/{t("pricing_per_month")}</span>
            </div>
            <p className="text-xs text-foreground/50 mt-1">{t("pricing_subscription_desc")}</p>
          </div>
        )}

        {/* Features with stagger animation */}
        {pricingMode === 'onetime' ? (
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
        ) : (
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {subscriptionFeatures?.map((feature, i) => (
              <li 
                key={feature.key}
                className={`flex items-start gap-3 text-sm text-foreground/70 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${delay + 100 + i * 80}ms` }}
              >
                <div className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00D4FF" }}>
                  {feature.icon}
                </div>
                {t(feature.key)}
              </li>
            ))}
          </ul>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          {pricingMode === 'onetime' ? (
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
              <span className="relative z-10">{t("pricing_onetime_cta")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#A020F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ) : (
            <button
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
              <span className="relative z-10">{t("pricing_subscription_cta")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#A020F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        {/* Shimmer scanline */}
        <div className="absolute inset-0 animate-shimmer rounded-3xl pointer-events-none" />
      </div>
    </div>
  )
}
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

        {/* Popular badge */}
        {popular && (
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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <PricingCard
            titleKey="basic_title"
            descKey="basic_desc"
            featureKeys={["basic_f1", "basic_f2", "basic_f3", "basic_f4", "basic_f5"]}
            priceKey="basic"
            delay={0}
            oneTimePrice="499"
            subscriptionPrice="29.90"
            subscriptionFeatures={[
              { icon: <Globe className="w-4 h-4" />, key: "subscription_hosting" },
              { icon: <Globe className="w-4 h-4" />, key: "subscription_domain" },
              { icon: <Lock className="w-4 h-4" />, key: "subscription_ssl" },
              { icon: <Zap className="w-4 h-4" />, key: "subscription_updates" },
              { icon: <Headphones className="w-4 h-4" />, key: "subscription_support" },
            ]}
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
            oneTimePrice="999"
            subscriptionPrice="79.90"
            subscriptionFeatures={[
              { icon: <Globe className="w-4 h-4" />, key: "subscription_hosting" },
              { icon: <Globe className="w-4 h-4" />, key: "subscription_domain" },
              { icon: <Lock className="w-4 h-4" />, key: "subscription_ssl" },
              { icon: <Zap className="w-4 h-4" />, key: "subscription_updates" },
              { icon: <Headphones className="w-4 h-4" />, key: "subscription_support" },
            ]}
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
            oneTimePrice="1999"
            subscriptionPrice="199.90"
            subscriptionFeatures={[
              { icon: <Globe className="w-4 h-4" />, key: "subscription_hosting" },
              { icon: <Globe className="w-4 h-4" />, key: "subscription_domain" },
              { icon: <Lock className="w-4 h-4" />, key: "subscription_ssl" },
              { icon: <Zap className="w-4 h-4" />, key: "subscription_updates" },
              { icon: <Headphones className="w-4 h-4" />, key: "subscription_support" },
            ]}
          />
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
