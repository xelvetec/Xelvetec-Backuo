'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { country } = useLanguage()
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [],
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
      close: 'Schließen',
    },
    tr: {
      title: 'xelvetec Destek',
      placeholder: 'Sana nasıl yardımcı olabilirim?',
      send: 'Gönder',
      close: 'Kapat',
    },
    en: {
      title: 'xelvetec Support',
      placeholder: 'How can I help you?',
      send: 'Send',
      close: 'Close',
    },
  }

  const currentLabels = labels[country as keyof typeof labels] || labels.en

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all animate-bounce"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-32px)] sm:w-96 max-h-[80vh] sm:h-[600px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
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

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background/50">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center text-foreground/60">
                <div>
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{currentLabels.placeholder}</p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-foreground/10 text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-foreground/10 p-3 sm:p-4 bg-background flex gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
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
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
