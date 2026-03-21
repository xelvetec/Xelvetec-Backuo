'use client'

import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/js'
import { useLanguage } from '@/lib/language-context'
import { useState, useEffect } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionCheckoutProps {
  tier: 'basic' | 'business' | 'ecommerce'
  onClose?: () => void
}

export function SubscriptionCheckout({ tier, onClose }: SubscriptionCheckoutProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { country, t } = useLanguage()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!sessionId && clientSecret === '') {
      fetch('/api/stripe/subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, country })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setClientSecret(data.clientSecret)
          }
        })
        .catch(err => {
          console.error('Error creating checkout session:', err)
          setError('Failed to create checkout session')
        })
    }
  }, [tier, country, sessionId, clientSecret])

  if (sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center glass rounded-3xl p-8 max-w-md">
          <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">{t('subscription_success_title')}</h1>
          <p className="text-foreground/60">{t('subscription_success_desc')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center glass rounded-3xl p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">Error</h1>
          <p className="text-foreground/60">{error}</p>
        </div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A020F0]"></div>
          <p className="mt-4 text-foreground/60">{t('contact_sending') || 'Loading...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-24">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

