import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog – Webdesign Tipps & News | XelveTec",
  description: "XelveTec Blog: Webdesign Tipps, SEO-Ratgeber und Neuigkeiten rund ums Web. Artikel auf Deutsch, Türkisch und Englisch für Unternehmen in der Schweiz, Deutschland, Österreich und Türkei.",
  keywords: ["Webdesign Blog", "Website Tipps", "SEO Ratgeber", "Webdesign News", "Website erstellen Tipps"],
  alternates: { canonical: "https://xelvetec.com/blog" },
  openGraph: {
    title: "Blog – Webdesign Tipps & News | XelveTec",
    description: "Webdesign Tipps, SEO-Ratgeber und News auf Deutsch, Türkisch und Englisch.",
    url: "https://xelvetec.com/blog",
  },
}

const articles = [
  {
    slug: "webseite-kosten-schweiz-2026",
    lang: "DE",
    langColor: "text-blue-400",
    date: "19. März 2026",
    title: "Was kostet eine Website in der Schweiz? Preisguide 2026",
    excerpt: "Eine professionelle Website ist für Schweizer KMU unverzichtbar. Aber was kostet sie wirklich? Wir erklären alle Kostenfaktoren transparent.",
    readTime: "5 Min",
  },
  {
    slug: "profesyonel-web-sitesi-fiyatlari",
    lang: "TR",
    langColor: "text-red-400",
    date: "19 Mart 2026",
    title: "Profesyonel Web Sitesi Ne Kadar Tutar? 2026 Fiyat Rehberi",
    excerpt: "Türkiye'de profesyonel bir web sitesi yaptırmanın maliyeti nedir? Tüm fiyat faktörlerini şeffaf bir şekilde açıklıyoruz.",
    readTime: "5 dk",
  },
  {
    slug: "web-design-prices-europe",
    lang: "EN",
    langColor: "text-green-400",
    date: "March 19, 2026",
    title: "Web Design Prices in Europe: Switzerland vs Germany vs Austria",
    excerpt: "How much does a professional website cost in different European countries? We compare prices in Switzerland, Germany, Austria and more.",
    readTime: "5 min",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
      <section className="pt-32 pb-16 px-4 max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Webdesign Tipps & News</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Ratgeber, Preisguides und Tipps für Unternehmen in der Schweiz, Deutschland, Österreich und Türkei. Mehrsprachig auf Deutsch, Türkisch und Englisch.
        </p>
      </section>

      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 ${article.langColor}`}>{article.lang}</span>
                <span className="text-xs text-white/40">{article.date}</span>
                <span className="text-xs text-white/40">{article.readTime} Lesezeit</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors text-balance">{article.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{article.excerpt}</p>
              <p className="text-purple-400 text-sm mt-4 font-medium">Weiterlesen &rarr;</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
