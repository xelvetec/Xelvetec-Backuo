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
  baseVx: number
  baseVy: number
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const particlesRef = useRef<Particle[]>([])
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const particleIdRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const initialParticles: Particle[] = Array.from({ length: 80 }).map(() => {
      const baseVx = (Math.random() - 0.5) * 1.5
      const baseVy = (Math.random() - 0.5) * 1.5
      return {
        id: particleIdRef.current++,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: baseVx,
        vy: baseVy,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        baseVx,
        baseVy,
      }
    })

    particlesRef.current = initialParticles

    const handleScroll = () => {
      const currentTime = Date.now()
      const deltaTime = Math.max(currentTime - lastTimeRef.current, 1)
      const deltaScroll = window.scrollY - lastScrollRef.current
      const velocity = deltaScroll / deltaTime

      setScrollVelocity(velocity)
      lastScrollRef.current = window.scrollY
      lastTimeRef.current = currentTime
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Apply base velocity with scroll influence
        particle.vx = particle.baseVx
        particle.vy = particle.baseVy + scrollVelocity * 0.3

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x
          const dy = particle.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const repulsionRadius = 150

          if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * 0.12
            const angle = Math.atan2(dy, dx)
            particle.vx += Math.cos(angle) * force
            particle.vy += Math.sin(angle) * force
          }
        }

        // Apply scroll animation rotation effect
        const scrollInfluence = Math.sin(scrollVelocity * 0.01) * 0.2
        particle.vx += scrollInfluence * 0.1
        particle.vy += scrollInfluence * 0.05

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap particles around edges
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.y > canvas.height + 50) particle.y = -50
        if (particle.y < -50) particle.y = canvas.height + 50

        // Draw particle
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, `rgba(160, 32, 240, ${particle.opacity})`)
        gradient.addColorStop(1, `rgba(0, 212, 255, ${particle.opacity * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            ctx.strokeStyle = `rgba(160, 32, 240, ${(1 - dist / 200) * 0.4})`
            ctx.lineWidth = 1.5
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
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none top-0 left-0"
      style={{ background: "transparent", zIndex: 1 }}
    />
  )
}
