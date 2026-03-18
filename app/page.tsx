import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { LanguageProvider } from "@/lib/language-context"
import { SmoothScroll } from "@/components/smooth-scroll"

// Lazy load heavy components below the fold for better LCP
const AnalyzerSection = dynamic(() => import("@/components/analyzer-section").then(mod => ({ default: mod.AnalyzerSection })), {
  loading: () => null,
  ssr: true,
})
const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(mod => ({ default: mod.PortfolioSection })), {
  loading: () => null,
  ssr: true,
})
const ReviewsSection = dynamic(() => import("@/components/reviews-section").then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => null,
  ssr: true,
})
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => null,
  ssr: true,
})
const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => null,
  ssr: true,
})

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <AnalyzerSection />
          <PortfolioSection />
          <ReviewsSection />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  )
}
