import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Web Tasarım Türkiye – Profesyonel Web Siteleri | XelveTec",
  description: "XelveTec, Türkiye'deki işletmeler için modern, SEO optimize edilmiş web siteleri oluşturur. İstanbul, Ankara, İzmir ve tüm Türkiye genelinde hizmet veriyoruz. 18.999₺'den başlayan fiyatlar.",
  keywords: ["web tasarım Türkiye", "website yaptırma İstanbul", "web ajansı Türkiye", "profesyonel web sitesi", "SEO Türkiye", "web tasarım İstanbul", "web sitesi fiyatları Türkiye", "kurumsal web sitesi", "e-ticaret sitesi Türkiye"],
  alternates: {
    canonical: "https://xelvetec.com/webdesign-tuerkei",
    languages: { "tr-TR": "https://xelvetec.com/webdesign-tuerkei" },
  },
  openGraph: {
    title: "Web Tasarım Türkiye – XelveTec",
    description: "Türkiye'deki işletmeler için profesyonel web tasarım hizmetleri. 18.999₺'den başlayan fiyatlar.",
    url: "https://xelvetec.com/webdesign-tuerkei",
    locale: "tr_TR",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "XelveTec",
  url: "https://xelvetec.com/webdesign-tuerkei",
  telephone: "+41768443375",
  email: "business@xelvetec.com",
  areaServed: { "@type": "Country", name: "Turkey" },
  priceRange: "₺18.999 – ₺49.999",
}

export default function WebdesignTuerkeiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen bg-[#0a0a1a] text-white font-sans">
        <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">Türkiye • TR • TRY</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Web Tasarım Türkiye –<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              İşletmeniz için Profesyonel Web Siteleri
            </span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto text-balance">
            XelveTec, İstanbul, Ankara, İzmir ve tüm Türkiye genelindeki işletmeler için modern, hızlı ve SEO optimize edilmiş web siteleri oluşturur. Fiyatlar 18.999₺'den başlamaktadır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Ücretsiz Teklif Al
            </Link>
            <Link href="/#portfolio" className="px-8 py-4 border border-white/20 rounded-xl font-semibold hover:border-purple-500/50 transition-colors">
              Portfolyoyu İncele
            </Link>
          </div>
        </section>

        <section className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Neden XelveTec'i Tercih Etmelisiniz?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Türkçe Destek", desc: "Türkçe konuşan ekibimiz ile iletişim kurun. Dil engeli olmadan profesyonel hizmet alın." },
              { title: "Uygun Fiyatlar", desc: "Gizli ücret yok. Basic paket 18.999₺, Business 29.999₺, E-Ticaret 49.999₺'den başlamaktadır." },
              { title: "Google'da Üst Sıralarda", desc: "Türk arama sonuçları için SEO optimizasyonu. 'web sitesi yaptırma İstanbul' gibi aramalarda öne çıkın." },
              { title: "Hızlı Teslimat", desc: "Web siteniz 1–2 haftada hazır. Uzun bekleyişlere gerek yok." },
              { title: "Modern Tasarım", desc: "Kullanıcı deneyimini ön planda tutan, mobil uyumlu ve şık tasarımlar." },
              { title: "Uzun Vadeli Destek", desc: "Site yayına girdikten sonra da yanınızdayız. Güncelleme, hosting ve SEO desteği." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-bold text-lg mb-2 text-purple-300">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Tüm Türkiye'ye Hizmet Veriyoruz</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["İstanbul", "Ankara", "İzmir", "Bursa", "Adana", "Antalya", "Konya", "Mersin", "Kayseri", "Gaziantep", "Trabzon", "Eskişehir"].map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                {city}
              </span>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Web Tasarım Fiyatları (TRY)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic", price: "18.999₺", features: ["Responsive Tasarım", "5 Sayfaya Kadar", "İletişim Formu", "Temel SEO", "SSL Sertifikası"] },
              { name: "Business", price: "29.999₺", features: ["Basic'teki Her Şey", "15 Sayfaya Kadar", "CMS Entegrasyonu", "Gelişmiş SEO", "Google Analytics"], highlight: true },
              { name: "E-Ticaret", price: "49.999₺", features: ["Business'teki Her Şey", "Online Mağaza", "Ödeme Entegrasyonu", "Ürün Yönetimi", "Performans Optimizasyonu"] },
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
                  Hemen Teklif Al
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              { q: "Türkiye'de profesyonel bir web sitesi ne kadara mal olur?", a: "XelveTec'te web sitesi fiyatları 18.999₺'den başlamaktadır. Business paketleri 29.999₺, e-ticaret çözümleri ise 49.999₺'den başlamaktadır." },
              { q: "Web siteniz ne kadar sürede hazır olur?", a: "Basic bir web sitesi genellikle 1–2 haftada tamamlanır. Daha karmaşık projeler 3–4 haftayı bulabilir." },
              { q: "SEO hizmeti sunuyor musunuz?", a: "Evet, tüm paketlerimizde temel SEO optimizasyonu bulunmaktadır. Ayrıca aylık SEO takip ve iyileştirme paketlerimiz de mevcuttur." },
              { q: "Mobil uyumlu web sitesi yapıyor musunuz?", a: "Evet, tüm web sitelerimiz %100 mobil uyumludur. Türkiye'de internet kullanıcılarının büyük çoğunluğu mobilden eriştiği için bu bizim için en önemli önceliklerden biridir." },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Yeni Web Siteniz İçin Hazır Mısınız?</h2>
          <p className="text-white/60 mb-8">Ücretsiz danışmanlık – Türkçe, hızlı ve profesyonel.</p>
          <Link href="/#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Ücretsiz Teklif Al
          </Link>
        </section>
      </main>
    </>
  )
}
