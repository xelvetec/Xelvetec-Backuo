'use client'

import { useLanguage } from "@/lib/language-context"

export default function ImpressumPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t("legal_impressum_title")}</h1>
          <p className="text-foreground/60">Rechtliche Informationen zu XelveTec</p>
        </div>

        <div className="space-y-8 text-foreground/80">
          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t("legal_impressum_company")}</h2>
            <p><strong>Name:</strong> XelveTec</p>
            <p><strong>Geschäftsführer:</strong> Kubilay Demirci</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t("legal_impressum_address")}</h2>
            <p>Egelseestrasse 31<br />8280 Kreuzlingen<br />Schweiz</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t("legal_impressum_contact")}</h2>
            <p><strong>Telefon:</strong> +41 76 844 33 75</p>
            <p><strong>E-Mail:</strong> info@xelvetec.ch</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Haftungsausschluss</h2>
            <p className="mb-3">Die Inhalte dieser Website werden mit großer Sorgfalt zusammengestellt. Wir übernehmen jedoch keine Haftung für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte. Die Nutzung der auf dieser Website bereitgestellten Informationen erfolgt auf eigene Gefahr des Nutzers.</p>
            <p>Externe Links werden sorgfältig überprüft, jedoch können wir keine Verantwortung für deren Inhalte übernehmen.</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Urheberrechte</h2>
            <p>Alle Inhalte dieser Website, insbesondere Texte, Bilder, Grafiken und Designs, sind urheberrechtlich geschützt. Jede Reproduktion, Verarbeitung, Verbreitung oder öffentliche Zugänglichmachung bedarf unserer vorherigen Zustimmung.</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Datenschutz</h2>
            <p>Für Informationen zum Datenschutz besuchen Sie bitte unsere <a href="/datenschutz" className="text-purple-400 hover:text-purple-300 underline">{t("footer_privacy")}</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
