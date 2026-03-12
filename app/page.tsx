"use client"

import { useState, useCallback } from "react"
import { IntroAnimation } from "@/components/intro-animation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <LanguageProvider>
      <SmoothScroll>
        {/* Intro animation overlay - fullscreen, no edges */}
        {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

        {/* Main site - smooth slide up transition from intro */}
        <div
          className="min-h-screen"
          style={{
            transform: introComplete ? "translateY(0)" : "translateY(30px)",
            opacity: introComplete ? 1 : 0,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-out",
          }}
        >
          <Navbar />
          <main>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </LanguageProvider>
  )
}
