import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const KNOWLEDGE_BASE_CONTENT = [
  {
    title: 'Webdesign Services - xelvetec',
    section: 'Services',
    content: `xelvetec bietet professionelle Webdesign Services für Unternehmen in Deutschland, Schweiz, Österreich und Türkei. 
    Unsere Services umfassen moderne Webentwicklung, responsive Design, SEO-Optimierung, E-Commerce Lösungen und technische Unterstützung.
    Wir erstellen benutzerfreundliche, schnelle und sichere Websites, die Ihr Geschäft online präsentieren.`,
  },
  {
    title: 'Web Development - Modern & Scalable',
    section: 'Services',
    content: `Wir entwickeln moderne Webseiten mit den neuesten Technologien. Unsere Websites sind:
    - Responsive und mobile-friendly
    - SEO-optimiert für bessere Rankings
    - Schnell und sicher mit HTTPS
    - Einfach zu verwalten und zu aktualisieren
    - Kompatibel mit allen Browsern`,
  },
  {
    title: 'E-Commerce Solutions',
    section: 'Services',
    content: `Wir bauen professionelle Online-Shops mit integrierten Zahlungssystemen.
    Features unserer E-Commerce Lösungen:
    - Produktverwaltung
    - Sichere Zahlungsabwicklung (Stripe, PayPal)
    - Benutzerfreundliches Admin-Panel
    - Lagerbestandsverwaltung
    - Automatische Bestellbestätigungen`,
  },
  {
    title: 'SEO Optimization - Rankings verbessern',
    section: 'Services',
    content: `Unsere SEO Services helfen Ihrer Website, in Suchmaschinen besser zu ranken.
    SEO Leistungen:
    - Keyword-Recherche und -Optimierung
    - On-Page SEO
    - Technical SEO
    - Link Building
    - Regelmäßige Überwachung und Berichte`,
  },
  {
    title: 'Pricing - Transparente Kosten',
    section: 'Pricing',
    content: `xelvetec bietet flexible Pricing-Modelle für verschiedene Budgets:
    - Startup Package: Für kleine Unternehmen (ab 500 CHF)
    - Professional Package: Für wachsende Unternehmen (ab 2000 CHF)
    - Enterprise Package: Für große Unternehmen (auf Anfrage)
    - Wartung und Support: ab 100 CHF/Monat
    Alle Preise sind inklusive Beratung und Designbesprechungen.`,
  },
  {
    title: 'Hosting & Technical Support',
    section: 'Services',
    content: `Wir bieten zuverlässiges Hosting und technischen Support:
    - Sicheres und schnelles Hosting
    - Automatische Backups
    - 24/7 Support für Notfälle
    - SSL-Zertifikate inklusive
    - Unbegrenzter Speicherplatz und Bandbreite
    - Kostenlose Wartung und Updates`,
  },
  {
    title: 'Portfolio - Unsere erfolgreichen Projekte',
    section: 'About',
    content: `xelvetec hat mit Hunderten von Unternehmen zusammengearbeitet. Unsere Projekte umfassen:
    - KMU Websites in Deutschland und Schweiz
    - E-Commerce Shops mit hohem Umsatz
    - Corporate Webseiten für größere Unternehmen
    - Marketing und Branding Projekte
    Alle unsere Projekte zeichnen sich durch hohe Qualität und zufriedene Kunden aus.`,
  },
  {
    title: 'Über xelvetec - Web Design Agentur',
    section: 'About',
    content: `xelvetec ist eine führende Webdesign Agentur basierend in der Schweiz.
    Wir haben über 10 Jahre Erfahrung in Webentwicklung, Design und Marketing.
    Unser Team besteht aus erfahrenen Designern, Entwicklern und SEO-Experten.
    Wir arbeiten mit Kunden in Deutschland, Schweiz, Österreich und Türkei zusammen.
    Unser Ziel: Ihre Online-Präsenz zu maximieren und Ihr Geschäft zu wachsen.`,
  },
  {
    title: 'Kontakt & Support',
    section: 'Contact',
    content: `Kontaktieren Sie uns für Beratung oder Fragen:
    Telefon: +41 76 844 3375
    Email: business@xelvetec.com
    Adresse: Egelseestrasse 31, 8280 Kreuzlingen, Schweiz
    Wir sind Mo-Fr von 9:00-18:00 Uhr erreichbar.
    Für Notfälle: Support@xelvetec.com`,
  },
  {
    title: 'Trustpilot Reviews - Kundenbewertungen',
    section: 'Reviews',
    content: `xelvetec hat eine durchschnittliche Bewertung von 4.1/5 auf Trustpilot.
    Unsere Kunden loben:
    - Professionelle Kommunikation
    - Qualität der Arbeit
    - Pünktliche Lieferung
    - Ausgezeichneter Support
    - Gutes Preis-Leistungs-Verhältnis
    Sie können unsere Bewertungen hier sehen: https://www.trustpilot.com/review/xelvetec.ch`,
  },
  {
    title: 'Häufig gestellte Fragen - FAQ',
    section: 'FAQ',
    content: `F: Wie lange dauert die Erstellung einer Website?
    A: Je nach Komplexität 4-12 Wochen.
    
    F: Bieten Sie Wartung nach dem Launch?
    A: Ja, wir bieten verschiedene Wartungspakete an.
    
    F: Können Sie meine bestehende Website redesignen?
    A: Ja, wir können Websites redesignen oder modernisieren.
    
    F: Werden die Websites mobile-friendly sein?
    A: Ja, alle unsere Websites sind responsive und mobile-optimiert.
    
    F: Unterstützen Sie mehrsprachige Websites?
    A: Ja, wir können Websites in Deutsch, Englisch und Türkisch erstellen.`,
  },
]

export async function POST(req: Request) {
  try {
    // Check for admin authentication
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== process.env.ADMIN_TOKEN) {
      return new Response('Unauthorized', { status: 401 })
    }

    let insertedCount = 0
    let errorCount = 0

    for (const item of KNOWLEDGE_BASE_CONTENT) {
      try {
        const { embedding } = await embed({
          model: openai.embedding('text-embedding-3-small'),
          value: item.content,
        })

        const { error } = await supabase.from('knowledge_base').insert({
          title: item.title,
          section: item.section,
          content: item.content,
          embedding: embedding,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (error) {
          console.error(`Error inserting ${item.title}:`, error)
          errorCount++
        } else {
          insertedCount++
        }
      } catch (err) {
        console.error(`Error processing ${item.title}:`, err)
        errorCount++
      }
    }

    return Response.json({
      success: true,
      inserted: insertedCount,
      errors: errorCount,
      total: KNOWLEDGE_BASE_CONTENT.length,
    })
  } catch (error) {
    console.error('[v0] Error populating knowledge base:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
