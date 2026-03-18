"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

type AnalysisResult = {
  url: string
  speed: number
  seo: number
  mobile: number
  design: number
  conversion: number
  loadTime: string | number
  pageSize: number
  hasHttps: boolean
  hasCompression: boolean
  recommendations: string[]
  highlights?: string[]
}

export function AnalyzerSection() {
  const { t, language } = useLanguage()
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState<AnalysisResult | null>(null)

  const normalizeUrl = (raw: string) =>
    raw.trim().startsWith("http") ? raw.trim() : `https://${raw.trim()}`

  const validateUrl = (raw: string) => {
    try {
      new URL(normalizeUrl(raw))
      return true
    } catch {
      return false
    }
  }

  const getRateLimitKey = (raw: string) => `xlv_analyzer_${normalizeUrl(raw)}`

  const checkRateLimit = (raw: string): { allowed: boolean; minutesLeft: number } => {
    try {
      const stored = localStorage.getItem(getRateLimitKey(raw))
      if (!stored) return { allowed: true, minutesLeft: 0 }
      const elapsed = (Date.now() - parseInt(stored)) / 60000
      if (elapsed >= 60) return { allowed: true, minutesLeft: 0 }
      return { allowed: false, minutesLeft: Math.ceil(60 - elapsed) }
    } catch {
      return { allowed: true, minutesLeft: 0 }
    }
  }

  const saveRateLimit = (raw: string) => {
    try {
      localStorage.setItem(getRateLimitKey(raw), Date.now().toString())
    } catch {}
  }

  const getRateLimitMessage = (minutes: number): string => {
    if (language === "de")
      return `Diese URL wurde bereits analysiert. Bitte warte noch ${minutes} Minute${minutes !== 1 ? "n" : ""}.`
    if (language === "tr")
      return `Bu URL zaten analiz edildi. Lütfen ${minutes} dakika daha bekleyin.`
    return `This URL was already analyzed. Please wait ${minutes} more minute${minutes !== 1 ? "s" : ""}.`
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

    const { allowed, minutesLeft } = checkRateLimit(url)
    if (!allowed) {
      setError(getRateLimitMessage(minutesLeft))
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), language }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.error === "not_accessible") {
          setError(t("analyzer_error_not_accessible"))
        } else {
          setError(t("analyzer_error_invalid_url"))
        }
        return
      }

      const data = await res.json()
      saveRateLimit(url)
      setResults(data)
    } catch {
      setError(t("analyzer_error_not_accessible"))
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e"
    if (score >= 60) return "#eab308"
    return "#ef4444"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("analyzer_status_good")
    if (score >= 60) return t("analyzer_status_fair")
    return t("analyzer_status_poor")
  }

  const overall = results
    ? Math.round((results.speed + results.seo + results.mobile + results.design + results.conversion) / 5)
    : 0

  const metrics = results
    ? [
        { label: t("analyzer_speed"), value: results.speed, key: "speed" },
        { label: t("analyzer_seo"), value: results.seo, key: "seo" },
        { label: t("analyzer_mobile"), value: results.mobile, key: "mobile" },
        { label: t("analyzer_design"), value: results.design, key: "design" },
        { label: t("analyzer_conversion"), value: results.conversion, key: "conversion" },
      ]
    : []

  return (
    <section
      id="analyzer"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(160,32,240,0.04) 50%, transparent 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A020F0, #00D4FF)" }}>
            {t("analyzer_title")}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t("analyzer_subtitle")}</p>
        </div>

        {!results ? (
          /* Input Form */
          <div className="rounded-2xl border border-white/10 p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, rgba(160,32,240,0.08), rgba(0,212,255,0.06))" }}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError("") }}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder={t("analyzer_placeholder")}
                className="flex-1 px-5 py-4 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 text-base"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-50 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #A020F0, #00D4FF)" }}
              >
                {loading ? t("analyzer_analyzing") : t("analyzer_button")}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-4 flex items-center gap-2">
                <span>⚠</span> {error}
              </p>
            )}
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* URL analyzed */}
            <p className="text-center text-white/50 text-sm">
              {t("analyzer_analysis_for")}: <span className="text-white/80 font-medium">{results.url}</span>
            </p>

            {/* Overall Score */}
            <div className="rounded-2xl border border-white/10 p-8 text-center"
              style={{ background: "linear-gradient(135deg, rgba(160,32,240,0.12), rgba(0,212,255,0.08))" }}>
              <div className="text-7xl font-bold mb-2" style={{ color: getScoreColor(overall) }}>
                {overall}
              </div>
              <div className="text-white/60 text-lg mb-1">{t("analyzer_overall_score")}</div>
              <div className="font-semibold text-base" style={{ color: getScoreColor(overall) }}>
                {getScoreLabel(overall)}
              </div>

              {/* Meta info */}
              <div className="flex justify-center gap-6 mt-4 text-sm text-white/50">
                <span>{t("analyzer_load_time_label")}: <strong className="text-white/80">{results.loadTime}s</strong></span>
                <span>HTTPS: <strong className={results.hasHttps ? "text-green-400" : "text-red-400"}>{results.hasHttps ? "✓" : "✗"}</strong></span>
                <span>GZIP: <strong className={results.hasCompression ? "text-green-400" : "text-red-400"}>{results.hasCompression ? "✓" : "✗"}</strong></span>
              </div>
            </div>

            {/* Per-metric scores */}
            <div className="rounded-2xl border border-white/10 p-8"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="space-y-5">
                {metrics.map((m) => (
                  <div key={m.key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">{m.label}</span>
                      <span className="font-bold text-base" style={{ color: getScoreColor(m.value) }}>
                        {m.value}/100 — {getScoreLabel(m.value)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${m.value}%`, background: getScoreColor(m.value) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <div className="rounded-2xl border border-white/10 p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className="font-bold text-white mb-4">{t("analyzer_improvements")}</h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights (perfect score) */}
            {results.highlights && results.highlights.length > 0 && (
              <div className="rounded-2xl border border-green-500/20 p-8"
                style={{ background: "rgba(34,197,94,0.05)" }}>
                <ul className="space-y-3">
                  {results.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-green-400">
                      <span className="flex-shrink-0">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border p-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(160,32,240,0.15), rgba(0,212,255,0.1))",
                borderColor: "rgba(160,32,240,0.4)",
              }}>
              <h3 className="text-2xl font-bold text-white mb-2">{t("analyzer_cta_title")}</h3>
              <p className="text-white/60 mb-6">{t("analyzer_cta_subtitle")}</p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #A020F0, #00D4FF)" }}
              >
                {t("analyzer_cta_button")}
              </a>
            </div>

            {/* New analysis button */}
            <div className="text-center">
              <button
                onClick={() => { setResults(null); setUrl(""); setError("") }}
                className="px-6 py-3 rounded-xl font-semibold text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all text-sm"
              >
                {t("analyzer_new_analysis")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
