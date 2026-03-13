'use client'

import Image from "next/image"

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-32 pb-12">
      {/* Navigation Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 flex justify-center">
        <a href="/" className="inline-flex items-center group">
          <div className="relative">
            <Image
              src="/images/xelvetec-logo.png"
              alt="XelveTec"
              width={48}
              height={48}
              className="w-12 h-12 md:w-14 md:h-14 transition-all duration-300 group-hover:scale-110"
              style={{
                filter: "drop-shadow(0 0 0px rgba(160, 32, 240, 0)) drop-shadow(0 0 0px rgba(0, 212, 255, 0))",
                transition: "filter 0.3s ease",
              }}
            />
          </div>
        </a>
        <style>{`
          .group:hover > div > img {
            filter: drop-shadow(0 0 20px rgba(160, 32, 240, 0.8)) drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)) !important;
          }
        `}</style>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Datenschutz</h1>
          <p className="text-foreground/60">Datenschutzrichtlinien und Bestimmungen</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Datenschutz (Kurzfassung)</h2>
            <p className="text-foreground/80 leading-relaxed">
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weitergegeben. In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Erhebung und Verarbeitung von Daten</h2>
            <p className="text-foreground/80 leading-relaxed">
              Wir erheben und verarbeiten personenbezogene Daten nur in dem Umfang, in dem dies technisch notwendig ist oder von Ihnen freiwillig bereitgestellt wird. Eine Weitergabe Ihrer Daten an Dritte erfolgt ohne separate Zustimmung nicht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies und Tracking</h2>
            <p className="text-foreground/80 leading-relaxed">
              Diese Website verwendet minimal notwendige Cookies zur Funktionalität. Über diese Cookies werden keine persönlichen Daten ohne Ihre ausdrückliche Zustimmung erfasst. Sie können Cookies jederzeit in den Einstellungen Ihres Browsers deaktivieren.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Ihre Rechte</h2>
            <p className="text-foreground/80 leading-relaxed">
              Sie haben das Recht auf Auskunft über die Daten, die wir über Sie speichern. Sie können jederzeit die Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten verlangen. Für Anfragen kontaktieren Sie uns unter info@xelvetec.ch.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-foreground/80">
              XelveTec GmbH<br />
              Egelseestrasse 31<br />
              8280 Kreuzlingen<br />
              Schweiz<br /><br />
              E-Mail: info@xelvetec.ch
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
