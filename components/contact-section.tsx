"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

declare global {
  interface Window {
    emailjs: any
  }
}

export function ContactSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    setIsLoading(true)
    
    try {
      // Wait for EmailJS to load (max 5 seconds)
      let attempts = 0
      while (!window.emailjs && attempts < 50) {
        await new Promise(r => setTimeout(r, 100))
        attempts++
      }

      if (!window.emailjs) {
        console.error('[v0] EmailJS not loaded')
        alert(t('contact_error'))
        setIsLoading(false)
        return
      }

      // Get form data
      const formData = new FormData(formRef.current)
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const message = formData.get('message') as string

      // Send via EmailJS
      const result = await window.emailjs.send(
        'service_wzudoxa',
        'template_mopajh7',
        {
          to_email: 'info@xelvetec.ch',
          from_name: name,
          from_email: email,
          message: message,
          reply_to: email,
        },
        'eIsW61NVlqzcGHV4w'
      )

      console.log('[v0] Email sent:', result)
      alert(t('contact_success'))
      formRef.current.reset()
    } catch (error) {
      console.error('[v0] Error:', error)
      alert(t('contact_error'))
    } finally {
      setIsLoading(false)
    }
  }

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
            <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                  {t("contact_name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
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
                  name="email"
                  type="email"
                  required
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
                  name="message"
                  rows={5}
                  required
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
                disabled={isLoading}
                className="group flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #A020F0, #1E3A8A)",
                  color: "#fff",
                }}
              >
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                {isLoading ? t("contact_sending") : t("contact_send")}
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
                <Mail className="w-5 h-5" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>
                <p className="text-sm text-foreground/50">info@xelvetec.ch</p>
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
                <p className="text-sm text-foreground/50">+41 76 844 33 75</p>
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
                <p className="text-sm text-foreground/50">Egelseestrasse 31<br />8280 Kreuzlingen, Schweiz</p>
              </div>
            </div>

            {/* Google Maps */}
            <iframe
              width="100%"
              height="220"
              style={{
                border: 0,
                borderRadius: "0.5rem",
              }}
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.1234567890!2d8.9781!3d47.6508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b2c8b5c5c5c5d%3A0x123456789!2sEgelseestrasse%2031%2C%208280%20Kreuzlingen%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1234567890"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
