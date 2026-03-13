'use client'

import { useEffect, useRef } from 'react'

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const animate = () => {
      timeRef.current += 0.01

      // Clear with dark background
      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = timeRef.current

      // Create ribbon path with multiple curves
      const ribbonWidth = 120
      const ribbonHeight = 200

      // Draw glossy ribbon with gradient
      for (let i = 0; i < 3; i++) {
        // Outer glow - magenta
        const glowGradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          400 + i * 50
        )
        glowGradient.addColorStop(0, `rgba(255, 0, 200, ${0.15 - i * 0.04})`)
        glowGradient.addColorStop(1, 'rgba(255, 0, 200, 0)')

        ctx.fillStyle = glowGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Main ribbon using Bezier curves
      const points: Array<{ x: number; y: number }> = []
      const segments = 100

      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const angle = t * Math.PI * 3 + time
        const radius = 100 + Math.sin(angle * 2) * 40

        // Add wave deformation
        const wave1 = Math.sin(t * Math.PI * 2 + time) * 50
        const wave2 = Math.cos(t * Math.PI * 3 + time * 0.7) * 30

        const x = centerX + Math.cos(angle) * radius + wave1
        const y = centerY + Math.sin(angle) * radius + wave2

        points.push({ x, y })
      }

      // Draw top surface of ribbon - Blue gradient
      ctx.beginPath()
      ctx.moveTo(points[0].x - ribbonWidth / 2, points[0].y)

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const prev = points[Math.max(0, i - 1)]
        const next = points[Math.min(points.length - 1, i + 1)]

        // Perpendicular vector for ribbon width
        const dx = next.x - prev.x
        const dy = next.y - prev.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const perpX = (dy / len) * (ribbonWidth / 2)
        const perpY = (-dx / len) * (ribbonWidth / 2)

        ctx.lineTo(p.x - perpX, p.y - perpY)
      }

      // Blue-to-cyan gradient
      const topGradient = ctx.createLinearGradient(
        centerX - 200,
        centerY - 200,
        centerX + 200,
        centerY + 200
      )
      topGradient.addColorStop(0, 'rgb(0, 150, 255)')
      topGradient.addColorStop(0.5, 'rgb(0, 200, 255)')
      topGradient.addColorStop(1, 'rgb(100, 255, 200)')

      ctx.fillStyle = topGradient
      ctx.fill()

      // Draw bottom surface - darker blue with magenta
      ctx.beginPath()
      ctx.moveTo(points[0].x + ribbonWidth / 2, points[0].y)

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const prev = points[Math.max(0, i - 1)]
        const next = points[Math.min(points.length - 1, i + 1)]

        const dx = next.x - prev.x
        const dy = next.y - prev.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const perpX = (dy / len) * (ribbonWidth / 2)
        const perpY = (-dx / len) * (ribbonWidth / 2)

        ctx.lineTo(p.x + perpX, p.y + perpY)
      }

      const bottomGradient = ctx.createLinearGradient(
        centerX - 200,
        centerY - 200,
        centerX + 200,
        centerY + 200
      )
      bottomGradient.addColorStop(0, 'rgb(150, 0, 200)')
      bottomGradient.addColorStop(0.5, 'rgb(200, 0, 150)')
      bottomGradient.addColorStop(1, 'rgb(100, 0, 200)')

      ctx.fillStyle = bottomGradient
      ctx.fill()

      // Add glossy highlight on top
      ctx.beginPath()
      ctx.moveTo(points[0].x - ribbonWidth / 3, points[0].y)

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const prev = points[Math.max(0, i - 1)]
        const next = points[Math.min(points.length - 1, i + 1)]

        const dx = next.x - prev.x
        const dy = next.y - prev.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const perpX = (dy / len) * (ribbonWidth / 6)
        const perpY = (-dx / len) * (ribbonWidth / 6)

        ctx.lineTo(p.x - perpX, p.y - perpY)
      }

      const glossGradient = ctx.createLinearGradient(0, centerY - 300, 0, centerY + 300)
      glossGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
      glossGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)')
      glossGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = glossGradient
      ctx.fill()

      // Draw edge glow - cyan
      ctx.strokeStyle = 'rgba(0, 255, 200, 0.5)'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(points[0].x - ribbonWidth / 2, points[0].y)
      for (let i = 1; i < points.length; i++) {
        const p = points[i]
        const prev = points[i - 1]
        const next = points[Math.min(points.length - 1, i + 1)]

        const dx = next.x - prev.x
        const dy = next.y - prev.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const perpX = (dy / len) * (ribbonWidth / 2)
        const perpY = (-dx / len) * (ribbonWidth / 2)

        ctx.lineTo(p.x - perpX, p.y - perpY)
      }
      ctx.stroke()

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'transparent', zIndex: 1, top: 0, left: 0 }}
    />
  )
}
