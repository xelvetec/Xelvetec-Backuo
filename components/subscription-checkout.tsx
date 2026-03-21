'use client'

import { CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useState, useEffect } from 'react'

interface SubscriptionCheckoutProps {
  tier: 'basic' | 'business' | 'ecommerce'
}

export function SubscriptionCheckout({ tier }: SubscriptionCheckoutProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { country, t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Wenn session_id vorhanden, war checkout erfolgreich
    if (sessionId) {
      setIsLoading(false)
      return
    }

    // Checkout starten
    handleCheckout()
  }, [])

  async function handleCheckout() {
    try {
      const response = await fetch('/api/stripe/subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, country })
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setIsLoading(false)
      } else if (data.url) {
        // Redirect zu Stripe Checkout
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to create checkout session')
      setIsLoading(false)
    }
  }

  if (sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center glass rounded-3xl p-8 max-w-md">
          <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">{t('subscription_success_title')}</h1>
          <p className="text-foreground/60 mb-6">{t('subscription_success_desc')}</p>
          <div className="space-y-3">
            <a href={`/subscription/success?session_id=${sessionId}`} className="inline-block w-full py-2 px-6 rounded-lg bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white text-sm font-semibold hover:shadow-lg transition-shadow">
              {t('manage_subscription') || 'Abo verwalten'}
            </a>
            <a href="/" className="inline-block w-full py-2 px-6 rounded-lg border border-[#A020F0]/40 text-foreground text-sm font-semibold hover:bg-[#A020F0]/5 transition-colors">
              {t('back_to_home')}
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center glass rounded-3xl p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">Error</h1>
          <p className="text-foreground/60 mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-block py-2 px-6 rounded-lg bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white text-sm font-semibold hover:shadow-lg transition-shadow"
          >
            {t('back_to_home')}
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#A020F0] mx-auto mb-4 animate-spin" />
          <p className="text-foreground/60">Redirecting to payment...</p>
        </div>
      </div>
    )
  }

  return null
}
