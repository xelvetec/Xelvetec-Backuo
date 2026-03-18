'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

export default function ImpressumPage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-20 pb-12">
      {/* Logo - centered at top */}
      <div className="flex justify-center mb-12">
        <Link href="/" className="hover:scale-110 transition-transform duration-300">
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">{t('legal_impressum_title')}</h1>
          <p className="text-foreground/60 text-center">Rechtliche Informationen zu XelveTec</p>
        </div>

        <div className="space-y-8 text-foreground/80">
          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('legal_impressum_company')}</h2>
            <p><strong>Name:</strong> XelveTec</p>
            <p><strong>Geschäftsführer:</strong> Kubilay Demirci</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('legal_impressum_address')}</h2>
            <p>{t('legal_impressum_address_street')}<br />{t('legal_impressum_address_city')}</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('legal_impressum_contact')}</h2>
            <p><strong>Telefon:</strong> <a href="tel:+41768443375" className="text-[#A020F0] hover:text-[#00D4FF] transition-colors">+41 76 844 33 75</a></p>
            <p><strong>E-Mail:</strong> <a href="mailto:business@xelvetec.com" className="text-[#A020F0] hover:text-[#00D4FF] transition-colors">business@xelvetec.com</a></p>
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
            <p>Für Informationen zum Datenschutz besuchen Sie bitte unsere <Link href="/datenschutz" className="text-[#A020F0] hover:text-[#00D4FF] transition-colors underline">Datenschutzerklärung</Link>.</p>
          </section>

          {/* Navigation back to home */}
          <div className="pt-8 border-t border-foreground/20 flex justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#A020F0]/50 transition-all duration-300 transform hover:scale-105"
            >
              {t('impressum_back_button')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
