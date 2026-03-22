import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { SUBSCRIPTION_PRODUCTS } from '@/lib/products'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    const { tier, country, userId } = await request.json()

    console.log('[v0] Creating checkout session for user:', userId, 'tier:', tier)

    const product = SUBSCRIPTION_PRODUCTS.find(p => p.tier === tier)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
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

    // Create a Stripe customer associated with the user
    let stripeCustomer = await stripe.customers.create({
      metadata: {
        userId: userId,
        tier: tier,
      }
    })

    console.log('[v0] Created Stripe customer:', stripeCustomer.id)

    // Pre-create subscription record in Supabase for webhook to find
    const { error: createError } = await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_customer_id: stripeCustomer.id,
        tier: tier,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (createError) {
      console.warn('[v0] Warning creating subscription record:', createError)
      // Don't fail - webhook will create it if needed
    } else {
      console.log('[v0] Pre-created subscription record for user:', userId)
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_collection: 'always',
      payment_method_configuration: 'pmc_1TDV192Uie3LBmwR6uI9pa7n',
      customer: stripeCustomer.id,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/checkout?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/subscription/cancel`,
      metadata: {
        userId: userId,
      }
    })

    console.log('[v0] Created Stripe checkout session:', session.id)

    return NextResponse.json({ url: session.url, customerId: session.customer })
  } catch (error) {
    console.error('[v0] Stripe checkout error:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
