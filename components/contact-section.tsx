"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
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

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
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
            {t("contact_title")}
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">{t("contact_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div
            className={`glass rounded-3xl p-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                  {t("contact_name")}
                </label>
                <input
                  id="name"
                  type="text"
                  className="rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#A020F0]/50 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder={t("contact_name")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                  {t("contact_email")}
                </label>
                <input
                  id="email"
                  type="email"
                  className="rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#A020F0]/50 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder={t("contact_email")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/70">
                  {t("contact_message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#A020F0]/50 transition-all resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder={t("contact_message")}
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] neon-glow"
                style={{
                  background: "linear-gradient(135deg, #A020F0, #1E3A8A)",
                  color: "#fff",
                }}
              >
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                {t("contact_send")}
              </button>
            </form>
          </div>

          {/* Info */}
          <div
            className={`flex flex-col gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Mail className="w-5 h-5 text-foreground" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>
                <p className="text-sm text-foreground/50">info@xelvetec.com</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Phone className="w-5 h-5" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_phone")}</h4>
                <p className="text-sm text-foreground/50">+41 71 123 45 67</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <MapPin className="w-5 h-5" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_location")}</h4>
                <p className="text-sm text-foreground/50">St. Gallen, Switzerland</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden flex-1 min-h-[180px] flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "#A020F0" }} />
                <p className="text-sm text-foreground/50">St. Gallen, Switzerland</p>
                <p className="text-xs text-foreground/30 mt-1">47.4245&deg;N, 9.3767&deg;E</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
