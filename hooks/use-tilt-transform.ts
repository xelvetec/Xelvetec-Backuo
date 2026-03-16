'use client'

import { useState, useEffect, useRef } from 'react'
import { useDeviceOrientation } from './use-device-orientation'

export interface TiltTransform {
  rotateX: number
  rotateY: number
  perspective: number
}

export function useTiltTransform(intensity: number = 1) {
  const [tiltTransform, setTiltTransform] = useState<TiltTransform>({
    rotateX: 0,
    rotateY: 0,
    perspective: 1200,
  })
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const { orientation, isSupported, hasPermission } = useDeviceOrientation()

  // Detect scrolling to disable tilt during scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    // Don't update tilt while scrolling to improve performance
    if (!isSupported || !hasPermission || isScrolling) return

    const updateTilt = () => {
      const maxTilt = 8 * intensity
      const rotateX = (orientation.beta / 180) * maxTilt
      const rotateY = (orientation.gamma / 90) * maxTilt

      setTiltTransform({
        rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
        rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY)),
        perspective: 1200,
      })
    }

    updateTilt()
  }, [orientation, isSupported, hasPermission, intensity, isScrolling])

  return tiltTransform
}
