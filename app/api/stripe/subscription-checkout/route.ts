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

    const priceInCents = product.prices[country as keyof typeof product.prices] || product.prices.CHF
    const currency = country === 'CH' ? 'chf' : country === 'DE' ? 'eur' : country === 'AT' ? 'eur' : country === 'TR' ? 'try' : 'chf'

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
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
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/cancel`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
