"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ReviewsSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const reviews = [
    {
      platform: "Google Maps",
      rating: 5,
      url: "https://maps.app.goo.gl/bh2pN2rZdX1d9EeU7?g_st=ic",
      bgColor: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20",
      starColor: "#3B82F6",
    },
    {
      platform: "Trustpilot",
      rating: 4.1,
      url: "https://www.trustpilot.com/review/xelvetec.ch",
      bgColor: "from-green-500/10 to-green-600/10",
      borderColor: "border-green-500/20",
      starColor: "#10B981",
    },
  ]

  const renderStars = (rating: number, color: string) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 transition-colors"
            style={{
              fill: i < Math.floor(rating) ? color : "none",
              color: i < Math.floor(rating) ? color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 neon-text text-balance">
            Geschätzt von Kunden
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">
            Bewertungen unserer Kunden auf führenden Bewertungsplattformen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {reviews.map((review, index) => (
            <a
              key={review.platform}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${review.bgColor}`}
              />

              {/* Border */}
              <div
                className={`absolute inset-0 border rounded-2xl ${review.borderColor} pointer-events-none`}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                <h3 className="text-xl font-bold text-foreground">
                  {review.platform}
                </h3>

                {renderStars(review.rating, review.starColor)}

                <div className="flex items-center gap-2 text-sm text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Jetzt lesen</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Hover effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(160,32,240,0.15) 0%, transparent 100%)`,
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
