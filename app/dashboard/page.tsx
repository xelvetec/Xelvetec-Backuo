'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { getUserSubscription, getUserInvoices, getSubscriptionHistory } from '@/lib/auth'
import { CancellationFlow } from '@/components/cancellation-flow'

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { t } = useLanguage()
  const [subscription, setSubscription] = useState<any>(null)
  const [subscriptionHistory, setSubscriptionHistory] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCancellation, setShowCancellation] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/auth'
    }
  }, [user, authLoading])

  useEffect(() => {
    if (user) {
      console.log('[v0] Loading subscriptions for user:', user.id)
      Promise.all([
        getUserSubscription(user.id),
        getUserInvoices(user.id),
        getSubscriptionHistory(user.id)
      ]).then(([sub, invoices, history]) => {
        console.log('[v0] Subscriptions loaded:', { sub, history })
        setSubscription(sub)
        setInvoices(invoices)
        setSubscriptionHistory(history)
        setLoading(false)
      }).catch((err) => {
        console.error('[v0] Error loading subscriptions:', err)
        setLoading(false)
      })
    }
  }, [user])

  const handleCancellationAccept = (offerType: 'discount20' | 'discount_custom' | 'contact') => {
    console.log('[v0] User accepted offer:', offerType)
    // TODO: Call API to save the offer and send notification
    setShowCancellation(false)
  }

  const handleCancellationConfirm = async () => {
    console.log('[v0] User confirmed cancellation')
    // TODO: Call Stripe API to cancel subscription
    setShowCancellation(false)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('dashboard_title')}</h1>
          <button
            onClick={async () => {
              await signOut()
              window.location.href = '/'
            }}
            className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 text-foreground text-sm font-medium transition-colors"
          >
            {t('dashboard_logout')}
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6 mb-6 border border-foreground/10 rounded-lg bg-background/50">
          <h2 className="text-xl font-bold mb-4">{t('dashboard_profile_title')}</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-foreground/60">{t('auth_email')}</label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-foreground/60">{t('dashboard_user_id')}</label>
              <p className="text-sm font-mono text-foreground/60">{user.id}</p>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="p-6 mb-6 border border-foreground/10 rounded-lg bg-background/50">
          <h2 className="text-xl font-bold mb-4">{t('dashboard_subscription_title')}</h2>
          {subscription ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground/60">Plan</label>
                  <p className="text-lg font-medium capitalize">{subscription.tier}</p>
                </div>
                <div>
                  <label className="text-sm text-foreground/60">Status</label>
                  <p className="text-lg font-medium capitalize">
                    {subscription.status === 'active' ? 'Aktiv' : subscription.status}
                  </p>
                </div>
                {subscription.current_period_end && (
                  <div>
                    <label className="text-sm text-foreground/60">Nächste Abrechnung</label>
                    <p className="text-lg font-medium">
                      {new Date(subscription.current_period_end).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 text-foreground text-sm font-medium transition-colors"
                  onClick={async () => {
                    // Get session ID from checkout and open billing portal
                    const response = await fetch('/api/stripe/billing-portal', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ sessionId: subscription.stripe_subscription_id })
                    })
                    const data = await response.json()
                    if (data.url) window.location.href = data.url
                  }}
                >
                  {t('dashboard_manage_payment_method')}
                </button>
                <button
                  className="flex-1 px-4 py-2 border border-red-500/30 rounded-lg hover:bg-red-500/10 text-red-400 text-sm font-medium transition-colors"
                  onClick={() => setShowCancellation(true)}
                >
                  {t('dashboard_cancel_subscription')}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-foreground/60">{t('dashboard_no_subscription')}</p>
          )}
        </div>

        {/* Invoices Section */}
        <div className="p-6 border border-foreground/10 rounded-lg bg-background/50">
          <h2 className="text-xl font-bold mb-4">{t('dashboard_invoices_title')}</h2>
          {invoices && invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left py-3 px-2 text-sm font-medium">{t('dashboard_invoice_date')}</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">{t('dashboard_invoice_action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-foreground/5 hover:bg-foreground/5">
                      <td className="py-3 px-2 text-sm">
                        {new Date(invoice.created_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-3 px-2 text-sm capitalize">{invoice.status || 'open'}</td>
                      <td className="py-3 px-2 text-sm">
                        {invoice.pdf_url && (
                          <a
                            href={invoice.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:text-purple-400"
                          >
                            PDF herunterladen
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-foreground/60">{t('dashboard_no_invoices')}</p>
          )}
        </div>

        {/* Cancellation Prevention Flow */}
        {showCancellation && subscription && (
          <CancellationFlow
            tier={subscription.tier}
            onDismiss={() => setShowCancellation(false)}
            onConfirmCancel={handleCancellationConfirm}
            onAcceptOffer={handleCancellationAccept}
          />
        )}

        {/* Subscription History */}
        {subscriptionHistory.length > 0 && (
          <div className="p-6 mt-6 border border-foreground/10 rounded-lg bg-background/50">
            <h2 className="text-xl font-bold mb-4">Abonnement-Verlauf ({subscriptionHistory.length})</h2>
            <div className="space-y-3">
              {subscriptionHistory.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-4 rounded-lg border ${
                    sub.status === 'active'
                      ? 'border-green-500/30 bg-green-500/5'
                      : sub.status === 'cancelled'
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-foreground/10 bg-foreground/5'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium capitalize">
                        {sub.tier} Plan - {sub.status === 'active' ? 'Aktiv' : sub.status === 'cancelled' ? 'Storniert' : sub.status}
                      </p>
                      <p className="text-sm text-foreground/60">
                        Gestartet: {new Date(sub.created_at).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    {sub.status === 'cancelled' && (
                      <div className="text-right">
                        <p className="text-sm text-red-400 font-medium">Storniert</p>
                        <p className="text-xs text-foreground/60">
                          {new Date(sub.updated_at).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
