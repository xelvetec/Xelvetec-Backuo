"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Instagram, Facebook, MessageCircle, Linkedin } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/xelvetec",
      icon: Instagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/18RJcnouEu/?mibextid=wwXIfr",
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/xelvetec/",
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/41768443375",
      icon: MessageCircle,
    },
  ]

  return (
    <footer className="relative py-12 overflow-hidden border-t border-foreground/5">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(160,32,240,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/xelvetec-logo.png"
              alt="XelveTec"
              width={32}
              height={32}
            />
            <span
              className="text-lg font-bold"
              style={{
                background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              XelveTec
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-foreground/40">
            <a href="/impressum" className="hover:text-foreground transition-colors">
              {t("footer_impressum")}
            </a>
            <a href="/datenschutz" className="hover:text-foreground transition-colors">
              {t("footer_privacy")}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/60 transition-all duration-300 hover:scale-110 hover:text-foreground"
                  style={{
                    background: "rgba(160,32,240,0.1)",
                    border: "1px solid rgba(160,32,240,0.2)",
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
          <p className="text-xs text-foreground/30">
            &copy; {year} XelveTec. {t("footer_rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
