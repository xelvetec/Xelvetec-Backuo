'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'

export default function AuthFormContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, user } = useAuth()
  const languageContext = useLanguage()
  const translate = languageContext?.t || ((key: string) => key)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('[v0] User authenticated, redirecting to:', redirectTo)
      window.location.href = redirectTo
    }
  }, [user, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, fullName)
      }
      // Auth context will handle redirect after successful signup/login
    } catch (err) {
      setError(err instanceof Error ? err.message : translate('auth_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-background/50 backdrop-blur border border-foreground/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            {isLogin ? 'Willkommen zurück' : 'Konto erstellen'}
          </h1>
          <p className="text-center text-foreground/60 mb-8">
            {isLogin ? 'Melden Sie sich an, um Ihr Abonnement zu verwalten' : 'Erstellen Sie ein Konto für Ihr Abonnement'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">{translate('auth_full_name')}</label>
                <input
                  type="text"
                  placeholder={translate('auth_full_name_placeholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background/50 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">{translate('auth_email')}</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background/50 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{translate('auth_password')}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background/50 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? translate('loading') : isLogin ? translate('auth_login_button') : translate('auth_signup_button')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground/60 text-sm">
              {isLogin ? 'Noch kein Konto?' : 'Bereits ein Konto?'}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-purple-500 hover:text-purple-400 font-medium"
              >
                {isLogin ? 'Registrieren' : 'Anmelden'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
