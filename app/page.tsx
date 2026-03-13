import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <PortfolioSection />
          <ReviewsSection />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  )
}
