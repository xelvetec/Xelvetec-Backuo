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

      // Add subtle floating particles
      for (let i = 0; i < 20; i++) {
        const angle = (time * 0.15 + (i / 20) * Math.PI * 2) + Math.sin(time * 0.01 + i * 0.2) * 0.3
        const radius = 450 + Math.sin(time * 0.02 + i * 0.5) * 100
        const px = centerX + Math.cos(angle) * radius
        const py = centerY + Math.sin(angle) * radius

        const particleHue = (hue + i * 18) % 360
        const opacity = (0.3 + Math.sin(time * 0.08 + i * 0.3) * 0.2)
        const size = 2 + Math.sin(time * 0.05 + i * 0.15) * 1

        // Particle glow
        const particleGlow = ctx.createRadialGradient(px, py, 0, px, py, size * 3)
        particleGlow.addColorStop(0, `hsla(${particleHue}, 80%, 60%, ${opacity * 0.6})`)
        particleGlow.addColorStop(1, `hsla(${particleHue}, 80%, 50%, 0)`)

        ctx.fillStyle = particleGlow
        ctx.beginPath()
        ctx.arc(px, py, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Particle core
        ctx.fillStyle = `hsla(${particleHue}, 85%, 70%, ${opacity})`
        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
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
      style={{
        background: "transparent",
        zIndex: 0,
        top: 0,
        left: 0,
      }}
    />
  )
}
