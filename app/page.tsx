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
import { ScrollLogo } from "@/components/scroll-logo"
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
        {/* Intro animation overlay */}
        {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

        {/* Main site - seamless transition, no container/box */}
        <div
          style={{
            opacity: introComplete ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <Navbar />
          <ScrollLogo />
          <main className="overflow-hidden">
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
