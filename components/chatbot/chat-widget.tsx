'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [transportError, setTransportError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { country } = useLanguage()
  
  // Initialize chat with proper DefaultChatTransport
  const transport = new DefaultChatTransport({ api: '/api/chat' })
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    transport,
    initialMessages: [],
    onError: (err) => {
      console.error('[v0] Chat error:', err)
      setTransportError(err.message)
    }
  })

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const labels = {
    de: {
      title: 'xelvetec Support',
      placeholder: 'Wie kann ich dir helfen?',
      send: 'Senden',
    },
    tr: {
      title: 'xelvetec Destek',
      placeholder: 'Sana nasıl yardımcı olabilirim?',
      send: 'Gönder',
    },
    en: {
      title: 'xelvetec Support',
      placeholder: 'How can I help you?',
      send: 'Send',
    },
  }

  const currentLabels = labels[country as keyof typeof labels] || labels.en

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      console.log('[v0] Submitting message:', input.substring(0, 30))
      setTransportError(null)
      try {
        await handleSubmit(e)
      } catch (err) {
        console.error('[v0] Submit error:', err)
        const msg = err instanceof Error ? err.message : 'Fehler beim Senden'
        setTransportError(msg)
      }
    }
  }

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            console.log('[v0] Chat opened')
          }}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all animate-bounce flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[500px] sm:h-[600px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-between flex-shrink-0">
            <h2 className="font-bold text-base sm:text-lg">{currentLabels.title}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background/50">
            {messages.length === 0 && (
              <div className="text-center text-foreground/60 text-sm py-8">
                {country === 'de' && <p>Hallo! Wie kann ich dir heute helfen?</p>}
                {country === 'tr' && <p>Merhaba! Bugün sana nasıl yardımcı olabilirim?</p>}
                {country !== 'de' && country !== 'tr' && <p>Hello! How can I help you today?</p>}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-foreground/10 text-foreground rounded-bl-none'
                  }`}
                >
                  {typeof message.content === 'string'
                    ? message.content
                    : Array.isArray(message.content)
                    ? message.content
                        .map((part) => (typeof part === 'string' ? part : part.text || ''))
                        .join('')
                    : ''}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">
                    {country === 'de' && 'Wird beantwortet...'}
                    {country === 'tr' && 'Cevaplanıyor...'}
                    {country !== 'de' && country !== 'tr' && 'Answering...'}
                  </span>
                </div>
              </div>
            )}

            {(error || transportError) && (
              <div className="flex justify-start">
                <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-500/20 max-w-xs">
                  <p className="font-semibold">Fehler:</p>
                  <p>{(error || transportError)?.toString() || 'Etwas ist schief gelaufen'}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleFormSubmit} className="border-t border-foreground/10 p-3 sm:p-4 bg-background flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                handleInputChange(e)
              }}
              placeholder={currentLabels.placeholder}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/20 bg-background/50 focus:outline-none focus:border-purple-500 transition-colors text-base disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all animate-bounce flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[500px] sm:h-[600px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-between flex-shrink-0">
            <h2 className="font-bold text-base sm:text-lg">{currentLabels.title}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background/50">
            {messages.length === 0 && (
              <div className="text-center text-foreground/60 text-sm py-8">
                <p>Stellen Sie Ihre Frage und ich helfe Ihnen gerne weiter!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-foreground/10 text-foreground rounded-bl-none'
                  }`}
                >
                  {typeof message.content === 'string' ? (
                    message.content
                  ) : Array.isArray(message.content) ? (
                    message.content.map((part, idx) => (
                      <div key={idx}>
                        {typeof part === 'string' ? part : part.text}
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Wird beantwortet...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-500/20">
                  Fehler: {error.message || 'Etwas ist schief gelaufen'}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="border-t border-foreground/10 p-3 sm:p-4 bg-background flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e)}
              placeholder={currentLabels.placeholder}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/20 bg-background/50 focus:outline-none focus:border-purple-500 transition-colors text-base disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
