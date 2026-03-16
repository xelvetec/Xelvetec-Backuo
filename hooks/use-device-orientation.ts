'use client'

import { useState, useEffect } from 'react'

export interface DeviceOrientation {
  alpha: number // Z axis rotation (0-360)
  beta: number  // X axis rotation (-180 to 180)
  gamma: number // Y axis rotation (-90 to 90)
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    // Check if DeviceOrientationEvent is supported
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setIsSupported(true)

      const handleOrientation = (event: DeviceOrientationEvent) => {
        console.log("[v0] Device Orientation detected - Beta:", event.beta, "Gamma:", event.gamma)
        setOrientation({
          alpha: event.alpha || 0,
          beta: event.beta || 0,
          gamma: event.gamma || 0,
        })
      }

      window.addEventListener('deviceorientation', handleOrientation)

      // iOS 13+ requires permission - request it automatically
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        'requestPermission' in DeviceOrientationEvent
      ) {
        ;(DeviceOrientationEvent as any).requestPermission()
          .then((permission: string) => {
            console.log("[v0] iOS Permission result:", permission)
            if (permission === 'granted') {
              setHasPermission(true)
            }
          })
          .catch((error: Error) => {
            console.log("[v0] iOS Permission error:", error.message)
            setHasPermission(false)
          })
      } else {
        setHasPermission(true)
      }

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [])

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      'requestPermission' in DeviceOrientationEvent
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission()
        if (permission === 'granted') {
          setHasPermission(true)
        }
      } catch (error) {
        console.error('Permission denied:', error)
      }
    }
  }

  return { orientation, isSupported, hasPermission, requestPermission }
}
