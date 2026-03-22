'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Loader } from 'lucide-react'

const CHAT_LABELS = {
  de: {
    title: 'xelvetec Support',
    placeholder: 'Schreiben Sie Ihre Frage...',
    send: 'Senden',
    close: 'Schließen',
    greeting: 'Hallo! Wie kann ich dir heute helfen?',
  },
  tr: {
    title: 'xelvetec Destek',
    placeholder: 'Sorunuzu yazın...',
    send: 'Gönder',
    close: 'Kapat',
    greeting: 'Merhaba! Bugün sana nasıl yardım edebilirim?',
  },
  en: {
    title: 'xelvetec Support',
    placeholder: 'Type your question...',
    send: 'Send',
    close: 'Close',
    greeting: 'Hello! How can I help you today?',
  },
}

function detectLanguage(): 'de' | 'tr' | 'en' {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('tr')) return 'tr'
  return 'en'
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<'de' | 'tr' | 'en'>('en')
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, isLoading, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const labels = CHAT_LABELS[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput('')
  }

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[600px] sm:h-[600px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-between">
            <h2 className="font-bold text-lg">{labels.title}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50"
          >
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-purple-500/50" />
                  <p className="text-foreground/60 text-sm">{labels.greeting}</p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {message.parts && Array.isArray(message.parts) ? (
                    message.parts
                      .filter((p) => p.type === 'text')
                      .map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed">
                          {p.text}
                        </p>
                      ))
                  ) : typeof message.content === 'string' ? (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  ) : null}
                </div>
              </div>
            ))}

            {isLoading && status === 'streaming' && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-foreground/10 p-4 bg-background flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={labels.placeholder}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/20 bg-background/50 focus:outline-none focus:border-purple-500 transition-colors text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
