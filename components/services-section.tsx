"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles, Globe, Lock, Zap, Headphones } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { prices } from "@/lib/translations"
import Link from "next/link"

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
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(target * easeOut))
      if (progress < 1) animationId = requestAnimationFrame(animate)
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
  oneTimePrice: string
  subscriptionPrice: string
  subscriptionFeatures: Array<{ icon: React.ReactNode; key: string }>
}

function PricingCard({ 
  titleKey, descKey, featureKeys, priceKey, popular, delay,
  oneTimePrice, subscriptionPrice, subscriptionFeatures
}: PricingCardProps) {
  const { country, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [pricingMode, setPricingMode] = useState<'onetime' | 'subscription'>('onetime')
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const priceString = prices[priceKey][country]
  const priceNum = parseInt(priceString.replace(/[^\d]/g, ""))
  const animatedPrice = useAnimatedCounter(priceNum, 1500, isVisible)
  const currency = priceString.includes("CHF") ? " CHF" : priceString.includes("€") ? "€" : " ₺"
  const formattedPrice = `${animatedPrice.toLocaleString("de-DE")}${currency}`

  // Parse subscription price correctly (handles decimals like "29.90")
  const subPriceMatch = subscriptionPrice.match(/(\d+)[.,]?(\d{0,2})/)
  const subNum = subPriceMatch ? (subPriceMatch[1] + (subPriceMatch[2] || "")) : 0
  const subDecimal = subPriceMatch ? subPriceMatch[2] : "00"
  const animatedSub = useAnimatedCounter(parseInt(subNum), 1500, isVisible)
  const subFormatted = `${(animatedSub / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${currency}`

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl p-px transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: popular ? "linear-gradient(135deg, #A020F0, #00D4FF)" : "linear-gradient(135deg, rgba(160,32,240,0.4), rgba(0,212,255,0.3))",
      }}
    >
      <div 
        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden"
        style={{
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          background: "linear-gradient(135deg, rgba(160, 32, 240, 0.15), rgba(0, 212, 255, 0.08))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {popular && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, #A020F0, #00D4FF)",
              color: "#fff",
            }}
          >
            <Sparkles className="w-3 h-3" />
            {t("popular")}
          </div>
        )}

        <h3 className="text-xl font-bold text-foreground mb-2">{t(titleKey)}</h3>
        <p className="text-sm text-foreground/50 mb-6">{t(descKey)}</p>

        <div className="flex gap-2 mb-6 p-1 rounded-lg" style={{ background: "rgba(160,32,240,0.1)" }}>
          <button
            onClick={() => setPricingMode('onetime')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
              pricingMode === 'onetime' ? 'text-white' : 'text-foreground/60'
            }`}
            style={{
              background: pricingMode === 'onetime' ? 'linear-gradient(135deg, #A020F0, #00D4FF)' : 'transparent'
            }}
          >
            {t("pricing_onetime")}
          </button>
          <button
            onClick={() => setPricingMode('subscription')}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold transition-all ${
              pricingMode === 'subscription' ? 'text-white' : 'text-foreground/60'
            }`}
            style={{
              background: pricingMode === 'subscription' ? 'linear-gradient(135deg, #A020F0, #00D4FF)' : 'transparent'
            }}
          >
            {t("pricing_subscription")}
          </button>
        </div>

        {pricingMode === 'onetime' ? (
          <>
            <div className="mb-6">
              <div className="text-sm text-foreground/60 mb-1">{t("pricing_onetime")}</div>
              <span className="text-4xl font-bold" style={{
                background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF, #fff)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {formattedPrice}
              </span>
              <p className="text-xs text-foreground/50 mt-1">{t("pricing_onetime_desc")}</p>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-foreground/70">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00D4FF" }} />
                  {t(key)}
                </li>
              ))}
            </ul>
            <a href="#contact" className="block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] relative overflow-hidden" style={{
              background: popular ? "linear-gradient(135deg, #A020F0, #00D4FF)" : "rgba(160,32,240,0.15)",
              color: "#fff",
              border: popular ? "none" : "1px solid rgba(160,32,240,0.4)",
            }}>
              {t("pricing_onetime_cta")}
            </a>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-sm text-foreground/60 mb-1">{t("pricing_subscription")}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold" style={{
                  background: "linear-gradient(90deg, #fff, #A020F0, #00D4FF, #fff)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {subFormatted}
                </span>
                <span className="text-foreground/50 text-sm">/{t("pricing_per_month")}</span>
              </div>
              <p className="text-xs text-foreground/50 mt-1">{t("pricing_subscription_desc")}</p>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {subscriptionFeatures.map((feature) => (
                <li key={feature.key} className="flex items-start gap-3 text-sm text-foreground/70">
                  <div className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00D4FF" }}>
                    {feature.icon}
                  </div>
                  {t(feature.key)}
                </li>
              ))}
            </ul>
            <Link href={`/subscription/checkout?tier=${priceKey === 'basic' ? 'basic' : priceKey === 'business' ? 'business' : 'ecommerce'}`} className="block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] relative overflow-hidden" style={{
              background: popular ? "linear-gradient(135deg, #A020F0, #00D4FF)" : "rgba(160,32,240,0.15)",
              color: "#fff",
              border: popular ? "none" : "1px solid rgba(160,32,240,0.4)",
            }}>
              {t("pricing_subscription_cta")}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("services_title")}</h2>
          <p className="text-lg text-white/60 text-balance">{t("services_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start mb-16">
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
            featureKeys={["business_f1", "business_f2", "business_f3", "business_f4", "business_f5", "business_f6"]}
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
            featureKeys={["ecommerce_f1", "ecommerce_f2", "ecommerce_f3", "ecommerce_f4", "ecommerce_f5", "ecommerce_f6"]}
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
      </div>
    </section>
  )
}
