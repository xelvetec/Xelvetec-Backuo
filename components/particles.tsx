"use client"

import { useEffect, useRef } from "react"

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      color: string
      originalAlpha: number
    }

    const particles: Particle[] = []
    const colors = ["#A020F0", "#00D4FF", "#3B82F6", "#7C3AED"]

    function resize() {
      width = canvas!.parentElement?.clientWidth ?? window.innerWidth
      height = canvas!.parentElement?.clientHeight ?? window.innerHeight
      canvas!.width = width
      canvas!.height = height
    }

    function init() {
      resize()
      const count = Math.min(50, Math.floor((width * height) / 12000))
      particles.length = 0
      for (let i = 0; i < count; i++) {
        const alpha = Math.random() * 0.6 + 0.2
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          alpha,
          originalAlpha: alpha,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Mouse attraction
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.08
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
          p.alpha = Math.min(p.originalAlpha + 0.3, 1)
        } else {
          p.alpha += (p.originalAlpha - p.alpha) * 0.05
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle with glow
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(0.5, p.color + "80")
        gradient.addColorStop(1, "transparent")
        
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx!.fillStyle = gradient
        ctx!.globalAlpha = p.alpha * 0.5
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = p.color
        ctx!.globalAlpha = p.alpha
        ctx!.fill()
        ctx!.globalAlpha = 1
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(160, 32, 240, ${0.15 * (1 - dist / 150)})`
            ctx!.lineWidth = 1
            ctx!.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    init()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
