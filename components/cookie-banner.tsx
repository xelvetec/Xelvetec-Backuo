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

export function CookieBanner() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  const t = (key: string) => translations[language]?.[key] || key

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem('cookiePreferences')
    if (!savedPreferences) {
      setIsVisible(true)
    }
  }, [])

  const handleRejectAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
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
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences))
    setIsVisible(false)
  }

  const handleSaveSettings = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setIsVisible(false)
    setShowSettings(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Notwendige Cookies können nicht deaktiviert werden
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-black/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{t('cookie_title')}</h3>
              <p className="text-sm text-gray-300 mb-2">{t('cookie_description')}</p>
              <p className="text-xs text-gray-400 mb-3">{t('cookie_regions')}</p>
              <a href="/datenschutz" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                {t('cookie_privacy_link')} →
              </a>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {t('cookie_reject_all')}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                {t('cookie_settings')}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-sm font-medium hover:from-purple-600 hover:to-cyan-500 transition-all"
              >
                {t('cookie_accept_all')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />

          {/* Settings Panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 md:inset-0 md:flex md:items-center md:justify-center">
            <div className="w-full md:w-full md:max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-t-3xl md:rounded-3xl max-h-[80vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{t('cookie_settings')}</h2>
                  <p className="text-sm text-gray-400">{t('cookie_description')}</p>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-8">
                  {/* Necessary - Always enabled */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 rounded mt-1 cursor-not-allowed accent-purple-500"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-white mb-1">
                          {t('cookie_necessary')}
                        </label>
                        <p className="text-xs text-gray-400">{t('cookie_necessary_desc')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                        className="w-5 h-5 rounded mt-1 cursor-pointer accent-purple-500"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-white mb-1">
                          {t('cookie_functional')}
                        </label>
                        <p className="text-xs text-gray-400">{t('cookie_functional_desc')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="w-5 h-5 rounded mt-1 cursor-pointer accent-purple-500"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-white mb-1">
                          {t('cookie_analytics')}
                        </label>
                        <p className="text-xs text-gray-400">{t('cookie_analytics_desc')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="w-5 h-5 rounded mt-1 cursor-pointer accent-purple-500"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-white mb-1">
                          {t('cookie_marketing')}
                        </label>
                        <p className="text-xs text-gray-400">{t('cookie_marketing_desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors flex-1"
                  >
                    {language === 'de' ? 'Zurück' : language === 'tr' ? 'Geri' : 'Back'}
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium hover:from-purple-600 hover:to-cyan-500 transition-all flex-1"
                  >
                    {t('cookie_save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

