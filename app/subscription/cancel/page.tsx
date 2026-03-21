'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionCancelPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center glass rounded-3xl p-8">
        <AlertCircle className="w-16 h-16 mx-auto mb-6 animate-pulse" style={{ color: '#A020F0' }} />
        
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          {t('subscription_cancel_title') || 'Zahlungsvorgang abgebrochen'}
        </h1>
        
        <p className="text-foreground/70 mb-8">
          {t('subscription_cancel_desc') || 'Es gab ein Problem bei der Verarbeitung Ihrer Zahlung. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.'}
        </p>

        <div className="space-y-3">
          <Link href="/#contact">
            <Button 
              className="w-full py-3 font-semibold"
              style={{ background: 'linear-gradient(135deg, #A020F0, #00D4FF)' }}
            >
              {t('contact_support') || 'Support kontaktieren'}
            </Button>
          </Link>
          
          <Link href="/">
            <Button 
              variant="outline"
              className="w-full py-3 font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('back_to_home') || 'Zurück zur Startseite'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
