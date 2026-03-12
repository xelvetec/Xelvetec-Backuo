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
        {/* Intro animation overlay */}
        {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

        {/* Main site */}
        <div
          className={`transition-opacity duration-1000 ${
            introComplete ? "opacity-100" : "opacity-0"
          }`}
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
