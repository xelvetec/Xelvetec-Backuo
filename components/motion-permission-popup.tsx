'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

export function MotionPermissionPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if DeviceOrientationEvent is supported and iOS 13+
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      const isIOS13Plus =
        typeof DeviceOrientationEvent !== 'undefined' &&
        'requestPermission' in DeviceOrientationEvent

      if (isIOS13Plus) {
        // Check if permission was already asked
        const permissionAsked = localStorage.getItem('motionPermissionAsked')
        if (!permissionAsked) {
          setIsVisible(true)
          localStorage.setItem('motionPermissionAsked', 'true')
        }
      }
    }
  }, [])

  const handleAllow = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      'requestPermission' in DeviceOrientationEvent
    ) {
      try {
        console.log('[v0] Requesting motion permission from popup')
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission()
        console.log('[v0] Permission result:', permission)
        if (permission === 'granted') {
          console.log('[v0] Motion permission granted!')
        }
        setIsVisible(false)
      } catch (error) {
        console.error('[v0] Permission error:', error)
        setIsVisible(false)
      }
    }
  }

  const handleDeny = () => {
    console.log('[v0] Motion permission denied by user')
    setIsVisible(false)
  }

  if (!isMounted || !isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" />

      {/* Popup */}
      <div className="fixed inset-x-0 top-1/2 z-50 flex justify-center px-4 -translate-y-1/2 md:hidden">
        <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-400/20 px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Bewegung erlauben?</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              Diese Website nutzt das Gyroskop deines Handys für einen 3D-Neige-Effekt, der die Website realistisch mit deinem Gerät reagiert.
            </p>
            <p className="text-xs text-gray-400">
              Deine Bewegungsdaten werden nur lokal auf deinem Handy verarbeitet und nicht an Server übermittelt.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 px-6 py-4 border-t border-white/10 bg-white/5">
            <button
              onClick={handleDeny}
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={handleAllow}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-sm font-medium hover:from-purple-600 hover:to-cyan-500 transition-all flex items-center justify-center gap-2"
            >
              Erlauben
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
