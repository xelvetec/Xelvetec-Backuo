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
    
    // Use predefined Stripe Price ID (multi-currency, no conversion)
    const stripePriceId = product.stripePrices[countryKey]

    console.log('[v0] Creating Stripe checkout session:', { tier, country: countryKey, priceId: stripePriceId })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',           // Kreditkarte (Visa, Mastercard, etc.)
        'paypal',         // PayPal
        'apple_pay',      // Apple Pay
        'google_pay',     // Google Pay
        'ideal',          // iDEAL (Niederlande)
        'bancontact',     // Bancontact (Belgien)
        'giropay',        // giropay (Deutschland)
        'eps',            // EPS (Österreich)
        'p24',            // Przelewy24 (Polen)
        'klarna',         // Klarna (Buy Now Pay Later)
      ],
      line_items: [
        {
          price: stripePriceId, // Multi-currency Price ID - NO automatic conversion
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/cancel`,
    })

    return NextResponse.json({ url: session.url, customerId: session.customer })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
