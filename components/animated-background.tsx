"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    angle: number
    size: number
    hue: number
  }>>([])

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

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2,
        size: Math.random() * 3 + 1.5,
        hue: Math.random() * 360,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    const animate = () => {
      timeRef.current += 0.0008

      // Elegant gradient background with subtle color shift
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const hue = (timeRef.current * 5) % 360
      
      gradient.addColorStop(0, `hsl(${hue}, 40%, 8%)`)
      gradient.addColorStop(0.5, `hsl(${hue + 30}, 45%, 10%)`)
      gradient.addColorStop(1, `hsl(${hue + 60}, 40%, 7%)`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = timeRef.current

      // Draw 4 elegant flowing orbs with soft glows
      for (let i = 0; i < 4; i++) {
        const angle = (time * 0.05 + (i / 4) * Math.PI * 2)
        const radius = 350 + Math.sin(time * 0.03 + i * 1.5) * 80
        
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        const baseHue = (hue + i * 90) % 360
        const size = 80 + Math.sin(time * 0.04 + i * 0.7) * 20

        // Outer soft glow - very subtle
        const outerGlow = ctx.createRadialGradient(x, y, size, x, y, size * 3.5)
        outerGlow.addColorStop(0, `hsla(${baseHue}, 70%, 50%, 0.12)`)
        outerGlow.addColorStop(0.5, `hsla(${baseHue}, 70%, 40%, 0.04)`)
        outerGlow.addColorStop(1, `hsla(${baseHue}, 70%, 30%, 0)`)
        
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(x, y, size * 3.5, 0, Math.PI * 2)
        ctx.fill()

        // Mid glow
        const midGlow = ctx.createRadialGradient(x, y, size * 0.4, x, y, size * 2.2)
        midGlow.addColorStop(0, `hsla(${baseHue}, 75%, 55%, 0.18)`)
        midGlow.addColorStop(0.6, `hsla(${baseHue}, 75%, 45%, 0.06)`)
        midGlow.addColorStop(1, `hsla(${baseHue}, 75%, 35%, 0)`)
        
        ctx.fillStyle = midGlow
        ctx.beginPath()
        ctx.arc(x, y, size * 2.2, 0, Math.PI * 2)
        ctx.fill()

        // Core orb with elegant gradient
        const coreGradient = ctx.createRadialGradient(
          x - size * 0.25, 
          y - size * 0.25, 
          0, 
          x, 
          y, 
          size
        )
        coreGradient.addColorStop(0, `hsl(${baseHue}, 80%, 65%)`)
        coreGradient.addColorStop(0.5, `hsl(${baseHue}, 75%, 45%)`)
        coreGradient.addColorStop(1, `hsl(${baseHue}, 70%, 25%)`)
        
        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Subtle specular highlight
        const highlight = ctx.createRadialGradient(
          x - size * 0.3,
          y - size * 0.4,
          0,
          x,
          y,
          size * 0.8
        )
        highlight.addColorStop(0, `hsla(0, 0%, 100%, 0.25)`)
        highlight.addColorStop(1, `hsla(0, 0%, 100%, 0)`)
        
        ctx.fillStyle = highlight
        ctx.beginPath()
        ctx.arc(x, y, size * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw elegant connecting curves between orbs
      for (let i = 0; i < 4; i++) {
        const angle1 = (time * 0.05 + (i / 4) * Math.PI * 2)
        const radius1 = 350 + Math.sin(time * 0.03 + i * 1.5) * 80
        const x1 = centerX + Math.cos(angle1) * radius1
        const y1 = centerY + Math.sin(angle1) * radius1

        const angle2 = (time * 0.05 + ((i + 1) / 4) * Math.PI * 2)
        const radius2 = 350 + Math.sin(time * 0.03 + (i + 1) * 1.5) * 80
        const x2 = centerX + Math.cos(angle2) * radius2
        const y2 = centerY + Math.sin(angle2) * radius2

        const hue1 = (hue + i * 90) % 360
        const hue2 = (hue + (i + 1) * 90) % 360

        const curveGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        curveGradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.08)`)
        curveGradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 75%, 55%, 0.15)`)
        curveGradient.addColorStop(1, `hsla(${hue2}, 70%, 50%, 0.08)`)

        ctx.strokeStyle = curveGradient
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.globalAlpha = 0.6

        // Draw curved path
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        
        const cpx = (x1 + x2) / 2 + Math.sin(time * 0.02 + i) * 50
        const cpy = (y1 + y2) / 2 + Math.cos(time * 0.02 + i) * 50
        
        ctx.quadraticCurveTo(cpx, cpy, x2, y2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Update and draw particles with mouse interaction
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i]

        // Apply slight drift
        particle.vx *= 0.99
        particle.vy *= 0.99
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x
          const dy = particle.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const repulsionRadius = 200

          if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * 0.15
            const angle = Math.atan2(dy, dx)
            particle.vx += Math.cos(angle) * force
            particle.vy += Math.sin(angle) * force
          }
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.angle += 0.02

        // Wrap around edges
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.y > canvas.height + 10) particle.y = -10
        if (particle.y < -10) particle.y = canvas.height + 10

        // Update hue slightly over time
        particle.hue = (particle.hue + 0.1) % 360

        // Draw particle with glow
        const particleGlow = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          0, 
          particle.x, 
          particle.y, 
          particle.size * 4
        )
        particleGlow.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, 0.15)`)
        particleGlow.addColorStop(1, `hsla(${particle.hue}, 80%, 50%, 0)`)

        ctx.fillStyle = particleGlow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Particle core
        ctx.fillStyle = `hsla(${particle.hue}, 85%, 70%, 0.6)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw particle connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < Math.min(i + 5, particlesRef.current.length); j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.08
            ctx.strokeStyle = `hsla(${(p1.hue + p2.hue) / 2}, 75%, 55%, ${alpha})`
            ctx.lineWidth = 0.8
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
      style={{
        background: "transparent",
        zIndex: 0,
        top: 0,
        left: 0,
      }}
    />
  )
}
