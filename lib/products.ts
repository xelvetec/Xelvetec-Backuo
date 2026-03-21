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
      CHF: process.env.STRIPE_BASIC_PRICE_CHF || 'price_basic_chf',
      EUR: process.env.STRIPE_BASIC_PRICE_EUR || 'price_basic_eur',
      TRY: process.env.STRIPE_BASIC_PRICE_TRY || 'price_basic_try'
    }
  },
  {
    id: 'sub-business-chf',
    name: 'Business',
    tier: 'business',
    description: 'Business Website Subscription',
    prices: { CHF: 7990, EUR: 7990, TRY: 259900 },
    stripePrices: {
      CHF: process.env.STRIPE_BUSINESS_PRICE_CHF || 'price_business_chf',
      EUR: process.env.STRIPE_BUSINESS_PRICE_EUR || 'price_business_eur',
      TRY: process.env.STRIPE_BUSINESS_PRICE_TRY || 'price_business_try'
    }
  },
  {
    id: 'sub-ecommerce-chf',
    name: 'E-Commerce',
    tier: 'ecommerce',
    description: 'E-Commerce Website Subscription',
    prices: { CHF: 19990, EUR: 19990, TRY: 649900 },
    stripePrices: {
      CHF: process.env.STRIPE_ECOMMERCE_PRICE_CHF || 'price_ecommerce_chf',
      EUR: process.env.STRIPE_ECOMMERCE_PRICE_EUR || 'price_ecommerce_eur',
      TRY: process.env.STRIPE_ECOMMERCE_PRICE_TRY || 'price_ecommerce_try'
    }
  }
]

export function getSubscriptionProduct(tier: 'basic' | 'business' | 'ecommerce') {
  return SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
}
