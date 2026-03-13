"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
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

    // Create 50 particles - balanced between quality and performance
    const colors = ["rgba(160, 32, 240, 0.6)", "rgba(0, 212, 255, 0.6)", "rgba(200, 150, 255, 0.4)"]
    
    particlesRef.current = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const animate = () => {
      timeRef.current += 0.016

      // Light fade instead of motion blur - much faster
      ctx.fillStyle = "rgba(10, 10, 26, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Gentle, stable movement
        particle.vx *= 0.995 // Friction
        particle.vy *= 0.995

        // Small random drift
        particle.vx += (Math.random() - 0.5) * 0.05
        particle.vy += (Math.random() - 0.5) * 0.05

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x > canvas.width + 20) particle.x = -20
        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.y > canvas.height + 20) particle.y = -20
        if (particle.y < -20) particle.y = canvas.height + 20

        // Subtle pulse
        const pulse = Math.sin(timeRef.current * 0.5 + particle.x * 0.005) * 0.5 + 1
        const drawSize = particle.size * pulse

        // Draw particle - simple and fast
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, drawSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw some connections, but much fewer
      const maxConnections = 8
      let connectionCount = 0

      for (let i = 0; i < particlesRef.current.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < particlesRef.current.length && connectionCount < maxConnections; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15
            ctx.strokeStyle = `rgba(160, 32, 240, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            connectionCount++
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
