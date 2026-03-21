import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SUBSCRIPTION_PRODUCTS } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY)
    const { tier, country } = await request.json()
    console.log('[v0] Received request:', { tier, country })

    const product = SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
    if (!product) {
      console.error('[v0] Product not found for tier:', tier)
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
    
    // Use predefined Stripe Price ID (multi-currency, no conversion)
    const stripePriceId = product.stripePrices[countryKey]
    console.log('[v0] Creating session with:', { tier, country: countryKey, priceId: stripePriceId, product: product.name })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'paypal',
      ],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/cancel`,
    })

    console.log('[v0] Session created successfully:', session.id)
    return NextResponse.json({ url: session.url, customerId: session.customer })
  } catch (error) {
    console.error('[v0] Stripe checkout error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[v0] Full error details:', JSON.stringify(error, null, 2))
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: errorMessage
    }, { status: 500 })
  }
}
