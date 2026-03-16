'use client'

import { useState } from 'react'
import { AnalyzerForm } from './analyzer-form'
import { AnalysisResults } from './analysis-results'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export function AnalyzerSection() {
  const { t } = useLanguage()
  const [result, setResult] = useState(null)
  const [showCTA, setShowCTA] = useState(false)

  const handleAnalysisComplete = (data: any) => {
    setResult(data)
    setShowCTA(true)
  }

  const handleNewAnalysis = () => {
    setResult(null)
    setShowCTA(false)
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 800px 600px at 50% 0%, rgba(160,32,240,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {!result ? (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t('analyzer_title')}
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              {t('analyzer_subtitle')}
            </p>

            <div className="flex justify-center mb-12">
              <AnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>
        ) : (
          <div>
            <AnalysisResults result={result} />

            {showCTA && (
              <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {t('analyzer_cta_title')}
                  </h3>
                  <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                    {t('analyzer_cta_subtitle')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/#contact?website={encodeURIComponent(result.url)}"
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {t('analyzer_cta_button')}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={handleNewAnalysis}
                      className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/10 text-white font-semibold transition-all duration-300"
                    >
                      {t('analyzer_new_analysis') || 'Neue Website analysieren'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
