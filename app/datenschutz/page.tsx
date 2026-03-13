export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Datenschutzerklärung</h1>
          <p className="text-foreground/60">Datenschutz ist für uns wichtig</p>
        </div>

        <div className="space-y-8 text-foreground/80">
          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Gesetzliche Grundlagen</h2>
            <p>Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein.</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Datenverarbeitung</h2>
            <p className="mb-3">Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weitergegeben.</p>
            <p>In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ihre Rechte</h2>
            <p className="mb-3">Sie haben das Recht:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Einsicht in Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
              <li>Die Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Die Löschung Ihrer Daten zu verlangen (Recht auf Vergessenwerden)</li>
              <li>Der Verarbeitung Ihrer Daten zu widersprechen</li>
              <li>Ihre Daten in einem strukturierten, gängigen Format zu erhalten (Datenportabilität)</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
            <p>Für Fragen zum Datenschutz oder zur Wahrnehmung Ihrer Rechte kontaktieren Sie uns bitte:</p>
            <p className="mt-4"><strong>XelveTec</strong><br />Egelseestrasse 31<br />8280 Kreuzlingen<br />Schweiz<br /><br /><strong>Telefon:</strong> +41 76 844 33 75<br /><strong>E-Mail:</strong> info@xelvetec.ch</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
            <p>Diese Website verwendet Cookies nur wenn nötig. Alle Cookies werden transparent kommuniziert und erfordern Ihre Zustimmung.</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <p className="text-sm text-foreground/60">Letzte Aktualisierung: März 2026</p>
          </section>
        </div>
      </div>
    </main>
  )
}
