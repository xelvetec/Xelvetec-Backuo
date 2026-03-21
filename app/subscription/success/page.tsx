'use client'

import { Suspense } from 'react'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle, ArrowRight, Settings, Loader } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

function SuccessContent() {
  const languageContext = useLanguage()
  const translate = languageContext?.t || ((key: string) => key)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)

  const handleManageSubscription = async () => {
    try {
      setIsLoadingPortal(true)
      const response = await fetch('/api/stripe/billing-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('[v0] Error opening billing portal:', error)
    } finally {
      setIsLoadingPortal(false)
    }
  }

  return (
    <div className="max-w-md w-full text-center glass rounded-3xl p-8">
      <CheckCircle className="w-16 h-16 mx-auto mb-6 animate-bounce" style={{ color: '#00D4FF' }} />
      
      <h1 className="text-3xl font-bold mb-2 text-foreground">
        {translate('subscription_success_title')}
      </h1>
      
      <p className="text-foreground/70 mb-8">
        {translate('subscription_success_desc')}
      </p>

      <div className="space-y-3 mb-8 p-4 rounded-xl" style={{ background: 'rgba(160,32,240,0.1)' }}>
        <p className="text-sm text-foreground/60">
          {translate('subscription_success_next')}
        </p>
        <ul className="text-left space-y-2">
          <li className="text-sm text-foreground/70">
            ✓ {translate('subscription_success_step1')}
          </li>
          <li className="text-sm text-foreground/70">
            ✓ {translate('subscription_success_step2')}
          </li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleManageSubscription}
          disabled={isLoadingPortal}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoadingPortal ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              {translate('loading')}
            </>
          ) : (
            <>
              <Settings className="w-4 h-4" />
              {translate('subscription_manage')}
            </>
          )}
        </button>
        <Link href="/dashboard">
          <button className="flex-1 px-4 py-3 border border-foreground/20 rounded-lg font-semibold text-sm transition-colors hover:bg-foreground/5 flex items-center justify-center gap-2">
            <ArrowRight className="w-4 h-4" />
            {translate('subscription_go_dashboard')}
          </button>
        </Link>
      </div>

      <p className="text-xs text-foreground/50 mt-6">
        {translate('subscription_support_info')}
      </p>
    </div>
  )
}
        </p>
        <ul className="text-sm text-foreground/70 text-left space-y-2">
          <li>✓ Hosting wird konfiguriert</li>
          <li>✓ Domain wird aktiviert</li>
          <li>✓ SSL-Zertifikat wird installiert</li>
        </ul>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleManageSubscription}
          disabled={isLoadingPortal}
          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #A020F0, #00D4FF)' }}
        >
          <Settings className="w-4 h-4" />
          {isLoadingPortal ? (t('contact_loading') || 'Wird geladen...') : (t('manage_subscription') || 'Abo verwalten')}
        </button>

        <Link href="/">
          <Button 
            className="w-full py-3 font-semibold"
            style={{ background: 'rgba(160,32,240,0.15)', color: '#fff', border: '1px solid rgba(160,32,240,0.4)' }}
          >
            {t('back_to_home') || 'Zurück zur Startseite'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function SuccessLoading() {
  return (
    <div className="max-w-md w-full text-center">
      <Loader className="w-12 h-12 text-[#A020F0] mx-auto mb-4 animate-spin" />
      <p className="text-foreground/60">Loading success page...</p>
    </div>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
      <Suspense fallback={<SuccessLoading />}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
