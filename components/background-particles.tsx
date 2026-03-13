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
  hue: number
  trailX: number[]
  trailY: number[]
  pulseTime: number
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const particlesRef = useRef<Particle[]>([])
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const particleIdRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const timeRef = useRef(0)

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
        hue: Math.random() * 360,
        trailX: [],
        trailY: [],
        pulseTime: Math.random() * Math.PI * 2,
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
      timeRef.current += 0.016

      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Apply base velocity with scroll influence
        particle.vx = particle.baseVx
        particle.vy = particle.baseVy + scrollVelocity * 0.3

        // Mouse repulsion with stronger effect
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

        // Store trail position
        particle.trailX.push(particle.x)
        particle.trailY.push(particle.y)
        if (particle.trailX.length > 8) {
          particle.trailX.shift()
          particle.trailY.shift()
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulseTime += 0.04

        // Wrap particles around edges
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.y > canvas.height + 50) particle.y = -50
        if (particle.y < -50) particle.y = canvas.height + 50

        // Draw particle trail
        for (let i = 0; i < particle.trailX.length - 1; i++) {
          const trailAlpha = (i / particle.trailX.length) * 0.15
          const trailSize = (particle.size * i) / particle.trailX.length
          ctx.fillStyle = `rgba(160, 32, 240, ${trailAlpha})`
          ctx.beginPath()
          ctx.arc(particle.trailX[i], particle.trailY[i], trailSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Pulsing glow effect
        const pulse = Math.sin(particle.pulseTime) * 0.3 + 0.7
        const glowSize = particle.size * (2 + pulse * 0.5)
        const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize)
        glowGradient.addColorStop(0, `rgba(160, 32, 240, ${particle.opacity * pulse * 0.4})`)
        glowGradient.addColorStop(1, `rgba(160, 32, 240, 0)`)
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Main particle with rainbow-like effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`)
        gradient.addColorStop(1, `hsla(${(particle.hue + 120) % 360}, 100%, 40%, ${particle.opacity * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Slowly rotate hue over time
        particle.hue = (particle.hue + 0.3) % 360
      })

      // Draw connections with intensity based on mouse proximity
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            // Enhanced glow on connections when mouse is near
            let connectionIntensity = (1 - dist / 200) * 0.4
            if (mouseRef.current.active) {
              const mouseToMidX = (p1.x + p2.x) / 2 - mouseRef.current.x
              const mouseToMidY = (p1.y + p2.y) / 2 - mouseRef.current.y
              const mouseDist = Math.sqrt(mouseToMidX * mouseToMidX + mouseToMidY * mouseToMidY)
              if (mouseDist < 300) {
                connectionIntensity *= 1 + (1 - mouseDist / 300) * 0.5
              }
            }

            ctx.strokeStyle = `rgba(160, 32, 240, ${connectionIntensity})`
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
