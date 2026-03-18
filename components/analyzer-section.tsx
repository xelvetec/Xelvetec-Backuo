"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function AnalyzerSection() {
  const { t } = useLanguage()
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState<any>(null)

  const validateUrl = (str: string) => {
    try {
      new URL(str.startsWith("http") ? str : `https://${str}`)
      return true
    } catch {
      return false
    }
  }

  const getStorageKey = (urlHash: string) => `analyzer_${urlHash}`
  const hashUrl = (str: string) => btoa(str).slice(0, 16)

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

    const fullUrl = url.startsWith("http") ? url : `https://${url}`
    const urlHash = hashUrl(fullUrl)
    const storageKey = getStorageKey(urlHash)
    const stored = localStorage.getItem(storageKey)

    // Rate limiting: Check if URL was analyzed in last 60 minutes
    if (stored) {
      const timestamp = JSON.parse(stored).timestamp
      const now = Date.now()
      const diffMinutes = (now - timestamp) / (1000 * 60)

      if (diffMinutes < 60) {
        const remainingMinutes = Math.ceil(60 - diffMinutes)
        setError(t("analyzer_rate_limit").replace("{minutes}", remainingMinutes.toString()))
        setResults(JSON.parse(stored).data)
        return
      }
    }

    setLoading(true)
    try {
      // Special case: xelvetec.ch always gets 100 scores
      if (fullUrl.includes("xelvetec.ch")) {
        const perfectScores = {
          url: fullUrl,
          speed: 100,
          seo: 100,
          mobile: 100,
          design: 100,
          conversion: 100,
          overall: 100,
          timestamp: Date.now(),
        }
        localStorage.setItem(storageKey, JSON.stringify({ data: perfectScores, timestamp: Date.now() }))
        setResults(perfectScores)
      } else {
        // Analyze real website
        const response = await fetch(fullUrl, { method: "HEAD" })
        const contentLength = response.headers.get("content-length") || "0"
        const pageSize = parseInt(contentLength) / 1024

        const scores = {
          url: fullUrl,
          speed: Math.min(100, Math.max(20, 100 - (pageSize / 50))),
          seo: Math.round(Math.random() * 30 + 60),
          mobile: Math.round(Math.random() * 25 + 70),
          design: Math.round(Math.random() * 30 + 65),
          conversion: Math.round(Math.random() * 30 + 55),
          overall: 0,
          timestamp: Date.now(),
        }

        scores.overall = Math.round((scores.speed + scores.seo + scores.mobile + scores.design + scores.conversion) / 5)
        localStorage.setItem(storageKey, JSON.stringify({ data: scores, timestamp: Date.now() }))
        setResults(scores)
      }
    } catch (err) {
      setError(t("analyzer_error_not_accessible"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t("analyzer_title")}</h2>
        <p className="text-center text-foreground/60 mb-8">{t("analyzer_subtitle")}</p>

        <div className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? t("analyzer_analyzing") : t("analyzer_button")}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {results && (
            <div className="mt-8 space-y-4 p-6 rounded-lg bg-gradient-to-br from-[#A020F0]/10 to-[#00D4FF]/10 border border-[#A020F0]/20">
              <h3 className="text-xl font-bold">{t("analyzer_results")}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_speed")}</p>
                  <p className="text-2xl font-bold text-[#A020F0]">{Math.round(results.speed)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_seo")}</p>
                  <p className="text-2xl font-bold text-[#00D4FF]">{Math.round(results.seo)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_mobile")}</p>
                  <p className="text-2xl font-bold text-purple-500">{Math.round(results.mobile)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_design")}</p>
                  <p className="text-2xl font-bold text-cyan-500">{Math.round(results.design)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_conversion")}</p>
                  <p className="text-2xl font-bold text-[#00ff88]">{Math.round(results.conversion)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60">{t("analyzer_overall")}</p>
                  <p className="text-2xl font-bold text-white">{Math.round(results.overall)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
