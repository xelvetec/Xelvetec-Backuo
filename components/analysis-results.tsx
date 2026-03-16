'use client'

import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface AnalysisResult {
  url: string
  loadTime: number
  scores: {
    speed: number
    seo: number
    mobile: number
    design: number
    conversion: number
  }
  average: number
  suggestions: {
    speed: Array<{ title: string; description: string; priority: string }>
    seo: Array<{ title: string; description: string; priority: string }>
    mobile: Array<{ title: string; description: string; priority: string }>
    design: Array<{ title: string; description: string; priority: string }>
    conversion: Array<{ title: string; description: string; priority: string }>
  }
}

interface AnalysisResultsProps {
  result: AnalysisResult
}

function ScoreCard({ title, score, suggestions }: { title: string; score: number; suggestions: any[] }) {
  const { t } = useLanguage()
  const getColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const getStatusText = (score: number) => {
    if (score >= 80) return 'Gut'
    if (score >= 60) return 'Befriedigend'
    return 'Verbesserungsbedürftig'
  }

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${score >= 80 ? 'bg-green-500/20 text-green-300' : score >= 60 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
          {getStatusText(score)}
        </span>
      </div>

      <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${getColor(score)} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        {score}/100
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="space-y-3">
          {suggestions.slice(0, 2).map((sug, idx) => (
            <div key={idx} className="text-sm bg-white/5 rounded-lg p-3 border-l-2 border-purple-500/50">
              <p className="font-medium text-white mb-1">{sug.title}</p>
              <p className="text-white/60 text-xs">{sug.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const categories = [
    { key: 'speed', title: 'Ladegeschwindigkeit', icon: '⚡' },
    { key: 'seo', title: 'SEO Bewertung', icon: '🔍' },
    { key: 'mobile', title: 'Mobile Optimierung', icon: '📱' },
    { key: 'design', title: 'Design Bewertung', icon: '🎨' },
    { key: 'conversion', title: 'Conversion Potential', icon: '💰' },
  ]

  return (
    <div className="w-full animate-fade-in">
      {/* Header mit Overall Score */}
      <div className="mb-8 text-center">
        <p className="text-white/60 text-sm mb-2">Analyseergebnis für</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{result.url}</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {result.average}
            </div>
            <p className="text-white/60">Gesamt-Score</p>
          </div>

          <div className="text-white/40">
            {result.loadTime && (
              <p className="text-sm">⏱️ Ladezeit: {result.loadTime}ms</p>
            )}
          </div>
        </div>
      </div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categories.map((cat) => (
          <ScoreCard
            key={cat.key}
            title={cat.title}
            score={result.scores[cat.key as keyof typeof result.scores]}
            suggestions={result.suggestions[cat.key as keyof typeof result.suggestions]}
          />
        ))}
      </div>

      {/* All Suggestions */}
      <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Verbesserungsvorschläge</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(result.suggestions).map(([category, suggestions]: [string, any]) =>
            suggestions && suggestions.length > 0 ? (
              <div key={category}>
                <h4 className="text-sm font-medium text-purple-300 mb-2 uppercase tracking-wider">
                  {categories.find((c) => c.key === category)?.title}
                </h4>
                <div className="space-y-2 ml-0">
                  {suggestions.map((sug: any, idx: number) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex-shrink-0 mt-0.5">
                        {sug.priority === 'high' ? (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{sug.title}</p>
                        <p className="text-white/60 text-xs mt-1">{sug.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
