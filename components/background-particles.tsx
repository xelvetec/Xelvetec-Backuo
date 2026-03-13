"use client"

import { useEffect, useState, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: "purple" | "cyan" | "white"
  pulsePhase: number
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const particleIdRef = useRef(0)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create more particles with varied sizes and colors
    const initialParticles: Particle[] = Array.from({ length: 100 }).map(() => {
      const colors: ("purple" | "cyan" | "white")[] = ["purple", "cyan", "white"]
      return {
        id: particleIdRef.current++,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 6 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      }
    })

    particlesRef.current = initialParticles

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const animate = () => {
      if (!canvas || !ctx) return

      timeRef.current += 0.016 // ~60fps

      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Add slight oscillation to movement
        particle.vx += (Math.random() - 0.5) * 0.2
        particle.vy += (Math.random() - 0.5) * 0.2

        // Speed limit
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > 3) {
          particle.vx = (particle.vx / speed) * 3
          particle.vy = (particle.vy / speed) * 3
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - particles gravitate toward mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (1 - dist / 200) * 0.15
          particle.vx += (dx / dist) * force
          particle.vy += (dy / dist) * force
        }

        // Wrap particles
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.y > canvas.height + 50) particle.y = -50
        if (particle.y < -50) particle.y = canvas.height + 50

        // Draw particle with pulse effect
        const pulse = Math.sin(timeRef.current + particle.pulsePhase) * 0.3 + 0.7
        const size = particle.size * pulse

        const colorMap = {
          purple: `rgba(160, 32, 240, ${particle.opacity * pulse})`,
          cyan: `rgba(0, 212, 255, ${particle.opacity * pulse})`,
          white: `rgba(255, 255, 255, ${particle.opacity * pulse * 0.8})`,
        }

        ctx.fillStyle = colorMap[particle.color]
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size * 2.5
        )
        gradient.addColorStop(0, colorMap[particle.color])
        gradient.addColorStop(1, `rgba(160, 32, 240, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(
          particle.x - size * 2.5,
          particle.y - size * 2.5,
          size * 5,
          size * 5
        )
      })

      // Draw connections between nearby particles with glow
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.4
            const lineGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            lineGradient.addColorStop(0, `rgba(160, 32, 240, ${alpha})`)
            lineGradient.addColorStop(0.5, `rgba(0, 212, 255, ${alpha * 0.8})`)
            lineGradient.addColorStop(1, `rgba(160, 32, 240, ${alpha})`)

            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 1.5 * (1 - dist / 120)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
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
