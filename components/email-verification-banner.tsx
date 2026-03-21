'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'

export function EmailVerificationBanner() {
  const { user } = useAuth()
  const languageContext = useLanguage()
  const translate = languageContext?.translate || ((key: string) => key)
  const [dismissed, setDismissed] = useState(false)
  const [resending, setResending] = useState(false)

  if (dismissed || !user) return null

  const handleResendEmail = async () => {
    setResending(true)
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      })
      if (response.ok) {
        alert(translate('email_verification_sent'))
      }
    } catch (error) {
      console.error('[v0] Error resending verification email:', error)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg z-40 animate-in slide-in-from-top">
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-sm md:text-base mb-1">
            {translate('email_verification_required')}
          </h3>
          <p className="text-xs md:text-sm text-foreground/70">
            {translate('email_verification_check_spam')}
          </p>
          <p className="text-xs text-foreground/60 mt-2">
            {translate('email_verification_sent_to')} <strong>{user.email}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleResendEmail}
            disabled={resending}
            className="flex-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
          >
            {resending ? translate('loading') : translate('email_verification_resend')}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="flex-1 px-3 py-2 border border-foreground/20 hover:bg-foreground/5 text-foreground text-sm font-medium rounded transition-colors"
          >
            {translate('dismiss')}
          </button>
        </div>
      </div>
    </div>
  )
}
  }

  return (
    <Card className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md p-4 bg-yellow-500/10 border border-yellow-500/30 z-40 animate-in slide-in-from-top">
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-sm md:text-base mb-1">
            {translate('email_verification_required')}
          </h3>
          <p className="text-xs md:text-sm text-foreground/70">
            {translate('email_verification_check_spam')}
          </p>
          <p className="text-xs text-foreground/60 mt-2">
            {translate('email_verification_sent_to')} <strong>{user.email}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleResendEmail}
            disabled={resending}
            className="text-xs"
          >
            {resending ? translate('loading') : translate('email_verification_resend')}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDismissed(true)}
            className="text-xs"
          >
            {translate('dismiss')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
