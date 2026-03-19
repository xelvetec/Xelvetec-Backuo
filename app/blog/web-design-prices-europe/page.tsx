import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Web Design Prices in Europe 2026: Switzerland vs Germany vs Austria | XelveTec",
  description: "How much does a professional website cost in Europe? We compare web design prices in Switzerland (CHF), Germany (EUR), Austria (EUR) and Turkey (TRY) with a transparent breakdown.",
  keywords: ["web design prices Europe", "website cost Switzerland", "web design Germany price", "how much does a website cost", "web design agency Europe", "professional website price 2026"],
  alternates: { canonical: "https://xelvetec.com/blog/web-design-prices-europe" },
  openGraph: {
    title: "Web Design Prices in Europe 2026: Switzerland vs Germany vs Austria",
    description: "Compare web design prices across Europe: Switzerland, Germany, Austria and Turkey.",
    url: "https://xelvetec.com/blog/web-design-prices-europe",
    locale: "en_US",
    type: "article",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Web Design Prices in Europe 2026: Switzerland vs Germany vs Austria",
  author: { "@type": "Organization", name: "XelveTec", url: "https://xelvetec.com" },
  publisher: { "@type": "Organization", name: "XelveTec", logo: { "@type": "ImageObject", url: "https://xelvetec.com/images/xelvetec-logo.png" } },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  url: "https://xelvetec.com/blog/web-design-prices-europe",
  inLanguage: "en",
}

export default function WebDesignPricesEuropePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <article className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/blog" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/50 text-sm">English</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-balance">
            Web Design Prices in Europe 2026: Switzerland vs Germany vs Austria
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-10">
            <span>March 19, 2026</span>
            <span>by XelveTec</span>
            <span>5 min read</span>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <p className="text-lg">
              If you're looking for a web design agency in Europe, you've probably noticed that prices vary significantly between countries. In this guide, we compare web design costs in Switzerland, Germany, Austria and Turkey so you can make an informed decision.
            </p>

            <h2 className="text-2xl font-bold text-white">Price Comparison: Europe at a Glance</h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 pr-4 text-purple-300">Package</th>
                    <th className="text-left py-3 pr-4 text-blue-300">Switzerland (CHF)</th>
                    <th className="text-left py-3 pr-4 text-yellow-300">Germany (EUR)</th>
                    <th className="text-left py-3 pr-4 text-green-300">Austria (EUR)</th>
                    <th className="text-left py-3 text-red-300">Turkey (TRY)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { pkg: "Basic (1–5 pages)", ch: "499–800", de: "499–800", at: "499–800", tr: "18.999–25.000" },
                    { pkg: "Business (5–15 pages)", ch: "999–2.000", de: "999–1.800", at: "999–1.800", tr: "29.999–50.000" },
                    { pkg: "E-Commerce", ch: "1.999–5.000", de: "1.999–4.500", at: "1.999–4.000", tr: "49.999–100.000" },
                  ].map((row) => (
                    <tr key={row.pkg}>
                      <td className="py-3 pr-4 font-medium">{row.pkg}</td>
                      <td className="py-3 pr-4 text-white/60">{row.ch}</td>
                      <td className="py-3 pr-4 text-white/60">{row.de}</td>
                      <td className="py-3 pr-4 text-white/60">{row.at}</td>
                      <td className="py-3 text-white/60">{row.tr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-white/40">Note: Prices are market averages. XelveTec offers competitive pricing across all markets.</p>

            <h2 className="text-2xl font-bold text-white">What Affects the Price?</h2>
            <h3 className="text-xl font-semibold text-purple-300">1. Number of Pages</h3>
            <p>More pages mean more design and development work. A simple 5-page website costs significantly less than a 30-page corporate site.</p>

            <h3 className="text-xl font-semibold text-purple-300">2. Custom Design vs. Template</h3>
            <p>A fully custom design tailored to your brand will cost more than a template-based solution. However, custom designs tend to convert better and stand out from competitors.</p>

            <h3 className="text-xl font-semibold text-purple-300">3. SEO Optimization</h3>
            <p>International SEO is critical for businesses targeting multiple countries. Proper hreflang implementation, localized content and technical SEO all add to the complexity and price.</p>

            <h3 className="text-xl font-semibold text-purple-300">4. Multilingual Support</h3>
            <p>If you need your website in multiple languages (German, English, Turkish etc.), expect a 20–30% increase per additional language.</p>

            <h2 className="text-2xl font-bold text-white">Why Choose XelveTec?</h2>
            <p>
              XelveTec is a Swiss-based web design agency serving clients in Germany, Austria, Turkey and internationally. We combine Swiss quality standards with competitive pricing – giving you the best of both worlds.
            </p>
            <ul className="space-y-2">
              {["Transparent, fixed pricing – no hidden fees", "Multilingual websites (DE, TR, EN, FR and more)", "International SEO expertise", "Fast delivery in 1–3 weeks", "GDPR/DSGVO compliant"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-2">Get a Free Quote</h3>
              <p className="text-white/60 mb-4">Tell us about your project and receive a free, no-obligation quote within 24 hours.</p>
              <Link href="/#contact" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Get a Free Quote Now
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
