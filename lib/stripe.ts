import 'server-only'

import Stripe from 'stripe'

// Lazy initialization - only create when accessed at runtime
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY not configured')
    }
    stripeInstance = new Stripe(apiKey)
  }
  return stripeInstance
}

// For backward compatibility, also export a function
export const createStripe = () => getStripe()
