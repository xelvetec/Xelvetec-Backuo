'use client'

import Image from "next/image"

export default function ImpressumPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressum</h1>
          <p className="text-foreground/60">Rechtliche Informationen zu XelveTec GmbH</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Anbieter</h2>
            <p className="text-foreground/80">
              XelveTec GmbH<br />
              Egelseestrasse 31<br />
              8280 Kreuzlingen<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Inhaber</h2>
            <p className="text-foreground/80">
              Kubilay Demirci
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-foreground/80">
              E-Mail: info@xelvetec.ch
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Haftungsausschluss</h2>
            <p className="text-foreground/80">
              Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
            <p className="text-foreground/80">
              Alle Angaben ohne Gewähr. Der Autor ist nicht verantwortlich für den Inhalt von extern verlinkten Seiten. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverletzungen überprüft. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Urheberrecht</h2>
            <p className="text-foreground/80">
              Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem Urheberrecht. Jede Art der Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des Autors oder Erstellers.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
