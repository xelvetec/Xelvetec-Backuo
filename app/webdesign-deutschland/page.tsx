import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Webdesign Deutschland – Professionelle Websites für deutsche Unternehmen | XelveTec",
  description: "XelveTec erstellt moderne, SEO-optimierte Websites für Unternehmen in Deutschland. Berlin, München, Hamburg, Frankfurt und bundesweit. Preise ab 499€.",
  keywords: ["Webdesign Deutschland", "Website erstellen lassen Berlin", "Webdesign Agentur Deutschland", "Homepage erstellen München", "Webseite Hamburg", "Webdesign Frankfurt", "KMU Website Deutschland", "SEO Deutschland", "Website 499 Euro"],
  alternates: {
    canonical: "https://xelvetec.com/webdesign-deutschland",
    languages: { "de-DE": "https://xelvetec.com/webdesign-deutschland" },
  },
  openGraph: {
    title: "Webdesign Deutschland – XelveTec",
    description: "Professionelle Webdesign Services für deutsche Unternehmen. Websites ab 499€.",
    url: "https://xelvetec.com/webdesign-deutschland",
    locale: "de_DE",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "XelveTec",
  url: "https://xelvetec.com/webdesign-deutschland",
  telephone: "+41768443375",
  email: "business@xelvetec.com",
  areaServed: { "@type": "Country", name: "Germany" },
  priceRange: "€499 – €1999",
}

export default function WebdesignDeutschlandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">Deutschland • DE • EUR</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Webdesign Deutschland –<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Moderne Websites für Ihr Unternehmen
            </span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto text-balance">
            XelveTec erstellt professionelle, schnelle und SEO-optimierte Websites für Unternehmen in ganz Deutschland. Berlin, München, Hamburg, Frankfurt und bundesweit. Preise ab 499€.
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

        <section className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Ihre Webdesign Agentur für Deutschland
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "DSGVO-konform", desc: "Alle Websites werden vollständig DSGVO-konform erstellt. Datenschutz hat bei uns höchste Priorität." },
              { title: "Faire Euro-Preise", desc: "Transparente Preise ohne versteckte Kosten. Basic ab 499€, Business ab 999€, E-Commerce ab 1.999€." },
              { title: "Google-Rankings in Deutschland", desc: "Wir optimieren für deutsche Suchanfragen und helfen Ihnen, auf Google.de sichtbar zu werden." },
              { title: "Schnelle Umsetzung", desc: "Ihre neue Website ist in 1–3 Wochen fertig. Kein langer Vorlauf, keine bürokratischen Prozesse." },
              { title: "Deutsch als Muttersprache", desc: "Unser Team kommuniziert auf muttersprachlichem Niveau. Keine Sprachbarrieren, klare Absprachen." },
              { title: "Langfristige Partnerschaft", desc: "Wir sind auch nach dem Launch für Sie da – Updates, Hosting, SEO-Betreuung und mehr." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-bold text-lg mb-2 text-purple-300">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-balance">Webdesign bundesweit in Deutschland</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Berlin", "München", "Hamburg", "Frankfurt", "Köln", "Düsseldorf", "Stuttgart", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden", "Hannover", "Nürnberg", "Freiburg"].map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                {city}
              </span>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-balance">Webdesign Preise Deutschland (EUR)</h2>
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

        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-balance">FAQ – Webdesign Deutschland</h2>
          <div className="space-y-4">
            {[
              { q: "Was kostet eine professionelle Website in Deutschland?", a: "Bei XelveTec starten unsere Websites ab 499€. Für Business-Seiten mit mehr als 10 Seiten beginnen die Preise bei 999€. E-Commerce-Lösungen gibt es ab 1.999€." },
              { q: "Erstellt XelveTec auch DSGVO-konforme Websites?", a: "Ja, alle unsere Websites werden vollständig DSGVO-konform entwickelt inklusive Cookie-Banner, Datenschutzerklärung und rechtskonformer Formulare." },
              { q: "Kann ich die Website nach der Fertigstellung selbst bearbeiten?", a: "Ja, bei Business- und E-Commerce-Paketen integrieren wir ein Content Management System (CMS), mit dem Sie Inhalte selbst einfach bearbeiten können." },
              { q: "Bieten Sie auch laufende SEO-Betreuung an?", a: "Ja, wir bieten monatliche SEO-Pakete zur kontinuierlichen Verbesserung Ihrer Google-Rankings in Deutschland an." },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ihre Website wartet auf Sie</h2>
          <p className="text-white/60 mb-8">Kostenlose Erstberatung – unverbindlich und auf Deutsch.</p>
          <Link href="/#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Jetzt kostenlos anfragen
          </Link>
        </section>
      </main>
    </>
  )
}
