'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'
import { ChevronDown } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export function AdvancedCookieBanner() {
  const { language } = useLanguage()
  const t = (key: string) => translations[language]?.[key] || key
  
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('cookiePreferences')
    if (!stored) {
      setIsVisible(true)
    } else {
      setPreferences(JSON.parse(stored))
    }
  }, [])

  const handleRejectAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences))
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleSaveSelection = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setIsVisible(false)
    setShowSettings(false)
  }

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-foreground/10 p-6">
        <div className="max-w-7xl mx-auto">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('cookie_title')}
                </h3>
                <p className="text-sm text-foreground/70 mb-3">
                  {t('cookie_description')}
                </p>
                <p className="text-xs text-foreground/50 mb-3">
                  {t('cookie_supported_regions')}
                </p>
                <a 
                  href="/impressum"
                  className="text-xs text-foreground/60 hover:text-foreground transition-colors underline"
                >
                  {t('cookie_privacy_link')} →
                </a>
              </div>

              {/* Right Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {t('cookie_all_reject')}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
                >
                  {t('cookie_settings')}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                >
                  {t('cookie_all_accept')}
                </button>
              </div>
            </div>
          ) : (
            /* Settings Panel */
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-foreground mb-4">
                  {t('cookie_settings')}
                </h4>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-3">
                {/* Necessary */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-foreground/5 border border-foreground/10">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="mt-1 w-4 h-4 rounded bg-violet-500 text-white cursor-not-allowed"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1">
                      {t('cookie_category_necessary')}
                    </label>
                    <p className="text-xs text-foreground/60">
                      {t('cookie_category_necessary_desc')}
                    </p>
                  </div>
                </div>

                {/* Functional */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 border border-foreground/10 transition-colors cursor-pointer"
                  onClick={() => toggleCategory('functional')}
                >
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => toggleCategory('functional')}
                    className="mt-1 w-4 h-4 rounded bg-violet-500 text-white cursor-pointer"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1 cursor-pointer">
                      {t('cookie_category_functional')}
                    </label>
                    <p className="text-xs text-foreground/60">
                      {t('cookie_category_functional_desc')}
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 border border-foreground/10 transition-colors cursor-pointer"
                  onClick={() => toggleCategory('analytics')}
                >
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => toggleCategory('analytics')}
                    className="mt-1 w-4 h-4 rounded bg-violet-500 text-white cursor-pointer"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1 cursor-pointer">
                      {t('cookie_category_analytics')}
                    </label>
                    <p className="text-xs text-foreground/60">
                      {t('cookie_category_analytics_desc')}
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 border border-foreground/10 transition-colors cursor-pointer"
                  onClick={() => toggleCategory('marketing')}
                >
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => toggleCategory('marketing')}
                    className="mt-1 w-4 h-4 rounded bg-violet-500 text-white cursor-pointer"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground block mb-1 cursor-pointer">
                      {t('cookie_category_marketing')}
                    </label>
                    <p className="text-xs text-foreground/60">
                      {t('cookie_category_marketing_desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-foreground/10">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {t('cookie_all_reject')}
                </button>
                <button
                  onClick={handleSaveSelection}
                  className="px-6 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                >
                  {t('cookie_save_selection')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
