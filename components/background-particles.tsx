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
  trail: Array<{ x: number; y: number }>
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, active: false })

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

    // Create 80 particles - more but with performance optimization
    const colors = ["#a020f0", "#00d4ff", "#8a4fff", "#00ffcc"]
    
    particlesRef.current = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    const animate = () => {
      timeRef.current += 0.016

      // Subtle persistent fade - keeps trails visible
      ctx.fillStyle = "rgba(10, 10, 26, 0.015)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Friction and damping
        particle.vx *= 0.992
        particle.vy *= 0.992

        // Subtle organic drift
        particle.vx += (Math.random() - 0.5) * 0.08
        particle.vy += (Math.random() - 0.5) * 0.08

        // Speed limit
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > 2.5) {
          particle.vx = (particle.vx / speed) * 2.5
          particle.vy = (particle.vy / speed) * 2.5
        }

        // Very subtle mouse attraction - don't dominate movement
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 250) {
            const force = (1 - dist / 250) * 0.05
            particle.vx += (dx / dist) * force
            particle.vy += (dy / dist) * force
          }
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x > canvas.width + 30) particle.x = -30
        if (particle.x < -30) particle.x = canvas.width + 30
        if (particle.y > canvas.height + 30) particle.y = -30
        if (particle.y < -30) particle.y = canvas.height + 30

        // Store trail for smooth lines
        if (!particle.trail) particle.trail = []
        particle.trail.push({ x: particle.x, y: particle.y })
        if (particle.trail.length > 15) particle.trail.shift()

        // Draw smooth trail with gradient
        if (particle.trail.length > 1) {
          for (let i = 0; i < particle.trail.length - 1; i++) {
            const trailAlpha = (i / particle.trail.length) * particle.opacity * 0.4
            ctx.strokeStyle = particle.color.replace(")", `, ${trailAlpha})`).replace("rgb", "rgba")
            ctx.lineWidth = (particle.size * (1 - i / particle.trail.length)) * 0.5
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.beginPath()
            ctx.moveTo(particle.trail[i].x, particle.trail[i].y)
            ctx.lineTo(particle.trail[i + 1].x, particle.trail[i + 1].y)
            ctx.stroke()
          }
        }

        // Subtle pulse animation
        const pulse = Math.sin(timeRef.current * 1.2 + particle.x * 0.003) * 0.4 + 0.8
        const drawSize = particle.size * pulse

        // Draw main particle with soft glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          drawSize * 2.5
        )
        gradient.addColorStop(0, particle.color.replace("rgb", "rgba").replace(")", `, ${particle.opacity})`))
        gradient.addColorStop(0.4, particle.color.replace("rgb", "rgba").replace(")", `, ${particle.opacity * 0.5})`))
        gradient.addColorStop(1, particle.color.replace("rgb", "rgba").replace(")", `, 0)`))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, drawSize * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = particle.color.replace("rgb", "rgba").replace(")", `, ${particle.opacity * 0.9})`)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, drawSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw intelligent connections - only nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i]
        for (let j = i + 1; j < Math.min(i + 8, particlesRef.current.length); j++) {
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, p1.color.replace("rgb", "rgba").replace(")", `, ${alpha})`))
            gradient.addColorStop(1, p2.color.replace("rgb", "rgba").replace(")", `, ${alpha})`))

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.2 * (1 - dist / 140)
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
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
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
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
