'use client'

import { useState, useEffect } from 'react'
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
  const { orientation, isSupported, hasPermission } = useDeviceOrientation()

  useEffect(() => {
    if (!isSupported || !hasPermission) return

    const updateTilt = () => {
      // Beta: tilt forward/backward (-180 to 180)
      // Gamma: tilt left/right (-90 to 90)
      // Clamp values to ±5-8 degrees for subtle effect
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
  }, [orientation, isSupported, hasPermission, intensity])

  return tiltTransform
}
