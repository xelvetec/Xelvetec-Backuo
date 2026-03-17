'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // In echtem Setup: Integriere mit Brevo, Mailchimp, etc.
      // Für jetzt: Email-Validation + Speicherung
      if (!email.includes('@')) {
        throw new Error('Ungültige Email-Adresse')
      }

      // TODO: API-Call zu deinem Backend für Newsletter-Signup
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, source: 'website' })
      // })

      setMessage({
        type: 'success',
        text: '✓ Danke! Überprüfe dein Email für die Bestätigung.'
      })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Fehler beim Anmelden'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 backdrop-blur">
      <div className="flex gap-4 items-start mb-4">
        <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-white mb-2">Webdesign-Tipps direkt ins Postfach</h3>
          <p className="text-sm text-white/60">1x pro Woche: Trends, Tipps & Fallstudien</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="deine@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Lädt...' : 'Anmelden'}
        </button>
      </form>

      {message && (
        <div className={`mt-3 flex gap-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  )
}
