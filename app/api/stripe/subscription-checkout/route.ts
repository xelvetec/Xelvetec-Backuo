import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SUBSCRIPTION_PRODUCTS } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { tier, country } = await request.json()

    const product = SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Map country codes from context (lowercase) to uppercase for products
    const countryCodeMap: { [key: string]: 'CHF' | 'EUR' | 'TRY' } = {
      'ch': 'CHF',
      'de': 'EUR',
      'at': 'EUR',
      'tr': 'TRY'
    }
    
    const countryKey = countryCodeMap[country.toLowerCase()] || 'CHF'
    const priceInCents = product.prices[countryKey] || product.prices.CHF
    
    // Map country to correct Stripe currency
    const currencyMap: { [key: string]: 'chf' | 'eur' | 'try' } = {
      'ch': 'chf',
      'de': 'eur',
      'at': 'eur',
      'tr': 'try'
    }
    const currency = currencyMap[country.toLowerCase()] || 'chf'

    console.log('[v0] Creating Stripe session:', { tier, country, countryKey, priceInCents, currency })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: priceInCents,
            recurring: {
              interval: 'month'
            },
            product_data: {
              name: `${product.name} Monthly Subscription`,
              description: product.description
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/cancel`,
    })

    return NextResponse.json({ url: session.url, customerId: session.customer })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
