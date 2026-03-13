"use client"

import { useEffect, useRef } from "react"

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const ribbonWaves = Array.from({ length: 3 }).map((_, i) => ({
      offset: (i * Math.PI * 2) / 3,
      amplitude: 80 + i * 20,
      frequency: 0.005 + i * 0.001,
      speed: 1.2 - i * 0.2,
      color: ["#a020f0", "#00d4ff", "#8a4fff"][i],
    }))

    const animate = () => {
      timeRef.current += 0.016

      // Subtle background fade for trail effect
      ctx.fillStyle = "rgba(10, 10, 26, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw flowing liquid ribbons
      ribbonWaves.forEach((wave, waveIndex) => {
        // Create smooth flowing shape using quadratic curves
        ctx.beginPath()

        const startY = canvas.height * (0.3 + waveIndex * 0.15)
        const segments = canvas.width / 20

        for (let x = 0; x <= canvas.width; x += segments) {
          const normalizedX = x / canvas.width
          
          // Multiple sine waves for organic motion
          const wave1 = Math.sin(normalizedX * Math.PI * 3 + timeRef.current * wave.speed) * wave.amplitude
          const wave2 = Math.sin(normalizedX * Math.PI * 2 - timeRef.current * wave.speed * 0.7) * (wave.amplitude * 0.6)
          const wave3 = Math.sin(normalizedX * Math.PI + timeRef.current * wave.speed * 1.3) * (wave.amplitude * 0.4)

          const y = startY + wave1 + wave2 + wave3 + Math.sin(timeRef.current * 0.5 + wave.offset) * 20

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Close path downward for filled ribbon
        ctx.lineTo(canvas.width, canvas.height + 100)
        ctx.lineTo(0, canvas.height + 100)
        ctx.closePath()

        // Create gradient for smooth color transition
        const gradient = ctx.createLinearGradient(0, startY - wave.amplitude, 0, startY + wave.amplitude)
        const baseOpacity = 0.4 - waveIndex * 0.08

        gradient.addColorStop(0, `${wave.color}00`)
        gradient.addColorStop(0.3, `${wave.color}${Math.round(baseOpacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.7, `${wave.color}${Math.round(baseOpacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${wave.color}00`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Add glow edge
        ctx.strokeStyle = `${wave.color}${Math.round(baseOpacity * 0.6 * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Add floating particles within the ribbons for extra dimension
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
      for (let i = 0; i < 20; i++) {
        const x = ((timeRef.current * 50 + i * 200) % (canvas.width + 100)) - 50
        const waveIndex = i % ribbonWaves.length
        const wave = ribbonWaves[waveIndex]
        const startY = canvas.height * (0.3 + waveIndex * 0.15)

        const normalizedX = (x + 50) / canvas.width
        const offsetY =
          Math.sin(normalizedX * Math.PI * 3 + timeRef.current * wave.speed) * wave.amplitude +
          Math.sin(normalizedX * Math.PI * 2 - timeRef.current * wave.speed * 0.7) * (wave.amplitude * 0.6)

        const y = startY + offsetY + Math.sin(timeRef.current * 0.5 + wave.offset) * 20

        const size = 2 + Math.sin(timeRef.current * 0.8 + i) * 1
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: "transparent", zIndex: 1, top: 0, left: 0 }}
    />
  )
}
