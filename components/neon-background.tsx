"use client"

import { useEffect, useRef } from "react"

export function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()
  const gridOffsetXRef = useRef(0)
  const gridOffsetYRef = useRef(0)

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

    // Grid parameters for holographic mesh
    const gridSize = 80

    const animate = () => {
      timeRef.current += 0.016

      // Dark background with subtle fade
      ctx.fillStyle = "rgba(10, 10, 26, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update grid offsets for flowing motion
      gridOffsetXRef.current += 0.5
      gridOffsetYRef.current += 0.2

      // Draw holographic grid mesh
      ctx.strokeStyle = "rgba(0, 212, 255, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = -canvas.height; y < canvas.height * 2; y += gridSize) {
        const wave = Math.sin((y + gridOffsetYRef.current) * 0.01 + timeRef.current * 2) * 15
        ctx.beginPath()
        ctx.moveTo(-canvas.width, y + wave)
        ctx.lineTo(canvas.width * 2, y + wave)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
        const wave = Math.sin((x + gridOffsetXRef.current) * 0.01 + timeRef.current * 2) * 15
        ctx.beginPath()
        ctx.moveTo(x + wave, -canvas.height)
        ctx.lineTo(x + wave, canvas.height * 2)
        ctx.stroke()
      }

      // Draw intersections with glow
      for (let y = 0; y < canvas.height; y += gridSize) {
        for (let x = 0; x < canvas.width; x += gridSize) {
          const wave = Math.sin((x + y + gridOffsetXRef.current) * 0.01 + timeRef.current * 2) * 15
          const distance = Math.sqrt(
            Math.pow(x + wave - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          )
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
          const brightness = (1 - distance / maxDistance) * 0.8 + 0.2

          // Glow effect
          const gradient = ctx.createRadialGradient(x + wave, y, 0, x + wave, y, 30)
          gradient.addColorStop(0, `rgba(0, 212, 255, ${brightness * 0.5})`)
          gradient.addColorStop(0.5, `rgba(160, 32, 240, ${brightness * 0.2})`)
          gradient.addColorStop(1, `rgba(0, 212, 255, 0)`)

          ctx.fillStyle = gradient
          ctx.fillRect(x + wave - 30, y - 30, 60, 60)

          // Core point
          ctx.fillStyle = `rgba(0, 255, 200, ${brightness})`
          ctx.beginPath()
          ctx.arc(x + wave, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Central vortex effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const rotationAngle = timeRef.current * 0.5

      for (let i = 0; i < 8; i++) {
        const angle = (rotationAngle + (i / 8) * Math.PI * 2)
        const radius = 150 + Math.sin(timeRef.current * 2 + i) * 50
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Pulsing orbs
        const pulse = Math.sin(timeRef.current * 3 + i) * 0.5 + 0.7
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, 40 * pulse)
        orbGradient.addColorStop(0, `rgba(0, 255, 200, ${pulse * 0.8})`)
        orbGradient.addColorStop(0.5, `rgba(160, 32, 240, ${pulse * 0.4})`)
        orbGradient.addColorStop(1, `rgba(0, 212, 255, 0)`)

        ctx.fillStyle = orbGradient
        ctx.fillRect(x - 40 * pulse, y - 40 * pulse, 80 * pulse, 80 * pulse)

        ctx.fillStyle = `rgba(0, 255, 200, ${pulse})`
        ctx.beginPath()
        ctx.arc(x, y, 5 * pulse, 0, Math.PI * 2)
        ctx.fill()
      }

      // Connecting lines between orbs
      for (let i = 0; i < 8; i++) {
        const angle1 = (rotationAngle + (i / 8) * Math.PI * 2)
        const radius1 = 150 + Math.sin(timeRef.current * 2 + i) * 50
        const x1 = centerX + Math.cos(angle1) * radius1
        const y1 = centerY + Math.sin(angle1) * radius1

        const angle2 = (rotationAngle + ((i + 1) / 8) * Math.PI * 2)
        const radius2 = 150 + Math.sin(timeRef.current * 2 + i + 1) * 50
        const x2 = centerX + Math.cos(angle2) * radius2
        const y2 = centerY + Math.sin(angle2) * radius2

        const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        lineGradient.addColorStop(0, "rgba(0, 212, 255, 0.4)")
        lineGradient.addColorStop(0.5, "rgba(160, 32, 240, 0.6)")
        lineGradient.addColorStop(1, "rgba(0, 255, 200, 0.4)")

        ctx.strokeStyle = lineGradient
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
