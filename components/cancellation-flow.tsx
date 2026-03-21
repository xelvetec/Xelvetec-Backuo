'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CancellationFlowProps {
  tier: string
  onDismiss: () => void
  onConfirmCancel: () => void
  onAcceptOffer: (offer: 'discount20' | 'discount_custom' | 'contact') => void
}

export function CancellationFlow({ tier, onDismiss, onConfirmCancel, onAcceptOffer }: CancellationFlowProps) {
  const [step, setStep] = useState(0)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)

  const reasons = [
    { id: 'expensive', label: 'Zu teuer', emoji: '💰' },
    { id: 'not_using', label: 'Nutze es nicht genug', emoji: '📦' },
    { id: 'switching', label: 'Wechsle zu anderem Anbieter', emoji: '🔄' },
    { id: 'other', label: 'Sonstiges', emoji: '❓' }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-foreground/10 p-6">
        {/* Step 0: Why are you canceling? */}
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Schade, dass Sie gehen</h2>
            <p className="text-foreground/60 mb-6">Können Sie uns mitteilen, warum?</p>
            
            <div className="space-y-3 mb-6">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => {
                    setSelectedReason(reason.id)
                    setStep(1)
                  }}
                  className="w-full p-4 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition text-left"
                >
                  <span className="mr-3">{reason.emoji}</span>
                  <span>{reason.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onDismiss}
              className="w-full text-sm text-foreground/60 hover:text-foreground/80"
            >
              Abbrechen
            </button>
          </div>
        )}

        {/* Step 1: Offer based on reason */}
        {step === 1 && selectedReason === 'expensive' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Wir können helfen!</h2>
            <p className="text-foreground/60 mb-6">
              Wie wäre es mit 20% Rabatt für die nächsten 3 Monate?
            </p>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground/60 mb-2">Aktueller Preis: 29,90€/Monat</p>
              <p className="text-2xl font-bold text-purple-400">23,92€/Monat für 3 Monate</p>
              <p className="text-sm text-foreground/60 mt-2">Danach normaler Preis</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => onAcceptOffer('discount20')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Rabatt annehmen
              </Button>
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="w-full"
              >
                Trotzdem kündigen
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Alternative for other reasons */}
        {step === 1 && selectedReason !== 'expensive' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Es tut uns leid</h2>
            <p className="text-foreground/60 mb-6">
              {selectedReason === 'not_using' && 'Möchten Sie das Abonnement pausieren statt zu kündigen?'}
              {selectedReason === 'switching' && 'Lassen Sie uns wissen, wie wir besser werden können.'}
              {selectedReason === 'other' && 'Wir würden gerne Ihr Feedback hören.'}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => onAcceptOffer('contact')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Mit uns sprechen
              </Button>
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="w-full"
              >
                Trotzdem kündigen
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Final confirmation */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Abonnement kündigen?</h2>
            <p className="text-foreground/60 mb-6">
              Ihre Daten bleiben erhalten. Sie können jederzeit wieder abonnieren.
            </p>

            <div className="space-y-3">
              <Button
                onClick={onConfirmCancel}
                variant="destructive"
                className="w-full"
              >
                Ja, kündigen
              </Button>
              <Button
                onClick={onDismiss}
                variant="outline"
                className="w-full"
              >
                Zurück
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
