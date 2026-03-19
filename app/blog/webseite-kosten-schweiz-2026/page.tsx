import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Was kostet eine Website in der Schweiz? Preisguide 2026 | XelveTec",
  description: "Was kostet eine professionelle Website in der Schweiz? Wir erklären alle Kostenfaktoren: Design, Entwicklung, Hosting, SEO. Preise von 499 CHF bis 5000 CHF und mehr.",
  keywords: ["Website kosten Schweiz", "was kostet eine Homepage Schweiz", "Webseite erstellen Kosten CHF", "Webdesign Preise Schweiz 2026", "KMU Website Preis Schweiz"],
  alternates: { canonical: "https://xelvetec.com/blog/webseite-kosten-schweiz-2026" },
  openGraph: {
    title: "Was kostet eine Website in der Schweiz? Preisguide 2026",
    description: "Alle Kostenfaktoren für eine professionelle Website in der Schweiz erklärt.",
    url: "https://xelvetec.com/blog/webseite-kosten-schweiz-2026",
    locale: "de_CH",
    type: "article",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Was kostet eine Website in der Schweiz? Preisguide 2026",
  description: "Alle Kostenfaktoren für eine professionelle Website in der Schweiz erklärt.",
  author: { "@type": "Organization", name: "XelveTec", url: "https://xelvetec.com" },
  publisher: { "@type": "Organization", name: "XelveTec", logo: { "@type": "ImageObject", url: "https://xelvetec.com/images/xelvetec-logo.png" } },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  url: "https://xelvetec.com/blog/webseite-kosten-schweiz-2026",
  inLanguage: "de-CH",
  keywords: ["Website kosten Schweiz", "Webseite erstellen Kosten", "Homepage Preis CHF"],
}

export default function WebsiteKostenSchweizPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <article className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/blog" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/50 text-sm">Deutsch</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-balance">
            Was kostet eine Website in der Schweiz? Preisguide 2026
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-10">
            <span>19. März 2026</span>
            <span>von XelveTec</span>
            <span>5 Min Lesezeit</span>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed">
            <p className="text-lg">
              Eine professionelle Website ist heute für jedes Unternehmen in der Schweiz unverzichtbar. Doch was kostet das wirklich? In diesem Preisguide erklären wir alle Kostenfaktoren transparent – ohne Fachbegriffe.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10">Die kurze Antwort: 499 CHF bis 5.000 CHF und mehr</h2>
            <p>
              Der Preis einer professionellen Website hängt von vielen Faktoren ab. Als grobe Orientierung gilt:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              {[
                { type: "Basic-Website (1–5 Seiten)", price: "499 – 800 CHF", desc: "Ideal für Einzelunternehmer und kleine Betriebe" },
                { type: "Business-Website (5–15 Seiten)", price: "999 – 2.000 CHF", desc: "Für etablierte KMU mit mehr Bedarf" },
                { type: "E-Commerce / Online-Shop", price: "1.999 – 5.000 CHF", desc: "Für Unternehmen die online verkaufen wollen" },
                { type: "Grosse Unternehmenswebsite", price: "ab 5.000 CHF", desc: "Für Konzerne und komplexe Anforderungen" },
              ].map((item) => (
                <div key={item.type} className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <p className="font-semibold text-purple-300 mb-1">{item.type}</p>
                  <p className="text-2xl font-bold mb-1">{item.price}</p>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mt-10">Was beeinflusst den Preis?</h2>
            <h3 className="text-xl font-semibold text-purple-300">1. Anzahl der Seiten</h3>
            <p>Je mehr Seiten Ihre Website hat, desto mehr Arbeit steckt dahinter. Eine 5-seitige Visitenkarten-Website kostet deutlich weniger als eine 30-seitige Unternehmenswebsite.</p>

            <h3 className="text-xl font-semibold text-purple-300">2. Design-Aufwand</h3>
            <p>Ein massgeschneidertes Design nach Ihren Corporate Identity Vorgaben kostet mehr als ein Template. Bei XelveTec bieten wir professionelle Designs zu fairen Preisen an.</p>

            <h3 className="text-xl font-semibold text-purple-300">3. SEO-Optimierung</h3>
            <p>Eine Website die niemand findet, bringt nichts. SEO-Optimierung für Schweizer Suchanfragen wie "Webseite Zürich" oder "Webdesign Bern" ist wichtig und kostet Zeit – aber sie zahlt sich aus.</p>

            <h3 className="text-xl font-semibold text-purple-300">4. Mehrsprachigkeit</h3>
            <p>In der mehrsprachigen Schweiz ist eine Website auf Deutsch, Französisch und Englisch oft sinnvoll. Pro zusätzliche Sprache rechnen Sie mit einem Aufschlag von 20–30%.</p>

            <h3 className="text-xl font-semibold text-purple-300">5. Laufende Kosten</h3>
            <p>Neben den einmaligen Erstellungskosten fallen jährlich Kosten für Hosting (ab 100 CHF/Jahr), Domain (ab 20 CHF/Jahr) und optionale Wartung an.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Tipp: Vergleichen Sie Angebote</h2>
            <p>
              Der Schweizer Markt für Webdesign ist breit. Wir empfehlen, mindestens 3 Angebote einzuholen und dabei nicht nur den Preis, sondern auch Referenzen und Leistungsumfang zu vergleichen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10">Was bietet XelveTec?</h2>
            <p>
              XelveTec ist eine Webdesign Agentur mit Sitz in Kreuzlingen (Schweiz). Wir bieten transparente Preise ab 499 CHF für professionelle Websites, die in der Schweiz und international sichtbar sind.
            </p>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-2">Kostenloser Preischeck für Ihr Projekt</h3>
              <p className="text-white/60 mb-4">Schildern Sie uns Ihr Projekt und erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot.</p>
              <Link href="/#contact" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Jetzt kostenlos anfragen
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
