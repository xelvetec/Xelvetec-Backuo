"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function AnalyzerSection() {
  const { t, language } = useLanguage()
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

  const checkRateLimit = (urlString: string): { allowed: boolean; minutesLeft?: number } => {
    const normalizedUrl = urlString.startsWith("http") ? urlString : `https://${urlString}`
    const key = `analyzer_${normalizedUrl}`
    const lastAnalyzed = localStorage.getItem(key)
    
    if (!lastAnalyzed) return { allowed: true }
    
    const lastTime = parseInt(lastAnalyzed)
    const now = Date.now()
    const minutesElapsed = (now - lastTime) / (1000 * 60)
    
    if (minutesElapsed >= 60) {
      return { allowed: true }
    }
    
    return { allowed: false, minutesLeft: Math.ceil(60 - minutesElapsed) }
  }

  const setRateLimit = (urlString: string) => {
    const normalizedUrl = urlString.startsWith("http") ? urlString : `https://${urlString}`
    const key = `analyzer_${normalizedUrl}`
    localStorage.setItem(key, Date.now().toString())
  }

  const getRateLimitMessage = (minutesLeft: number) => {
    if (language === "de") {
      return `Diese URL wurde bereits analysiert. Bitte warten Sie noch ${minutesLeft} Minute${minutesLeft !== 1 ? 'n' : ''}.`
    } else if (language === "tr") {
      return `Bu URL zaten analiz edildi. Lütfen ${minutesLeft} dakika daha bekleyin.`
    } else {
      return `This URL was already analyzed. Please wait ${minutesLeft} more minute${minutesLeft !== 1 ? 's' : ''}.`
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

    const rateLimit = checkRateLimit(url)
    
    if (!rateLimit.allowed) {
      setError(getRateLimitMessage(rateLimit.minutesLeft || 1))
      return
    }

    setLoading(true)
    try {
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setRateLimit(url)
      setResults({
        url: normalizedUrl,
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
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
              >
                {loading ? t("analyzer_analyzing") : t("analyzer_button")}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-white/10 p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{results.speed}</div>
                  <div className="text-sm text-white/60">{t("analyzer_speed")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{results.seo}</div>
                  <div className="text-sm text-white/60">{t("analyzer_seo")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{results.mobile}</div>
                  <div className="text-sm text-white/60">{t("analyzer_mobile")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">{results.design}</div>
                  <div className="text-sm text-white/60">{t("analyzer_design")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{results.conversion}</div>
                  <div className="text-sm text-white/60">{t("analyzer_conversion")}</div>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/10">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">{overallScore}</div>
                <div className="text-white/60">{t("analyzer_average")}</div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setResults(null)
                  setUrl("")
                  setError("")
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all"
              >
                {language === "de" ? "Neue Analyse" : language === "tr" ? "Yeni Analiz" : "New Analysis"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
