'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SubscriptionCheckout } from '@/components/subscription-checkout'
import { Loader } from 'lucide-react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const tier = (searchParams.get('tier') || 'basic') as 'basic' | 'business' | 'ecommerce'

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-500/5 to-background">
      <SubscriptionCheckout tier={tier} />
    </div>
  )
}

function CheckoutLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="text-center">
        <Loader className="w-12 h-12 text-[#A020F0] mx-auto mb-4 animate-spin" />
        <p className="text-foreground/60">Loading checkout...</p>
      </div>
    </div>
  )
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  )
}
