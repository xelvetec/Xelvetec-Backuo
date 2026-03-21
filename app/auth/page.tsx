'use client'

import { Suspense } from 'react'
import AuthFormContent from './auth-form'

function AuthLoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-background/50 backdrop-blur border border-foreground/10 rounded-2xl p-8 text-center">
          <p>Wird geladen...</p>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <AuthFormContent />
    </Suspense>
  )
}
