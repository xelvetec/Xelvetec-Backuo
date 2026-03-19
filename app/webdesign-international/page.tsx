import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "International Web Design Agency – Professional Websites Worldwide | XelveTec",
  description: "XelveTec is your international web design agency. We create modern, SEO-optimized websites for businesses worldwide. Serving clients in Europe, Asia, Americas and globally. Prices from €499.",
  keywords: ["web design agency international", "professional website design Europe", "web design Switzerland", "international web agency", "website design worldwide", "SEO optimization international", "multilingual website design", "web design English", "European web agency"],
  alternates: {
    canonical: "https://xelvetec.com/webdesign-international",
    languages: { "en": "https://xelvetec.com/webdesign-international" },
  },
  openGraph: {
    title: "International Web Design Agency – XelveTec",
    description: "Professional web design services for businesses worldwide. Websites from €499.",
    url: "https://xelvetec.com/webdesign-international",
    locale: "en_US",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "XelveTec",
  url: "https://xelvetec.com/webdesign-international",
  telephone: "+41768443375",
  email: "business@xelvetec.com",
  areaServed: { "@type": "Place", name: "Worldwide" },
  priceRange: "€499 – €1999",
}

export default function WebdesignInternationalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">International • Worldwide • EN</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            International Web Design –<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Your Agency Based in Switzerland
            </span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto text-balance">
            XelveTec is a premium web design agency based in Switzerland, serving clients worldwide. We create modern, fast and SEO-optimized websites for businesses in Europe and beyond. Starting from €499.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Get a Free Quote
            </Link>
            <Link href="/#portfolio" className="px-8 py-4 border border-white/20 rounded-xl font-semibold hover:border-purple-500/50 transition-colors">
              View Portfolio
            </Link>
          </div>
        </section>

        <section className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Why Choose XelveTec?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Swiss Quality", desc: "Based in Switzerland, we deliver the precision and reliability the Swiss are known for. Your website will be built to last." },
              { title: "Transparent Pricing", desc: "No hidden fees. Basic websites from €499, Business packages from €999, E-Commerce from €1,999." },
              { title: "International SEO", desc: "We optimize for international searches and help your business rank on Google in your target markets." },
              { title: "Multilingual Websites", desc: "We build websites in German, Turkish, English, French and more – perfect for international audiences." },
              { title: "Fast Delivery", desc: "Your new website is ready in 1–2 weeks. No lengthy processes, just results." },
              { title: "Long-term Support", desc: "We're here after launch too – updates, hosting, SEO maintenance and technical support." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-bold text-lg mb-2 text-purple-300">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Serving Clients Worldwide</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Switzerland", "Germany", "Austria", "Turkey", "France", "Italy", "UK", "Netherlands", "Belgium", "Spain", "Portugal", "USA", "Canada", "Australia"].map((country) => (
              <span key={country} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                {country}
              </span>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing (EUR)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic", price: "€499", features: ["Responsive Design", "Up to 5 Pages", "Contact Form", "Basic SEO", "SSL Certificate"] },
              { name: "Business", price: "€999", features: ["Everything in Basic", "Up to 15 Pages", "CMS Integration", "Advanced SEO", "Google Analytics"], highlight: true },
              { name: "E-Commerce", price: "€1,999", features: ["Everything in Business", "Online Shop", "Payment Integration", "Product Management", "Performance Optimization"] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-6 rounded-2xl border ${pkg.highlight ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 bg-white/5"}`}>
                <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                <p className={`text-3xl font-bold mb-4 ${pkg.highlight ? "text-purple-400" : "text-white"}`}>{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="text-sm text-white/60 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/#contact" className="block text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-sm hover:opacity-90 transition-opacity">
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">FAQ – International Web Design</h2>
          <div className="space-y-4">
            {[
              { q: "How much does a professional website cost?", a: "At XelveTec, websites start from €499 for a Basic package. Business websites with more features start at €999, and E-Commerce solutions start at €1,999." },
              { q: "Do you work with clients outside of Europe?", a: "Yes, we work with clients worldwide. All communication is done remotely via email, video call, and messaging platforms." },
              { q: "Can you create multilingual websites?", a: "Yes, we specialize in multilingual websites. We can build your site in German, English, Turkish, French, and more." },
              { q: "How long does it take to build a website?", a: "A Basic website is typically ready in 1–2 weeks. More complex projects may take 2–4 weeks depending on scope." },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready for Your New Website?</h2>
          <p className="text-white/60 mb-8">Free consultation – fast, professional, international.</p>
          <Link href="/#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Get a Free Quote Now
          </Link>
        </section>
      </main>
    </>
  )
}
