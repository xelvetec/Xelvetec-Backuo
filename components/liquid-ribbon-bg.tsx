"use client"

import { useEffect, useRef } from "react"

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const animate = () => {
      timeRef.current += 0.016

      // Clear with dark background
      ctx.fillStyle = "rgba(10, 10, 26, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const baseSize = Math.min(canvas.width, canvas.height) * 0.25

      // Draw realistic liquid ribbon with multiple layers for depth and glossiness

      // Shadow/depth layer (darker, below)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const x = centerX + Math.cos(angle) * baseSize * 0.8
        const y = centerY + Math.sin(angle) * baseSize * 0.8

        const offset = Math.sin(timeRef.current * 0.5 + i) * baseSize * 0.3

        ctx.fillStyle = `rgba(30, 10, 60, 0.4)`
        ctx.beginPath()
        ctx.ellipse(x, y + offset, baseSize * 0.5, baseSize * 0.3, angle, 0, Math.PI * 2)
        ctx.fill()
      }

      // Main ribbon body - smooth gradient
      const ribbonSegments = 40
      for (let i = 0; i < ribbonSegments; i++) {
        const t = i / ribbonSegments
        const angle = t * Math.PI * 2

        // Create wave deformation
        const waveAmplitude = Math.sin(timeRef.current * 0.8 + t * 6) * 0.4
        const deformX = Math.cos(angle + timeRef.current * 0.3) * baseSize * (0.8 + waveAmplitude)
        const deformY = Math.sin(angle + timeRef.current * 0.3) * baseSize * (0.8 + waveAmplitude)

        // Color gradient from cyan/blue to magenta
        const hue = 200 + (t * 270) + Math.sin(timeRef.current * 0.4) * 30
        const saturation = 90 + Math.sin(timeRef.current * 0.6) * 10
        const lightness = 45 + Math.sin(timeRef.current * 0.5 + t * 5) * 15

        const nextT = (i + 1) / ribbonSegments
        const nextAngle = nextT * Math.PI * 2
        const nextWaveAmplitude = Math.sin(timeRef.current * 0.8 + nextT * 6) * 0.4
        const nextDeformX = Math.cos(nextAngle + timeRef.current * 0.3) * baseSize * (0.8 + nextWaveAmplitude)
        const nextDeformY = Math.sin(nextAngle + timeRef.current * 0.3) * baseSize * (0.8 + nextWaveAmplitude)

        // Main ribbon segment
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        ctx.beginPath()
        ctx.moveTo(centerX + deformX - baseSize * 0.15, centerY + deformY)
        ctx.lineTo(centerX + nextDeformX - baseSize * 0.15, centerY + nextDeformY)
        ctx.lineTo(centerX + nextDeformX + baseSize * 0.15, centerY + nextDeformY)
        ctx.lineTo(centerX + deformX + baseSize * 0.15, centerY + deformY)
        ctx.closePath()
        ctx.fill()

        // Specular highlight - realistic glossy effect
        const highlightIntensity = Math.sin(timeRef.current * 1.2 + t * 8) * 0.5 + 0.5
        const highlightSize = baseSize * 0.08 * highlightIntensity

        if (highlightIntensity > 0.3) {
          const gradient = ctx.createRadialGradient(
            centerX + deformX - baseSize * 0.12,
            centerY + deformY - highlightSize * 2,
            0,
            centerX + deformX - baseSize * 0.12,
            centerY + deformY,
            highlightSize * 1.5
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${highlightIntensity * 0.8})`)
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${highlightIntensity * 0.3})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.ellipse(
            centerX + deformX - baseSize * 0.12,
            centerY + deformY - highlightSize,
            highlightSize * 0.8,
            highlightSize * 1.5,
            0,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }

        // Inner highlight for depth
        const innerHighlight = Math.sin(timeRef.current * 0.9 + t * 6 + Math.PI / 2) * 0.5 + 0.5
        if (innerHighlight > 0.4) {
          ctx.fillStyle = `rgba(200, 100, 255, ${innerHighlight * 0.3})`
          ctx.beginPath()
          ctx.ellipse(centerX + deformX, centerY + deformY - baseSize * 0.05, baseSize * 0.08, baseSize * 0.04, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Outer glow for realism
      const glowGradient = ctx.createRadialGradient(centerX, centerY, baseSize * 0.7, centerX, centerY, baseSize * 1.2)
      glowGradient.addColorStop(0, "rgba(0, 212, 255, 0.15)")
      glowGradient.addColorStop(0.5, "rgba(160, 32, 240, 0.08)")
      glowGradient.addColorStop(1, "rgba(160, 32, 240, 0)")

      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseSize * 1.2, 0, Math.PI * 2)
      ctx.fill()

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
