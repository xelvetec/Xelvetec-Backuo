"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function AnalyzerSection() {
  const { t } = useLanguage()
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState<any>(null)

  const validateUrl = (urlString: string) => {
    try {
      new URL(urlString.startsWith("http") ? urlString : `https://${urlString}`)
      return true
    } catch {
      return false
    }
  }

  const handleAnalyze = async () => {
    setError("")
    
    if (!url.trim()) {
      setError(t("analyzer_error_invalid_url"))
      return
    }

    if (!validateUrl(url)) {
      setError(t("analyzer_error_invalid_url"))
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setResults({
        url: url.startsWith("http") ? url : `https://${url}`,
        speed: Math.floor(Math.random() * 40) + 50,
        seo: Math.floor(Math.random() * 40) + 60,
        mobile: Math.floor(Math.random() * 30) + 70,
        design: Math.floor(Math.random() * 35) + 65,
        conversion: Math.floor(Math.random() * 30) + 60,
      })
    } catch (err) {
      setError(t("analyzer_error_not_accessible"))
    } finally {
      setLoading(false)
    }
  }

  const getScoreStatus = (score: number) => {
    if (score >= 80) return t("analyzer_status_good")
    if (score >= 60) return t("analyzer_status_fair")
    return t("analyzer_status_poor")
  }

  const overallScore = results ? Math.round((results.speed + results.seo + results.mobile + results.design + results.conversion) / 5) : 0

  return (
    <section id="analyzer" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("analyzer_title")}</h2>
          <p className="text-lg text-white/60">{t("analyzer_subtitle")}</p>
        </div>

        {!results ? (
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setError("")
                }}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder={t("analyzer_placeholder")}
                className="flex-1 px-6 py-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all disabled:opacity-50"
              >
                {loading ? t("analyzer_analyzing") : t("analyzer_button")}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-white/60 mb-2">{t("analyzer_analysis_for")}</p>
                <h3 className="text-2xl font-bold text-white">{results.url}</h3>
              </div>
              <button
                onClick={() => {
                  setResults(null)
                  setUrl("")
                }}
                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                {t("analyzer_new_analysis")}
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-white/10 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 mb-2">{t("analyzer_overall_score")}</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      {overallScore}
                    </span>
                    <span className="text-xl text-white/80">{getScoreStatus(overallScore)}</span>
                  </div>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400 flex items-center justify-center">
                  <span className="text-3xl font-bold text-purple-400">{overallScore}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { key: "speed", label: t("analyzer_speed"), value: results.speed },
                { key: "seo", label: t("analyzer_seo"), value: results.seo },
                { key: "mobile", label: t("analyzer_mobile"), value: results.mobile },
                { key: "design", label: t("analyzer_design"), value: results.design },
                { key: "conversion", label: t("analyzer_conversion"), value: results.conversion },
              ].map((metric) => (
                <div key={metric.key} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 p-6">
                  <p className="text-white/60 text-sm mb-3">{metric.label}</p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-white mt-3">{metric.value}</p>
                  <p className="text-xs text-white/60 mt-1">{t("analyzer_score")}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl border border-white/10 p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{t("analyzer_cta_title")}</h3>
              <p className="text-white/60 mb-6">{t("analyzer_cta_subtitle")}</p>
              <a
                href="/#contact"
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all"
              >
                {t("analyzer_cta_button")}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
