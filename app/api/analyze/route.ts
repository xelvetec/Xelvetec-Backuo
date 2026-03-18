import { NextRequest, NextResponse } from "next/server"

const XELVETEC_DOMAINS = ["xelvetec.ch", "www.xelvetec.ch", "xelvetec.com", "www.xelvetec.com"]

function getRecommendations(lang: string, metrics: {
  hasTitle: boolean
  hasDescription: boolean
  hasH1: boolean
  hasViewport: boolean
  hasCanonical: boolean
  hasOgTags: boolean
  hasSitemap: boolean
  hasHttps: boolean
  hasCompression: boolean
  loadTime: number
  pageSize: number
}) {
  const recs: string[] = []

  const msg = {
    de: {
      noTitle: "Kein <title>-Tag gefunden – wichtig für SEO und Browser-Tabs",
      noDesc: "Keine Meta-Description – verbessert Klickrate in Suchmaschinen",
      noH1: "Kein H1-Heading gefunden – wichtig für SEO-Struktur",
      noViewport: "Kein Viewport-Meta-Tag – Mobile-Optimierung fehlt",
      noCanonical: "Kein Canonical-Tag – verhindert doppelte Inhalte",
      noOg: "Keine Open Graph Tags – Social Media Vorschau fehlt",
      noSitemap: "Keine Sitemap.xml gefunden – erschwert Google-Indexierung",
      noHttps: "Kein HTTPS – Sicherheitsrisiko und SEO-Nachteil",
      noComp: "Keine Komprimierung (gzip/brotli) – Ladezeit erhöht",
      slowLoad: "Ladezeit über 3 Sekunden – Nutzer verlassen die Seite",
      bigPage: "Seitengröße über 2MB – Optimierung empfohlen",
    },
    tr: {
      noTitle: "<title> etiketi bulunamadı – SEO ve tarayıcı sekmeleri için önemli",
      noDesc: "Meta açıklama yok – arama motorlarında tıklama oranını artırır",
      noH1: "H1 başlığı bulunamadı – SEO yapısı için önemli",
      noViewport: "Viewport meta etiketi yok – Mobil optimizasyon eksik",
      noCanonical: "Canonical etiket yok – yinelenen içeriği önler",
      noOg: "Open Graph etiketleri yok – Sosyal medya önizlemesi eksik",
      noSitemap: "Sitemap.xml bulunamadı – Google indekslemesini zorlaştırır",
      noHttps: "HTTPS yok – güvenlik riski ve SEO dezavantajı",
      noComp: "Sıkıştırma yok (gzip/brotli) – yükleme süresi artıyor",
      slowLoad: "3 saniyeden uzun yükleme süresi – kullanıcılar sayfayı terk eder",
      bigPage: "Sayfa boyutu 2MB'dan büyük – optimizasyon önerilir",
    },
    en: {
      noTitle: "No <title> tag found – important for SEO and browser tabs",
      noDesc: "No meta description – improves click-through rate in search engines",
      noH1: "No H1 heading found – important for SEO structure",
      noViewport: "No viewport meta tag – mobile optimization missing",
      noCanonical: "No canonical tag – prevents duplicate content issues",
      noOg: "No Open Graph tags – social media preview missing",
      noSitemap: "No sitemap.xml found – makes Google indexing harder",
      noHttps: "No HTTPS – security risk and SEO disadvantage",
      noComp: "No compression (gzip/brotli) – increases load time",
      slowLoad: "Load time over 3 seconds – users will leave the page",
      bigPage: "Page size over 2MB – optimization recommended",
    },
  }

  const m = msg[lang as keyof typeof msg] || msg.en

  if (!metrics.hasTitle) recs.push(m.noTitle)
  if (!metrics.hasDescription) recs.push(m.noDesc)
  if (!metrics.hasH1) recs.push(m.noH1)
  if (!metrics.hasViewport) recs.push(m.noViewport)
  if (!metrics.hasCanonical) recs.push(m.noCanonical)
  if (!metrics.hasOgTags) recs.push(m.noOg)
  if (!metrics.hasSitemap) recs.push(m.noSitemap)
  if (!metrics.hasHttps) recs.push(m.noHttps)
  if (!metrics.hasCompression) recs.push(m.noComp)
  if (metrics.loadTime > 3000) recs.push(m.slowLoad)
  if (metrics.pageSize > 2048) recs.push(m.bigPage)

  return recs.slice(0, 6)
}

