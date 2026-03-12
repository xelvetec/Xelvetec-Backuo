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
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const particlesRef = useRef<Particle[]>([])
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const particleIdRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const initialParticles: Particle[] = Array.from({ length: 50 }).map(() => ({
      id: particleIdRef.current++,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }))

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

    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas completely - no blur effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.vy += scrollVelocity * 0.3

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap particles around edges - no bouncing
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

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.strokeStyle = `rgba(160, 32, 240, ${(1 - dist / 150) * 0.3})`
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
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}
