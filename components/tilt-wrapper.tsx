'use client'

import { ReactNode } from 'react'
import { useTiltTransform } from '@/hooks/use-tilt-transform'
import { useDeviceOrientation } from '@/hooks/use-device-orientation'

interface TiltWrapperProps {
  children: ReactNode
  intensity?: number
  className?: string
}

export function TiltWrapper({
  children,
  intensity = 0.8,
  className = '',
}: TiltWrapperProps) {
  const tiltTransform = useTiltTransform(intensity)
  const { isSupported, hasPermission, requestPermission } =
    useDeviceOrientation()

  // Only apply on mobile
  const isMobile =
    typeof window !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (!isMobile || !isSupported) {
    return <>{children}</>
  }

  // Request permission on first interaction (iOS 13+)
  const handleFirstInteraction = () => {
    if (!hasPermission) {
      requestPermission()
    }
  }

  const transformStyle = hasPermission
    ? {
        transform: `perspective(${tiltTransform.perspective}px) rotateX(${tiltTransform.rotateX}deg) rotateY(${tiltTransform.rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
        transformStyle: 'preserve-3d' as const,
      }
    : {}

  return (
    <div
      className={className}
      style={transformStyle}
      onTouchStart={handleFirstInteraction}
      onClick={handleFirstInteraction}
    >
      {!hasPermission && isSupported && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer hidden md:hidden"
          onClick={requestPermission}
        >
          <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 max-w-xs text-center">
            <p className="text-sm text-gray-300 mb-3">
              Zum Aktivieren des 3D-Effekts wird Gyro-Zugriff benötigt
            </p>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-sm font-medium hover:from-purple-600 hover:to-cyan-500 transition-all"
              onClick={requestPermission}
            >
              Zugriff erlauben
            </button>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
