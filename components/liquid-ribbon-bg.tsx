"use client"

import { useEffect, useRef } from "react"

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const timeRef = useRef(0)
  const ribbonPointsRef = useRef<Array<{ x: number; y: number; z: number }>>([])

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

    // Generate ribbon path
    const generateRibbonPath = (time: number) => {
      const points = []
      const segments = 120
      const amplitude = 80

      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 2
        const x = Math.cos(t) * 200 + (Math.sin(t * 2 + time * 0.3) * amplitude)
        const y = Math.sin(t) * 200 + (Math.cos(t * 1.5 + time * 0.2) * amplitude)
        const z = Math.sin(t * 3 + time * 0.15) * 100

        points.push({ x, y, z })
      }

      return points
    }

    // Draw 3D ribbon with perspective
    const drawRibbon = (points: Array<{ x: number; y: number; z: number }>, time: number) => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = canvas.height / 5

      // Light fade for motion trails
      ctx.fillStyle = "rgba(10, 10, 26, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ribbon with 3D depth
      const ribbonWidth = 120
      const ribbonWidthPoints = []

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const nextP = points[(i + 1) % points.length]

        // Calculate perpendicular direction for ribbon width
        const dx = nextP.x - p.x
        const dy = nextP.y - p.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const perpX = -dy / len
        const perpY = dx / len

        // Project 3D point to 2D screen
        const screenX = centerX + (p.x + p.z * Math.cos(time * 0.5)) * scale * 0.5
        const screenY = centerY + (p.y + p.z * Math.sin(time * 0.3)) * scale * 0.5

        const offsetX = perpX * ribbonWidth
        const offsetY = perpY * ribbonWidth

        ribbonWidthPoints.push({
          x1: screenX - offsetX,
          y1: screenY - offsetY,
          x2: screenX + offsetX,
          y2: screenY + offsetY,
          z: p.z,
          index: i,
        })
      }

      // Draw ribbon segments with color gradient
      for (let i = 0; i < ribbonWidthPoints.length - 1; i++) {
        const curr = ribbonWidthPoints[i]
        const next = ribbonWidthPoints[i + 1]

        // Calculate gradient from blue to magenta
        const ratio = i / ribbonWidthPoints.length
        const hue = 240 + ratio * 120 // Blue to Magenta
        const lightness = 50 + Math.sin(time * 0.5 + ratio * Math.PI) * 20

        // Main ribbon body
        const gradient = ctx.createLinearGradient(curr.x1, curr.y1, curr.x2, curr.y2)

        // Blue to Magenta gradient
        gradient.addColorStop(0, `hsl(240, 100%, ${40 + curr.z * 0.05}%)`)
        gradient.addColorStop(0.5, `hsl(${280 + ratio * 20}, 100%, ${45 + curr.z * 0.08}%)`)
        gradient.addColorStop(1, `hsl(${300 + ratio * 30}, 100%, ${40 + curr.z * 0.05}%)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(curr.x1, curr.y1)
        ctx.lineTo(next.x1, next.y1)
        ctx.lineTo(next.x2, next.y2)
        ctx.lineTo(curr.x2, curr.y2)
        ctx.closePath()
        ctx.fill()

        // Glow edge for depth
        const glowGradient = ctx.createLinearGradient(curr.x1, curr.y1, curr.x2, curr.y2)
        glowGradient.addColorStop(0, `hsla(240, 100%, 60%, ${0.4 + Math.sin(time * 1.5) * 0.2})`)
        glowGradient.addColorStop(0.5, `hsla(280, 100%, 70%, ${0.6 + Math.sin(time * 1.2) * 0.25})`)
        glowGradient.addColorStop(1, `hsla(300, 100%, 60%, ${0.4 + Math.sin(time * 1.3) * 0.2})`)

        ctx.strokeStyle = glowGradient
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(curr.x1, curr.y1)
        ctx.lineTo(next.x1, next.y1)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(curr.x2, curr.y2)
        ctx.lineTo(next.x2, next.y2)
        ctx.stroke()
      }

      // Add specular highlight for glossiness
      for (let i = 0; i < ribbonWidthPoints.length; i += 3) {
        const p = ribbonWidthPoints[i]
        const highlightX = (p.x1 + p.x2) / 2
        const highlightY = (p.y1 + p.y2) / 2

        const highlightGradient = ctx.createRadialGradient(highlightX, highlightY - 30, 0, highlightX, highlightY, 60)
        highlightGradient.addColorStop(0, `hsla(0, 100%, 100%, ${0.6 + Math.sin(time * 2 + p.index) * 0.3})`)
        highlightGradient.addColorStop(1, `hsla(0, 100%, 100%, 0)`)

        ctx.fillStyle = highlightGradient
        ctx.beginPath()
        ctx.arc(highlightX, highlightY - 30, 60, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      timeRef.current += 0.016

      const points = generateRibbonPath(timeRef.current)
      ribbonPointsRef.current = points
      drawRibbon(points, timeRef.current)

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
