'use client'

import { useSearchParams } from 'next/navigation'
import { SubscriptionCheckout } from '@/components/subscription-checkout'

export default function SubscriptionCheckoutPage() {
  const searchParams = useSearchParams()
  const tier = (searchParams.get('tier') || 'basic') as 'basic' | 'business' | 'ecommerce'

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-500/5 to-background">
      <SubscriptionCheckout tier={tier} />
    </div>
  )
}
