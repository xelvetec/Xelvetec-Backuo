import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Webdesign Österreich – Professionelle Websites für österreichische Unternehmen | XelveTec",
  description: "XelveTec erstellt moderne, SEO-optimierte Websites für Unternehmen in Österreich. Wien, Graz, Linz, Salzburg und österreichweit. Preise ab 499€.",
  keywords: ["Webdesign Österreich", "Website erstellen Wien", "Webdesign Agentur Österreich", "Homepage erstellen Graz", "Webseite Linz", "Webdesign Salzburg", "KMU Website Österreich", "SEO Österreich", "Website günstig Österreich"],
  alternates: {
    canonical: "https://xelvetec.com/webdesign-oesterreich",
    languages: { "de-AT": "https://xelvetec.com/webdesign-oesterreich" },
  },
  openGraph: {
    title: "Webdesign Österreich – XelveTec",
    description: "Professionelle Webdesign Services für österreichische Unternehmen. Websites ab 499€.",
    url: "https://xelvetec.com/webdesign-oesterreich",
    locale: "de_AT",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "XelveTec",
  url: "https://xelvetec.com/webdesign-oesterreich",
  telephone: "+41768443375",
  email: "business@xelvetec.com",
  areaServed: { "@type": "Country", name: "Austria" },
  priceRange: "€499 – €1999",
}

export default function WebdesignOesterreichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">Österreich • AT • EUR</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Webdesign Österreich –<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Websites für Ihr Unternehmen
            </span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto text-balance">
            XelveTec ist Ihre professionelle Webdesign Agentur für Österreich. Wien, Graz, Linz, Salzburg – wir erstellen moderne Websites die auf Google.at ranken. Ab 499€.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Kostenloses Angebot
            </Link>
            <Link href="/#portfolio" className="px-8 py-4 border border-white/20 rounded-xl font-semibold hover:border-purple-500/50 transition-colors">
              Portfolio ansehen
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Webdesign in ganz Österreich</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn", "Steyr", "Wiener Neustadt"].map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                {city}
              </span>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Webdesign Preise Österreich (EUR)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic", price: "499€", features: ["Responsive Design", "Bis zu 5 Seiten", "Kontaktformular", "SEO Grundoptimierung", "SSL Zertifikat"] },
              { name: "Business", price: "999€", features: ["Alles aus Basic", "Bis zu 15 Seiten", "CMS Integration", "Erweiterte SEO", "Google Analytics"], highlight: true },
              { name: "E-Commerce", price: "1.999€", features: ["Alles aus Business", "Online Shop", "Zahlungsintegration", "Produkt-Management", "Performance-Optimierung"] },
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
                  Jetzt anfragen
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für Ihre neue Website?</h2>
          <p className="text-white/60 mb-8">Kostenlose Erstberatung für österreichische Unternehmen.</p>
          <Link href="/#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Jetzt kostenlos anfragen
          </Link>
        </section>
      </main>
    </>
  )
}
