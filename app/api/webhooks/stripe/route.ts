import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { 
  sendSubscriptionActivatedEmail, 
  sendSubscriptionCancelledEmail, 
  sendInvoiceReadyEmail,
  sendPaymentFailedEmail,
  sendAdminNewSubscriptionEmail
} from '@/lib/email-service'
import { countryToLanguage, type Country } from '@/lib/translations'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  try {
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log(`[v0] Stripe webhook received: ${event.type}`)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoiceFailed(invoice)
        break
      }

      default:
        console.log(`[v0] Unhandled webhook event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id

  console.log('[v0] Handling subscription update for customer:', customerId)

  // Find subscription by Stripe customer ID
  const { data: subscriptionData, error: fetchError } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id, status')
    .eq('stripe_customer_id', customerId)
    .single()

  // Status mapping
  const status =
    subscription.status === 'active'
      ? 'active'
      : subscription.status === 'paused'
      ? 'paused'
      : 'cancelled'

  if (fetchError || !subscriptionData) {
    console.log('[v0] No existing subscription found, checking users by stripe_customer_id...')

    // Find user by Stripe customer ID
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users_profile')
      .select('user_id')
      .eq('stripe_customer_id', customerId)
      .single()

    if (userError || !userData) {
      console.error('[v0] Could not find user with stripe_customer_id:', customerId)
      return
    }

    // Create new subscription
    console.log('[v0] Creating new subscription for user:', userData.user_id)

    const { error: createError } = await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id: userData.user_id,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        tier: subscription.items.data[0]?.price?.metadata?.tier || 'pro',
        status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (createError) {
      console.error('[v0] Failed to create subscription:', createError)
      return
    }

    // Send email notifications
    const { data: userProfile } = await supabaseAdmin
      .from('users_profile')
      .select('country')
      .eq('user_id', userData.user_id)
      .single()

    const userCountry = (userProfile?.country || 'de') as Country
    const userLanguage = countryToLanguage[userCountry]

    await sendSubscriptionActivatedEmail(userData.user_id, userLanguage)
    await sendAdminNewSubscriptionEmail(userData.user_id)

    console.log('[v0] New subscription created for user:', userData.user_id)
    return
  }

  // Update existing subscription
  const { error: updateError } = await supabaseAdmin
    .from('subscriptions')
    .update({
      status,
      stripe_subscription_id: subscription.id,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)

  if (updateError) {
    console.error('[v0] Failed to update subscription:', updateError)
    return
  }

  // Get user language
  const { data: userProfile } = await supabaseAdmin
    .from('users_profile')
    .select('country')
    .eq('user_id', subscriptionData.user_id)
    .single()

  const userCountry = (userProfile?.country || 'de') as Country
  const userLanguage = countryToLanguage[userCountry]

  // Send email only if subscription became active
  if (subscription.status === 'active' && subscriptionData.status !== 'active') {
    await sendSubscriptionActivatedEmail(subscriptionData.user_id, userLanguage)
    await sendAdminNewSubscriptionEmail(subscriptionData.user_id)
  }

  console.log(`[v0] Subscription ${subscription.id} updated to status: ${status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id

  const { data: subscriptionData } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('[v0] Failed to mark subscription as cancelled:', error)
    return
  }

  if (subscriptionData) {
    const { data: userProfile } = await supabaseAdmin
      .from('users_profile')
      .select('country')
      .eq('user_id', subscriptionData.user_id)
      .single()

    const userCountry = (userProfile?.country || 'de') as Country
    const userLanguage = countryToLanguage[userCountry]

    await sendSubscriptionCancelledEmail(subscriptionData.user_id, userLanguage)
  }

  console.log(`[v0] Subscription ${subscription.id} marked as cancelled`)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
  if (!customerId || !invoice.id || !invoice.paid_at) return

  const { error } = await supabaseAdmin
    .from('invoices')
    .upsert(
      {
        stripe_invoice_id: invoice.id,
        stripe_customer_id: customerId,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'paid',
        pdf_url: invoice.invoice_pdf,
        paid_date: new Date(invoice.paid_at * 1000).toISOString(),
      },
      { onConflict: 'stripe_invoice_id' }
    )

  if (error) {
    console.error('[v0] Failed to save invoice:', error)
    return
  }

  console.log(`[v0] Invoice ${invoice.id} recorded as paid`)
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
  if (!customerId || !invoice.id) return

  const { error } = await supabaseAdmin
    .from('invoices')
    .upsert(
      {
        stripe_invoice_id: invoice.id,
        stripe_customer_id: customerId,
        amount: invoice.amount_due || 0,
        currency: invoice.currency,
        status: 'failed',
      },
      { onConflict: 'stripe_invoice_id' }
    )

  if (error) {
    console.error('[v0] Failed to save failed invoice:', error)
    return
  }

  console.log(`[v0] Invoice ${invoice.id} recorded as failed`)
}