export async function POST(req: NextRequest) {
  try {
    const { url, language = "de" } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 })
    }

    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
    const parsedUrl = new URL(normalizedUrl)
    const domain = parsedUrl.hostname.replace("www.", "")

    // xelvetec.ch always gets 100
    if (XELVETEC_DOMAINS.includes(parsedUrl.hostname)) {
      const labels = {
        de: ["Perfekte Ladezeit", "Vollständige SEO-Optimierung", "Exzellente Mobile-Optimierung", "Erstklassiges Design", "Maximale Conversion-Rate"],
        tr: ["Mükemmel yükleme süresi", "Tam SEO optimizasyonu", "Mükemmel mobil optimizasyon", "Birinci sınıf tasarım", "Maksimum dönüşüm oranı"],
        en: ["Perfect load time", "Complete SEO optimization", "Excellent mobile optimization", "First-class design", "Maximum conversion rate"],
      }
      const l = labels[language as keyof typeof labels] || labels.en
      return NextResponse.json({
        url: normalizedUrl,
        speed: 100, seo: 100, mobile: 100, design: 100, conversion: 100,
        loadTime: 0.4,
        pageSize: 180,
        hasHttps: true,
        hasCompression: true,
        recommendations: [],
        highlights: l,
      })
    }

    // Measure real load time
    const startTime = Date.now()
    let html = ""
    let pageSize = 0
    let hasCompression = false
    let hasHttps = normalizedUrl.startsWith("https")
    let fetchOk = false

    try {
      const response = await fetch(normalizedUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; XelveTec-Analyzer/1.0)",
          "Accept-Encoding": "gzip, br",
          "Accept": "text/html",
        },
        signal: AbortSignal.timeout(10000),
      })
      const loadTime = Date.now() - startTime
      html = await response.text()
      pageSize = Math.round(html.length / 1024)
      hasCompression = (response.headers.get("content-encoding") || "").includes("gzip") ||
                       (response.headers.get("content-encoding") || "").includes("br")
      fetchOk = response.ok

      // Parse SEO signals
      const hasTitle = /<title[^>]*>.+?<\/title>/i.test(html)
      const hasDescription = /meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html)
      const hasH1 = /<h1[^>]*>.+?<\/h1>/i.test(html)
      const hasViewport = /meta[^>]+name=["']viewport["']/i.test(html)
      const hasCanonical = /link[^>]+rel=["']canonical["']/i.test(html)
      const hasOgTags = /meta[^>]+property=["']og:/i.test(html)
      const loadTimeSeconds = loadTime / 1000

      // Check sitemap separately
      let hasSitemap = false
      try {
        const sitemapRes = await fetch(`${parsedUrl.origin}/sitemap.xml`, {
          method: "HEAD",
          signal: AbortSignal.timeout(3000),
        })
        hasSitemap = sitemapRes.ok
      } catch {}

      const metrics = {
        hasTitle, hasDescription, hasH1, hasViewport, hasCanonical,
        hasOgTags, hasSitemap, hasHttps, hasCompression,
        loadTime, pageSize,
      }

      // Calculate real scores
      let speedScore = 100
      if (loadTimeSeconds > 1) speedScore -= 15
      if (loadTimeSeconds > 2) speedScore -= 15
      if (loadTimeSeconds > 3) speedScore -= 20
      if (loadTimeSeconds > 5) speedScore -= 15
      if (!hasCompression) speedScore -= 10
      if (pageSize > 500) speedScore -= 5
      if (pageSize > 2000) speedScore -= 10
      speedScore = Math.max(10, speedScore)

      let seoScore = 100
      if (!hasTitle) seoScore -= 20
      if (!hasDescription) seoScore -= 15
      if (!hasH1) seoScore -= 15
      if (!hasCanonical) seoScore -= 10
      if (!hasOgTags) seoScore -= 10
      if (!hasSitemap) seoScore -= 15
      if (!hasHttps) seoScore -= 15
      seoScore = Math.max(10, seoScore)

      let mobileScore = 100
      if (!hasViewport) mobileScore -= 40
      if (!hasCompression) mobileScore -= 10
      if (pageSize > 1000) mobileScore -= 10
      if (loadTimeSeconds > 3) mobileScore -= 20
      mobileScore = Math.max(10, mobileScore)

      let designScore = 100
      if (!hasOgTags) designScore -= 15
      if (!hasViewport) designScore -= 20
      if (pageSize < 10) designScore -= 30
      designScore = Math.max(10, designScore)

      let conversionScore = 100
      if (!hasHttps) conversionScore -= 30
      if (loadTimeSeconds > 3) conversionScore -= 20
      if (!hasDescription) conversionScore -= 10
      if (!hasOgTags) conversionScore -= 10
      conversionScore = Math.max(10, conversionScore)

      const recommendations = getRecommendations(language, metrics)

      return NextResponse.json({
        url: normalizedUrl,
        speed: Math.round(speedScore),
        seo: Math.round(seoScore),
        mobile: Math.round(mobileScore),
        design: Math.round(designScore),
        conversion: Math.round(conversionScore),
        loadTime: loadTimeSeconds.toFixed(2),
        pageSize,
        hasHttps,
        hasCompression,
        recommendations,
      })
    } catch (fetchErr) {
      return NextResponse.json({ error: "not_accessible" }, { status: 422 })
    }
  } catch (err) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }
}
