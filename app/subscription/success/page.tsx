'use client'

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center glass rounded-3xl p-8">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 animate-bounce" style={{ color: '#00D4FF' }} />
        
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          {t('subscription_success_title') || 'Abonnement aktiviert!'}
        </h1>
        
        <p className="text-foreground/70 mb-8">
          {t('subscription_success_desc') || 'Vielen Dank! Ihr Abonnement ist jetzt aktiv. Sie erhalten eine Bestätigungsmail in Kürze.'}
        </p>

        <div className="space-y-3 mb-8 p-4 rounded-xl" style={{ background: 'rgba(160,32,240,0.1)' }}>
          <p className="text-sm text-foreground/60">
            {t('subscription_success_next') || 'Nächste Schritte:'}
          </p>
          <ul className="text-sm text-foreground/70 text-left space-y-2">
            <li>✓ Hosting wird konfiguriert</li>
            <li>✓ Domain wird aktiviert</li>
            <li>✓ SSL-Zertifikat wird installiert</li>
          </ul>
        </div>

        <Link href="/">
          <Button 
            className="w-full py-3 font-semibold"
            style={{ background: 'linear-gradient(135deg, #A020F0, #00D4FF)' }}
          >
            {t('back_to_home') || 'Zurück zur Startseite'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
