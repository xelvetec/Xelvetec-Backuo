'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send } from 'lucide-react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Create transport once and memoize it
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    transport,
    initialMessages: [],
  })

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
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
            <h2 className="font-bold text-base sm:text-lg">xelvetec Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background/50">
            {messages.length === 0 && (
              <div className="text-center text-foreground/60 text-sm py-8">
                <p>Guten Tag! Wie kann ich Ihnen heute helfen?</p>
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
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-foreground/10 text-foreground'
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
                <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-500/20">
                  <p>Fehler: {error.message || 'Etwas ist schief gelaufen'}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={onSubmit} className="border-t border-foreground/10 p-3 sm:p-4 bg-background flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e)}
              placeholder="Stellen Sie eine Frage..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-foreground/20 bg-background/50 focus:outline-none focus:border-purple-500 transition-colors text-base disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
