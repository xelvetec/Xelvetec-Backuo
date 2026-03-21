import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { AnalyzerSection } from "@/components/analyzer-section"
import { EmailVerificationBanner } from "@/components/email-verification-banner"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider } from "@/lib/auth-context"
import { SmoothScroll } from "@/components/smooth-scroll"

// Lazy load heavy components below the fold for better LCP
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
    <AuthProvider>
      <LanguageProvider>
        <SmoothScroll>
          <Navbar />
          <EmailVerificationBanner />
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
    </AuthProvider>
  )
}
