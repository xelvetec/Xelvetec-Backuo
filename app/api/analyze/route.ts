import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const startTime = Date.now()
    const response = await fetch(parsedUrl.toString(), { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; XelveTec-Analyzer/1.0)' },
      timeout: 10000 
    })
    const loadTime = Date.now() - startTime

    if (!response.ok) {
      return NextResponse.json({ error: 'Website not accessible' }, { status: 400 })
    }

    const html = await response.text()

    // Analyze Speed (0-100)
    const speedScore = Math.max(0, Math.min(100, 100 - (loadTime / 100)))

    // Analyze SEO (0-100)
    let seoScore = 50
    const hasTitle = /<title>/.test(html)
    const hasDescription = /meta name=["']description["']/.test(html)
    const hasH1 = /<h1[^>]*>/.test(html)
    const hasMetaViewport = /meta name=["']viewport["']/.test(html)
    const hasJsonLd = /<script[^>]*type=["']application\/ld\+json["']/.test(html)
    const hasCanonical = /<link[^>]*rel=["']canonical["']/.test(html)
    const hasRobots = /meta name=["']robots["']/.test(html)
    
    const seoElements = [hasTitle, hasDescription, hasH1, hasMetaViewport, hasJsonLd, hasCanonical, hasRobots]
    seoScore = (seoElements.filter(Boolean).length / seoElements.length) * 100

    // Analyze Mobile Optimization (0-100)
    let mobileScore = 50
    const mobileElements = [
      hasMetaViewport,
      /touch-icon/.test(html),
      /apple-mobile-web-app-capable/.test(html),
      /theme-color/.test(html),
    ]
    mobileScore = (mobileElements.filter(Boolean).length / mobileElements.length) * 100

    // Analyze Design (0-100)
    let designScore = 60
    const hasModernCSS = /(Tailwind|Bootstrap|Material-UI|styled|@emotion|CSS Grid|Flexbox)/.test(html)
    const hasAnimation = /animation|transition|transform/.test(html)
    const hasResponsive = /media query|responsive|mobile-first/.test(html)
    const designElements = [hasModernCSS, hasAnimation, hasResponsive]
    designScore = 40 + (designElements.filter(Boolean).length / designElements.length) * 60

    // Analyze Conversion Potential (0-100)
    let conversionScore = 50
    const hasCallToAction = /button|call.*action|sign up|get started|contact|subscribe|demo/i.test(html)
    const hasContactForm = /<form[^>]*>|input.*email/i.test(html)
    const hasSocialLinks = /facebook|instagram|linkedin|twitter|youtube/i.test(html)
    const hasImages = /<img/.test(html)
    const hasVideo = /<video|youtube|vimeo/.test(html)
    const conversionElements = [hasCallToAction, hasContactForm, hasSocialLinks, hasImages, hasVideo]
    conversionScore = (conversionElements.filter(Boolean).length / conversionElements.length) * 100

    // Generate suggestions
    const suggestions = {
      speed: [],
      seo: [],
      mobile: [],
      design: [],
      conversion: [],
    }

    if (speedScore < 70) {
      suggestions.speed.push({
        title: 'Ladegeschwindigkeit optimieren',
        description: 'Die Website braucht zu lange zum Laden. Bilder komprimieren, CSS/JS minifizieren und Caching implementieren.',
        priority: 'high'
      })
    }

    if (seoScore < 70) {
      if (!hasTitle) suggestions.seo.push({ title: 'Meta Title hinzufügen', description: 'Jede Seite braucht einen einzigartigen, beschreibenden Titel (max. 60 Zeichen).', priority: 'high' })
      if (!hasDescription) suggestions.seo.push({ title: 'Meta Description hinzufügen', description: 'Schreibe eine ansprechende Meta-Beschreibung (max. 160 Zeichen) für jede Seite.', priority: 'high' })
      if (!hasH1) suggestions.seo.push({ title: 'H1 Tag hinzufügen', description: 'Nutze genau eine H1 pro Seite für das Haupt-Keyword.', priority: 'high' })
      if (!hasJsonLd) suggestions.seo.push({ title: 'Schema Markup implementieren', description: 'Strukturierte Daten helfen Suchmaschinen, den Inhalt besser zu verstehen.', priority: 'medium' })
    }

    if (mobileScore < 70) {
      if (!hasMetaViewport) suggestions.mobile.push({ title: 'Viewport Meta Tag hinzufügen', description: '<meta name="viewport" content="width=device-width, initial-scale=1">', priority: 'high' })
      suggestions.mobile.push({ title: 'Mobile Responsivität testen', description: 'Nutze Chrome DevTools, um die Website auf verschiedenen Bildschirmgrößen zu testen.', priority: 'high' })
    }

    if (designScore < 70) {
      suggestions.design.push({
        title: 'Modernes Design Framework nutzen',
        description: 'Implementiere Tailwind CSS oder ein ähnliches Framework für konsistentes Styling.',
        priority: 'medium'
      })
      suggestions.design.push({
        title: 'Animationen hinzufügen',
        description: 'Subtile Übergänge und Animationen verbessern die Benutzerexperience.',
        priority: 'low'
      })
    }

    if (conversionScore < 70) {
      if (!hasCallToAction) suggestions.conversion.push({ title: 'CTA-Buttons hinzufügen', description: 'Platziere klare Call-to-Action Buttons oben, mittig und unten auf der Seite.', priority: 'high' })
      if (!hasContactForm) suggestions.conversion.push({ title: 'Kontaktformular implementieren', description: 'Ein einfaches Formular für E-Mails oder Anmeldungen erhöht Conversions.', priority: 'high' })
      suggestions.conversion.push({
        title: 'Trust Signals zeigen',
        description: 'Testimonials, Kundenlogos, Zertifikate oder Garantien erhöhen die Glaubwürdigkeit.',
        priority: 'medium'
      })
    }

    return NextResponse.json({
      url: parsedUrl.hostname,
      loadTime,
      scores: {
        speed: Math.round(speedScore),
        seo: Math.round(seoScore),
        mobile: Math.round(mobileScore),
        design: Math.round(designScore),
        conversion: Math.round(conversionScore),
      },
      average: Math.round((speedScore + seoScore + mobileScore + designScore + conversionScore) / 5),
      suggestions,
    })
  } catch (error) {
    console.error('[v0] Analyzer error:', error)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}
