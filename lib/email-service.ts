import { sendEmail } from './email-templates'
import { Language } from './translations'
import { supabaseAdmin } from './supabase-admin'

export async function sendWelcomeEmail(userId: string, email: string, language: Language) {
  return sendEmail(email, language, 'welcome')
}

export async function sendSubscriptionActivatedEmail(userId: string, language: Language) {
  const { data: user, error } = await supabaseAdmin
    .from('users_profile')
    .select('email')
    .eq('user_id', userId)
    .single()

  if (error || !user?.email) {
    console.error('[v0] Failed to get user email:', error)
    return false
  }

  return sendEmail(user.email, language, 'subscriptionActivated')
}

export async function sendSubscriptionCancelledEmail(userId: string, language: Language) {
  const { data: user, error } = await supabaseAdmin
    .from('users_profile')
    .select('email')
    .eq('user_id', userId)
    .single()

  if (error || !user?.email) {
    console.error('[v0] Failed to get user email:', error)
    return false
  }

  return sendEmail(user.email, language, 'subscriptionCancelled')
}

export async function sendInvoiceReadyEmail(userId: string, language: Language, invoiceUrl: string) {
  const { data: user, error } = await supabaseAdmin
    .from('users_profile')
    .select('email')
    .eq('user_id', userId)
    .single()

  if (error || !user?.email) {
    console.error('[v0] Failed to get user email:', error)
    return false
  }

  return sendEmail(user.email, language, 'invoiceReady', { invoiceUrl })
}

export async function sendPaymentFailedEmail(userId: string, language: Language) {
  const { data: user, error } = await supabaseAdmin
    .from('users_profile')
    .select('email')
    .eq('user_id', userId)
    .single()

  if (error || !user?.email) {
    console.error('[v0] Failed to get user email:', error)
    return false
  }

  return sendEmail(user.email, language, 'paymentFailed')
}

export async function sendCancellationOfferEmail(userId: string, language: Language, offer: 'discount20' | 'custom' | 'pause') {
  const { data: user, error } = await supabaseAdmin
    .from('users_profile')
    .select('email')
    .eq('user_id', userId)
    .single()

  if (error || !user?.email) {
    console.error('[v0] Failed to get user email:', error)
    return false
  }

  const offerMessages = {
    de: {
      discount20: '20% Rabatt für die nächsten 3 Monate',
      custom: 'Wir können einen Custom Plan für dich erstellen',
      pause: 'Pausiere dein Abo - es ist jederzeit wieder verfügbar'
    },
    tr: {
      discount20: 'Sonraki 3 ay için %20 indirim',
      custom: 'Sizin için özel bir plan oluşturabiliriz',
      pause: 'Aboneliğini durdur - dilediğin zaman geri açabilirsin'
    },
    en: {
      discount20: '20% discount for the next 3 months',
      custom: 'We can create a custom plan for you',
      pause: 'Pause your subscription - it\'s available anytime'
    }
  }

  return sendEmail(user.email, language, 'subscriptionActivated', { 
    offer: offerMessages[language][offer] 
  })
}
