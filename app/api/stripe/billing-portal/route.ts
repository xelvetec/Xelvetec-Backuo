import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get the session to retrieve the customer ID
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (!session.customer) {
      return NextResponse.json(
        { error: 'Customer not found in session' },
        { status: 400 }
      )
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.customer as string,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://xelvetec.com'}/`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error: any) {
    console.error('Error creating billing portal session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}
