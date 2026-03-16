'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user already accepted/declined cookies
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    // Here you would enable analytics and tracking scripts
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    // Here you would disable analytics and tracking scripts
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Banner */}
      <div className="bg-background/95 backdrop-blur-sm border-t border-foreground/10 px-4 py-4 sm:px-6 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
              {t('cookie_title')}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/60">
              {t('cookie_description')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDecline}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors duration-200 whitespace-nowrap"
            >
              {t('cookie_decline')}
            </button>
            <button
              onClick={handleAccept}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white hover:shadow-lg hover:shadow-[#A020F0]/50 transition-all duration-200 whitespace-nowrap"
            >
              {t('cookie_accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
