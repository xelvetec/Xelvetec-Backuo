import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Webdesign Schweiz – Professionelle Websites für Schweizer KMU | XelveTec",
  description: "XelveTec ist Ihre Webdesign Agentur in der Schweiz. Wir erstellen moderne, SEO-optimierte Websites für KMU in Zürich, Bern, Basel, Genf und Kreuzlingen. Preise ab 499 CHF.",
  keywords: ["Webdesign Schweiz", "Website erstellen lassen Zürich", "Webdesign Agentur Schweiz", "KMU Webseite Schweiz", "Homepage erstellen Schweiz", "Webdesign Kreuzlingen", "Webseite Bern", "Webdesign Basel", "Website CHF", "SEO Schweiz"],
  alternates: {
    canonical: "https://xelvetec.com/webdesign-schweiz",
    languages: { "de-CH": "https://xelvetec.com/webdesign-schweiz" },
  },
  openGraph: {
    title: "Webdesign Schweiz – XelveTec",
    description: "Professionelle Webdesign Services für Schweizer KMU. Websites ab 499 CHF.",
    url: "https://xelvetec.com/webdesign-schweiz",
    locale: "de_CH",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "XelveTec",
  url: "https://xelvetec.com/webdesign-schweiz",
  telephone: "+41768443375",
  email: "business@xelvetec.com",
  areaServed: { "@type": "Country", name: "Switzerland" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Egelseestrasse 31",
    addressLocality: "Kreuzlingen",
    postalCode: "8280",
    addressCountry: "CH",
  },
  priceRange: "CHF 499 – CHF 1999",
}

export default function WebdesignSchweizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">Schweiz • CH • CHF</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Webdesign Schweiz –<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Professionelle Websites für Ihr KMU
            </span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto text-balance">
            XelveTec erstellt moderne, schnelle und SEO-optimierte Websites für Unternehmen in Zürich, Bern, Basel, Genf, Kreuzlingen und der ganzen Schweiz. Preise ab 499 CHF.
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

        {/* Why XelveTec */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Warum XelveTec für Webdesign in der Schweiz?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Lokal verwurzelt", desc: "Unser Team sitzt in Kreuzlingen. Wir kennen den Schweizer Markt und die Bedürfnisse von KMU." },
              { title: "Transparente CHF-Preise", desc: "Keine versteckten Kosten. Websites ab 499 CHF, Business-Pakete ab 999 CHF, E-Commerce ab 1999 CHF." },
              { title: "SEO für Schweizer Suchanfragen", desc: "Wir optimieren Ihre Website für Schweizer Google-Suchen: 'Webseite erstellen Zürich', 'Homepage Bern' und mehr." },
              { title: "Schnelle Lieferung", desc: "Ihre neue Website ist in 1–2 Wochen fertig. Keine monatelangen Wartezeiten." },
              { title: "Mehrsprachig", desc: "Deutsch, Französisch, Italienisch, Englisch – wir erstellen mehrsprachige Websites für die ganze Schweiz." },
              { title: "Vollständiger Support", desc: "Nach dem Launch stehen wir für Updates, Änderungen und technischen Support zur Verfügung." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-bold text-lg mb-2 text-purple-300">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-balance">Webdesign in der ganzen Schweiz</h2>
          <p className="text-center text-white/60 mb-10">Wir betreuen Kunden in allen Schweizer Kantonen und Städten.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Zürich", "Bern", "Basel", "Genf", "Lausanne", "Luzern", "St. Gallen", "Kreuzlingen", "Winterthur", "Thun", "Schaffhausen", "Frauenfeld", "Konstanz", "Romanshorn"].map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                {city}
              </span>
            ))}
          </div>
        </section>

        {/* Prices */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-balance">Webdesign Preise Schweiz (CHF)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic", price: "499 CHF", features: ["Responsive Design", "Bis zu 5 Seiten", "Kontaktformular", "SEO Grundoptimierung", "SSL Zertifikat"] },
              { name: "Business", price: "999 CHF", features: ["Alles aus Basic", "Bis zu 15 Seiten", "CMS Integration", "Erweiterte SEO", "Google Analytics"], highlight: true },
              { name: "E-Commerce", price: "1.999 CHF", features: ["Alles aus Business", "Online Shop", "Zahlungsintegration", "Produkt-Management", "Performance-Optimierung"] },
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

        {/* FAQ */}
        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-balance">Häufige Fragen – Webdesign Schweiz</h2>
          <div className="space-y-4">
            {[
              { q: "Was kostet eine Website in der Schweiz?", a: "Eine professionelle Website kostet bei XelveTec ab 499 CHF. Business-Seiten ab 999 CHF, Online-Shops ab 1.999 CHF. Im Vergleich zum Schweizer Marktdurchschnitt sind unsere Preise sehr attraktiv." },
              { q: "Wie lange dauert die Erstellung einer Website?", a: "In der Regel 1–2 Wochen für eine Basic-Website, 2–4 Wochen für komplexere Projekte. Wir halten Sie stets auf dem Laufenden." },
              { q: "Bieten Sie auch Hosting in der Schweiz an?", a: "Ja, wir empfehlen und unterstützen Schweizer Hosting-Lösungen mit Serverstandort in der Schweiz für maximale Performance und DSGVO-Konformität." },
              { q: "Erstellen Sie auch mehrsprachige Websites?", a: "Ja, wir erstellen Websites auf Deutsch, Französisch, Italienisch und Englisch – ideal für die mehrsprachige Schweiz." },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Bereit für Ihre neue Website?</h2>
          <p className="text-white/60 mb-8">Kostenlose Beratung – unverbindlich und auf Deutsch.</p>
          <Link href="/#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Jetzt kostenlos anfragen
          </Link>
        </section>
      </main>
    </>
  )
}
