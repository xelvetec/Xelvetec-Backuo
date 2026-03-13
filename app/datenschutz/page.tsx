export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Datenschutz</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Datenschutz (Kurzfassung)</h2>
            
            <p className="text-foreground/70 leading-relaxed">
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weitergegeben. In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
            </p>
          </section>

          <section className="pt-6 border-t border-foreground/10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Ihre Rechte</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/70">
              <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
              <li>Recht auf Berichtigung falscher Daten</li>
              <li>Recht auf Löschung Ihrer Daten</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
            </ul>
          </section>

          <section className="pt-6 border-t border-foreground/10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Kontakt</h3>
            <p className="text-foreground/70">
              Für Fragen zum Datenschutz kontaktieren Sie uns unter:<br />
              <a href="mailto:info@xelvetec.ch" className="text-purple-500 hover:text-purple-400 transition-colors">
                info@xelvetec.ch
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
