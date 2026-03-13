"use client"

import { useEffect, useRef } from "react"

export function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()

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

    const animate = () => {
      timeRef.current += 0.016

      // Clear with subtle trail
      ctx.fillStyle = "rgba(10, 10, 26, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.2

      // Draw 3 neon waves
      for (let wave = 0; wave < 3; wave++) {
        const waveOffset = (wave * Math.PI * 2) / 3
        const time = timeRef.current * (0.5 - wave * 0.1)

        // Pulsing radius
        const radius = maxRadius * 0.3 + Math.sin(time + waveOffset) * maxRadius * 0.25

        // Neon glow effect
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          radius * 0.8,
          centerX,
          centerY,
          radius * 1.3
        )

        const hue = (time * 50 + wave * 120) % 360
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.8)`)
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.4)`)
        gradient.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2)
        ctx.fill()

        // Draw neon ring
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.6)`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw rotating orbiting particles
      for (let i = 0; i < 12; i++) {
        const angle = (timeRef.current * 0.3 + (i / 12) * Math.PI * 2)
        const dist = maxRadius * 0.4
        const x = centerX + Math.cos(angle) * dist
        const y = centerY + Math.sin(angle) * dist

        const hue = (angle * 57.3 + timeRef.current * 50) % 360
        const pulse = Math.sin(timeRef.current * 2 + i) * 0.5 + 0.7

        // Particle core
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${pulse * 0.8})`
        ctx.beginPath()
        ctx.arc(x, y, 4 * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Particle glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 15 * pulse)
        particleGradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${pulse * 0.4})`)
        particleGradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`)
        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connecting lines between orbiting particles
      for (let i = 0; i < 12; i++) {
        const angle1 = (timeRef.current * 0.3 + (i / 12) * Math.PI * 2)
        const angle2 = (timeRef.current * 0.3 + ((i + 1) / 12) * Math.PI * 2)
        const dist = maxRadius * 0.4

        const x1 = centerX + Math.cos(angle1) * dist
        const y1 = centerY + Math.sin(angle1) * dist
        const x2 = centerX + Math.cos(angle2) * dist
        const y2 = centerY + Math.sin(angle2) * dist

        const hue = (angle1 * 57.3 + timeRef.current * 50) % 360

        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.3)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
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
