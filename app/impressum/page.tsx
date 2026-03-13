'use client'

import { useLanguage } from '@/lib/language-context'

export default function ImpressumPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressum</h1>
          <p className="text-foreground/60">Rechtliche Informationen zu XelveTec</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          
          {/* Kontaktadresse */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Kontaktadresse</h2>
            <div className="space-y-2 text-sm">
              <p><strong>XelveTec</strong></p>
              <p>Inhaber: Kubilay Demirci</p>
              <p>Egelseestrasse 31<br />8280 Kreuzlingen<br />Schweiz</p>
              <p><strong>E-Mail:</strong> <a href="mailto:info@xelvetec.ch" className="text-purple-400 hover:text-purple-300">info@xelvetec.ch</a></p>
            </div>
          </section>

          {/* Rechtsform */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Rechtsform</h2>
            <p className="text-sm">Einzelunternehmen (Nicht im Handelsregister eingetragen)</p>
          </section>

          {/* Vertretungsberechtigte Person */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Vertretungsberechtigte Person</h2>
            <p className="text-sm">Kubilay Demirci, Inhaber</p>
          </section>

          {/* Mehrwertsteuer */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Mehrwertsteuer (MWST)</h2>
            <p className="text-sm">Nicht mehrwertsteuerpflichtig (Umsatz unter CHF 100'000)</p>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Haftungsausschluss (Disclaimer)</h2>
            
            <div className="space-y-6">
              {/* Section 1 */}
              <div>
                <h3 className="font-bold text-foreground mb-2">1. Haftung für Inhalte</h3>
                <p className="text-sm text-foreground/70">
                  Der Autor (Kubilay Demirci) übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="font-bold text-foreground mb-2">2. Haftung für Links</h3>
                <p className="text-sm text-foreground/70">
                  Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="font-bold text-foreground mb-2">3. Urheberrechte</h3>
                <p className="text-sm text-foreground/70">
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich Kubilay Demirci (XelveTec) oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
                </p>
              </div>
            </div>
          </section>

          {/* Last updated */}
          <div className="pt-8 border-t border-foreground/10 text-xs text-foreground/40">
            <p>Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE')}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
