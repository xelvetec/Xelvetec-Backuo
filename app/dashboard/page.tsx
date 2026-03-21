'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getUserSubscription, getUserInvoices } from '@/lib/auth'
import { CancellationFlow } from '@/components/cancellation-flow'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCancellation, setShowCancellation] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      Promise.all([
        getUserSubscription(user.id),
        getUserInvoices(user.id)
      ]).then(([sub, invoices]) => {
        setSubscription(sub)
        setInvoices(invoices)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
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
          <p>Wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Mein Konto</h1>
          <Button
            onClick={async () => {
              await signOut()
              router.push('/')
            }}
            variant="outline"
          >
            Abmelden
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="p-6 mb-6 border border-foreground/10">
          <h2 className="text-xl font-bold mb-4">Profilinformationen</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-foreground/60">E-Mail</label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-foreground/60">Benutzer-ID</label>
              <p className="text-sm font-mono text-foreground/60">{user.id}</p>
            </div>
          </div>
        </Card>

        {/* Subscription Section */}
        <Card className="p-6 mb-6 border border-foreground/10">
          <h2 className="text-xl font-bold mb-4">Abonnement</h2>
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
                <div>
                  <label className="text-sm text-foreground/60">Betrag</label>
                  <p className="text-lg font-medium">
                    {(subscription.amount / 100).toFixed(2)} {subscription.currency.toUpperCase()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-foreground/60">Nächste Abrechnung</label>
                  <p className="text-lg font-medium">
                    {new Date(subscription.current_period_end).toLocaleDateString('de-DE')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="outline">Zahlungsmethode ändern</Button>
                <Button 
                  variant="destructive"
                  onClick={() => setShowCancellation(true)}
                >
                  Abonnement kündigen
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-foreground/60">Kein aktives Abonnement</p>
          )}
        </Card>

        {/* Invoices Section */}
        <Card className="p-6 border border-foreground/10">
          <h2 className="text-xl font-bold mb-4">Rechnungen</h2>
          {invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left py-3 px-2 text-sm font-medium">Datum</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Betrag</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-foreground/5 hover:bg-foreground/5">
                      <td className="py-3 px-2 text-sm">
                        {new Date(invoice.created_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-3 px-2 text-sm font-medium">
                        {(invoice.amount / 100).toFixed(2)} {invoice.currency.toUpperCase()}
                      </td>
                      <td className="py-3 px-2 text-sm capitalize">{invoice.status}</td>
                      <td className="py-3 px-2 text-sm">
                        {invoice.pdf_url && (
                          <a
                            href={invoice.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:text-purple-400"
                          >
                            PDF
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-foreground/60">Keine Rechnungen</p>
          )}
        </Card>

        {/* Cancellation Prevention Flow */}
        {showCancellation && subscription && (
          <CancellationFlow
            tier={subscription.tier}
            onDismiss={() => setShowCancellation(false)}
            onConfirmCancel={handleCancellationConfirm}
            onAcceptOffer={handleCancellationAccept}
          />
        )}
      </div>
    </div>
  )
}
