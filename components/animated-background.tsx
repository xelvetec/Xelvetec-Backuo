"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
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

    // Create multiple floating orbs with trails
    const orbs = Array.from({ length: 8 }).map((_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 80 + 40,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      hue: Math.random() * 360,
    }))

    const animate = () => {
      timeRef.current += 0.016

      // Very subtle dark fade
      ctx.fillStyle = "rgba(5, 5, 15, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw orbs
      orbs.forEach((orb, i) => {
        // Sine wave drift
        orb.vx += Math.sin(timeRef.current * 0.5 + i) * 0.02
        orb.vy += Math.cos(timeRef.current * 0.4 + i) * 0.02

        orb.x += orb.vx
        orb.y += orb.vy

        // Wrap around
        if (orb.x > canvas.width + 100) orb.x = -100
        if (orb.x < -100) orb.x = canvas.width + 100
        if (orb.y > canvas.height + 100) orb.y = -100
        if (orb.y < -100) orb.y = canvas.height + 100

        // Update hue for rainbow effect
        orb.hue = (orb.hue + 0.5) % 360

        // Draw orb with multiple glows
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 60%, 0.8)`)
        gradient.addColorStop(0.5, `hsla(${orb.hue + 60}, 100%, 50%, 0.3)`)
        gradient.addColorStop(1, `hsla(${orb.hue}, 100%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fill()

        // Outer glow
        const outerGradient = ctx.createRadialGradient(orb.x, orb.y, orb.size, orb.x, orb.y, orb.size * 2)
        outerGradient.addColorStop(0, `hsla(${orb.hue}, 100%, 50%, 0.2)`)
        outerGradient.addColorStop(1, `hsla(${orb.hue}, 100%, 30%, 0)`)

        ctx.fillStyle = outerGradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between nearby orbs
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x
          const dy = orbs[i].y - orbs[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 400) {
            const alpha = (1 - dist / 400) * 0.3
            const lineGradient = ctx.createLinearGradient(orbs[i].x, orbs[i].y, orbs[j].x, orbs[j].y)
            lineGradient.addColorStop(0, `hsla(${orbs[i].hue}, 100%, 50%, ${alpha})`)
            lineGradient.addColorStop(1, `hsla(${orbs[j].hue}, 100%, 50%, ${alpha})`)

            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 2 * (1 - dist / 400)
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.moveTo(orbs[i].x, orbs[i].y)
            ctx.lineTo(orbs[j].x, orbs[j].y)
            ctx.stroke()
          }
        }
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
