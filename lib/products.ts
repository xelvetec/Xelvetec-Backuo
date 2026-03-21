export interface SubscriptionProduct {
  id: string
  name: string
  tier: 'basic' | 'business' | 'ecommerce'
  description: string
  prices: {
    CHF: number
    EUR: number
    TRY: number
  }
  // Stripe Price IDs für multi-currency (keine Umrechnung)
  stripePrices: {
    CHF: string
    EUR: string
    TRY: string
  }
}

export const SUBSCRIPTION_PRODUCTS: SubscriptionProduct[] = [
  {
    id: 'sub-basic-chf',
    name: 'Basic',
    tier: 'basic',
    description: 'Basic Website Subscription',
    prices: { CHF: 2990, EUR: 2990, TRY: 99900 },
    stripePrices: {
      CHF: 'price_1TDTxT2Uie3LBmwRfqhc9IJf',
      EUR: 'price_1TDTxT2Uie3LBmwRfqhc9IJf',
      TRY: 'price_1TDTxT2Uie3LBmwRfqhc9IJf'
    }
  },
  {
    id: 'sub-business-chf',
    name: 'Business',
    tier: 'business',
    description: 'Business Website Subscription',
    prices: { CHF: 7990, EUR: 7990, TRY: 259900 },
    stripePrices: {
      CHF: 'price_1TDUAR2Uie3LBmwRZGPU3ey5',
      EUR: 'price_1TDUAR2Uie3LBmwRZGPU3ey5',
      TRY: 'price_1TDUAR2Uie3LBmwRZGPU3ey5'
    }
  },
  {
    id: 'sub-ecommerce-chf',
    name: 'E-Commerce',
    tier: 'ecommerce',
    description: 'E-Commerce Website Subscription',
    prices: { CHF: 19990, EUR: 19990, TRY: 649900 },
    stripePrices: {
      CHF: 'price_1TDUCQ2Uie3LBmwRb24PvhMU',
      EUR: 'price_1TDUCQ2Uie3LBmwRb24PvhMU',
      TRY: 'price_1TDUCQ2Uie3LBmwRb24PvhMU'
    }
  }
]

export function getSubscriptionProduct(tier: 'basic' | 'business' | 'ecommerce') {
  return SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
}
