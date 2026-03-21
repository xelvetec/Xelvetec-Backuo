import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const { userId, reason, tier, offerType, message, language } = await request.json()

    if (!userId || !reason || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save cancellation offer to database
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('tier', tier)
      .eq('status', 'active')
      .single()

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    const { error: saveError } = await supabaseAdmin
      .from('cancellation_offers')
      .insert({
        subscription_id: subscription.id,
        offer_type: offerType || 'custom',
        status: 'presented',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      })

    if (saveError) {
      console.error('[v0] Failed to save cancellation offer:', saveError)
      return NextResponse.json(
        { error: 'Failed to save offer' },
        { status: 500 }
      )
    }

    // Get user email
    const { data: userProfile } = await supabaseAdmin
      .from('users_profile')
      .select('email')
      .eq('user_id', userId)
      .single()

    if (!userProfile?.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 404 }
      )
    }

    // Send support request email with context
    const supportEmails: Record<string, string> = {
      de: 'support@xelvetec.com',
      tr: 'support@xelvetec.com',
      en: 'support@xelvetec.com'
    }

    const supportEmail = supportEmails[language] || 'support@xelvetec.com'

    const emailSubjects: Record<string, string> = {
      de: `Churn-Prävention: ${tier.toUpperCase()} Plan - Grund: ${reason}`,
      tr: `Churn-Prävention: ${tier.toUpperCase()} Plan - Sebep: ${reason}`,
      en: `Churn Prevention: ${tier.toUpperCase()} Plan - Reason: ${reason}`
    }

    const emailBody = `
User ID: ${userId}
Email: ${userProfile.email}
Plan: ${tier}
Cancellation Reason: ${reason}
Offer Type: ${offerType}
User Message: ${message}
Language: ${language}

---
This customer is considering cancelling their subscription. 
Please reach out within 24 hours with a suitable offer or solution.
    `.trim()

    console.log('[v0] Support contact request:')
    console.log(emailBody)

    // TODO: Send email to support team using your email provider
    // For now, we just log it

    return NextResponse.json({
      success: true,
      message: 'Support team will contact you shortly',
      offerId: subscription.id,
    })
  } catch (error) {
    console.error('[v0] Support contact error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
