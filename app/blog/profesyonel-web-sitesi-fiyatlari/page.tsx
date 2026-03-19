import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Profesyonel Web Sitesi Ne Kadar Tutar? 2026 Fiyat Rehberi | XelveTec",
  description: "Türkiye'de profesyonel web sitesi fiyatları 2026. Tasarım, geliştirme, SEO ve hosting maliyetleri hakkında kapsamlı rehber. 18.999₺'den başlayan fiyatlar.",
  keywords: ["web sitesi fiyatları Türkiye", "profesyonel web sitesi ne kadar", "web tasarım maliyeti", "web sitesi yaptırma fiyat", "kurumsal web sitesi fiyat"],
  alternates: { canonical: "https://xelvetec.com/blog/profesyonel-web-sitesi-fiyatlari" },
  openGraph: {
    title: "Profesyonel Web Sitesi Ne Kadar Tutar? 2026 Fiyat Rehberi",
    description: "Türkiye'de web sitesi maliyetleri hakkında kapsamlı rehber.",
    url: "https://xelvetec.com/blog/profesyonel-web-sitesi-fiyatlari",
    locale: "tr_TR",
    type: "article",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Profesyonel Web Sitesi Ne Kadar Tutar? 2026 Fiyat Rehberi",
  author: { "@type": "Organization", name: "XelveTec", url: "https://xelvetec.com" },
  publisher: { "@type": "Organization", name: "XelveTec", logo: { "@type": "ImageObject", url: "https://xelvetec.com/images/xelvetec-logo.png" } },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  url: "https://xelvetec.com/blog/profesyonel-web-sitesi-fiyatlari",
  inLanguage: "tr-TR",
}

export default function WebSitesiFiyatlariPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <article className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/blog" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/50 text-sm">Türkçe</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-balance">
            Profesyonel Web Sitesi Ne Kadar Tutar? 2026 Fiyat Rehberi
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-10">
            <span>19 Mart 2026</span>
            <span>XelveTec tarafından</span>
            <span>5 dk okuma</span>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <p className="text-lg">
              Türkiye'de profesyonel bir web sitesi yaptırmayı düşünüyorsanız, ilk sorunuz muhtemelen "Ne kadar tutar?" olacaktır. Bu rehberde tüm fiyat faktörlerini şeffaf bir şekilde açıklıyoruz.
            </p>

            <h2 className="text-2xl font-bold text-white">Kısa Cevap: 18.999₺ ile 100.000₺ ve Üzeri</h2>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              {[
                { type: "Basic Web Sitesi (1–5 Sayfa)", price: "18.999 – 25.000₺", desc: "Bireysel girişimciler ve küçük işletmeler için" },
                { type: "Kurumsal Web Sitesi (5–15 Sayfa)", price: "29.999 – 50.000₺", desc: "Köklü KOBİ'ler için" },
                { type: "E-Ticaret / Online Mağaza", price: "49.999 – 100.000₺", desc: "Online satış yapmak isteyen işletmeler için" },
                { type: "Büyük Kurumsal Site", price: "100.000₺ ve üzeri", desc: "Karmaşık gereksinimli büyük firmalar için" },
              ].map((item) => (
                <div key={item.type} className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <p className="font-semibold text-purple-300 mb-1">{item.type}</p>
                  <p className="text-2xl font-bold mb-1">{item.price}</p>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white">Fiyatı Etkileyen Faktörler</h2>
            <h3 className="text-xl font-semibold text-purple-300">1. Sayfa Sayısı</h3>
            <p>Ne kadar çok sayfa, o kadar çok iş demektir. 5 sayfalık bir vitrin site, 30 sayfalık kurumsal siteden çok daha uygun fiyatlıdır.</p>

            <h3 className="text-xl font-semibold text-purple-300">2. Tasarım Özgünlüğü</h3>
            <p>Hazır şablonlar daha ucuzken, kurumsal kimliğinize özel tasarımlar daha pahalıdır. Ancak özgün tasarım markanızı rakiplerinizden ayırır.</p>

            <h3 className="text-xl font-semibold text-purple-300">3. SEO Optimizasyonu</h3>
            <p>Google'da üst sıralarda görünmek için SEO şarttır. "web sitesi yaptırma İstanbul" gibi aramalarda öne çıkmak için SEO yatırımı yapmak uzun vadede kazançlıdır.</p>

            <h3 className="text-xl font-semibold text-purple-300">4. Yıllık Süregelen Maliyetler</h3>
            <p>Web sitesi yapım ücreti dışında yıllık hosting (1.500₺'den başlayan), domain (300₺/yıl) ve opsiyonel bakım ücretleri de hesaba katılmalıdır.</p>

            <h2 className="text-2xl font-bold text-white">XelveTec'in Avantajları</h2>
            <p>XelveTec, İsviçre merkezli uluslararası bir web tasarım ajansıdır. Türkçe destek, uygun fiyatlar ve yüksek kaliteyi bir arada sunuyoruz.</p>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-2">Ücretsiz Fiyat Teklifi Alın</h3>
              <p className="text-white/60 mb-4">Projenizi anlatın, 24 saat içinde ücretsiz ve bağlayıcı olmayan teklifinizi alın.</p>
              <Link href="/#contact" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Ücretsiz Teklif Al
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
