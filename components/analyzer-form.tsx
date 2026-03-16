'use client'

import { useState, useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircle } from 'lucide-react'

interface AnalyzerFormProps {
  onAnalysisComplete?: (data: any) => void
}

export function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastAnalyzed, setLastAnalyzed] = useState<string | null>(null)

  // Load last analyzed URL from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('analyzer_last_url')
    if (stored) {
      setLastAnalyzed(stored)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Parse URL to get hostname
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
      const hostname = parsedUrl.hostname

      // Check if same hostname was analyzed recently
      const lastTime = localStorage.getItem(`analyzer_${hostname}`)
      if (lastTime) {
        const now = Date.now()
        const lastTimestamp = parseInt(lastTime)
        const oneHourInMs = 3600000

        if (now - lastTimestamp < oneHourInMs) {
          const minutesRemaining = Math.ceil((oneHourInMs - (now - lastTimestamp)) / 60000)
          setError(`Diese Website wurde bereits analysiert. Bitte warte ${minutesRemaining} Minuten vor der nächsten Analyse.`)
          setLoading(false)
          return
        }
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-last-analyzed': lastTime || '',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Analyse fehlgeschlagen. Bitte versuche es erneut.')
        setLoading(false)
        return
      }

      // Store analyzed URL with timestamp
      localStorage.setItem(`analyzer_${hostname}`, Date.now().toString())
      setLastAnalyzed(hostname)
      
      // Store the analyzed URL for potential contact form use
      localStorage.setItem('analyzer_url', hostname)

      onAnalysisComplete?.(data)
    } catch (err) {
      setError('Fehler beim Verbinden mit dem Server. Bitte versuche es später erneut.')
      console.error('[v0] Form error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="z.B. example.com oder https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4" />
              <span className="hidden sm:inline">Analysiere...</span>
            </>
          ) : (
            'Analysieren'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}
    </form>
  )
}
