'use client'

import { useState } from 'react'
import { Loader } from 'lucide-react'

export default function ChatbotSetupPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handlePopulateKB = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/admin/populate-kb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'demo'}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to populate knowledge base')
      }

      const data = await response.json()
      setSuccess(true)
      console.log('[v0] KB populated:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('[v0] Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 border border-foreground/10 rounded-lg bg-background/50">
          <h1 className="text-3xl font-bold mb-4">Chatbot Knowledge Base Setup</h1>
          
          <p className="text-foreground/70 mb-6">
            Click the button below to populate the chatbot's knowledge base with your xelvetec content and generate embeddings. This is required for the chatbot to answer questions.
          </p>

          <div className="space-y-4">
            <button
              onClick={handlePopulateKB}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Populating Knowledge Base...
                </>
              ) : (
                'Populate Knowledge Base'
              )}
            </button>

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 font-semibold">
                  ✓ Knowledge base successfully populated! The chatbot is now ready to answer questions.
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 font-semibold">Error: {error}</p>
              </div>
            )}

            <div className="p-4 bg-foreground/5 rounded-lg">
              <h3 className="font-semibold mb-2">What happens:</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>✓ Your xelvetec content is extracted and indexed</li>
                <li>✓ AI embeddings are generated for semantic search</li>
                <li>✓ Content is stored in Supabase vector database</li>
                <li>✓ Chatbot can now retrieve relevant information for answers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
