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
}

export const SUBSCRIPTION_PRODUCTS: SubscriptionProduct[] = [
  {
    id: 'sub-basic-chf',
    name: 'Basic',
    tier: 'basic',
    description: 'Basic Website Subscription',
    prices: { CHF: 2990, EUR: 2990, TRY: 99900 }
  },
  {
    id: 'sub-business-chf',
    name: 'Business',
    tier: 'business',
    description: 'Business Website Subscription',
    prices: { CHF: 7990, EUR: 7990, TRY: 259900 }
  },
  {
    id: 'sub-ecommerce-chf',
    name: 'E-Commerce',
    tier: 'ecommerce',
    description: 'E-Commerce Website Subscription',
    prices: { CHF: 19990, EUR: 19990, TRY: 649900 }
  }
]

export function getSubscriptionProduct(tier: 'basic' | 'business' | 'ecommerce') {
  return SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
}
