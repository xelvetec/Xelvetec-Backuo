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
      timeRef.current += 0.016

      // Clear with fade trail effect
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw multiple flowing wave layers
      for (let layer = 0; layer < 5; layer++) {
        const layerTime = timeRef.current * (0.5 + layer * 0.2)
        const yOffset = (canvas.height / 5) * layer + canvas.height / 10

        // Create gradient for this layer
        const gradient = ctx.createLinearGradient(0, yOffset - 200, 0, yOffset + 200)
        
        const hue1 = (layer * 60 + layerTime * 20) % 360
        const hue2 = (layer * 60 + 120 + layerTime * 20) % 360
        
        gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0)`)
        gradient.addColorStop(0.25, `hsla(${hue1}, 100%, 50%, 0.15)`)
        gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 60%, 0.25)`)
        gradient.addColorStop(0.75, `hsla(${hue1}, 100%, 50%, 0.15)`)
        gradient.addColorStop(1, `hsla(${hue1}, 100%, 50%, 0)`)

        ctx.fillStyle = gradient

        // Draw wavy form
        ctx.beginPath()
        ctx.moveTo(0, yOffset)

        for (let x = 0; x <= canvas.width; x += 20) {
          const wave1 = Math.sin((x * 0.005 + layerTime) * (1 + layer * 0.3)) * 60
          const wave2 = Math.cos((x * 0.003 + layerTime * 1.5) * (0.8 + layer * 0.2)) * 40
          const y = yOffset + wave1 + wave2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height + 200)
        ctx.lineTo(0, canvas.height + 200)
        ctx.closePath()
        ctx.fill()
      }

      // Draw floating orbs
      for (let i = 0; i < 6; i++) {
        const angle = (timeRef.current * 0.3 + (i / 6) * Math.PI * 2)
        const radius = 200 + Math.sin(timeRef.current * 0.5 + i) * 100
        const x = canvas.width / 2 + Math.cos(angle) * radius
        const y = canvas.height / 2 + Math.sin(angle) * radius

        const hue = (i * 60 + timeRef.current * 30) % 360
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 150)
        glowGradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`)
        glowGradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.1)`)
        glowGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, 150, 0, Math.PI * 2)
        ctx.fill()

        // Core orb
        const orbGradient = ctx.createRadialGradient(x - 20, y - 20, 0, x, y, 40)
        orbGradient.addColorStop(0, `hsla(${hue}, 100%, 100%, 0.8)`)
        orbGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`)

        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, Math.PI * 2)
        ctx.fill()
      }

      // Connecting lines between orbs
      for (let i = 0; i < 6; i++) {
        const angle1 = (timeRef.current * 0.3 + (i / 6) * Math.PI * 2)
        const radius1 = 200 + Math.sin(timeRef.current * 0.5 + i) * 100
        const x1 = canvas.width / 2 + Math.cos(angle1) * radius1
        const y1 = canvas.height / 2 + Math.sin(angle1) * radius1

        const angle2 = (timeRef.current * 0.3 + ((i + 1) / 6) * Math.PI * 2)
        const radius2 = 200 + Math.sin(timeRef.current * 0.5 + i + 1) * 100
        const x2 = canvas.width / 2 + Math.cos(angle2) * radius2
        const y2 = canvas.height / 2 + Math.sin(angle2) * radius2

        const hue = (i * 60 + timeRef.current * 30) % 360
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.3)`
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
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
