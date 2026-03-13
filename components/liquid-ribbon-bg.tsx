"use client"

import { useEffect, useRef } from "react"

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const animate = () => {
      timeRef.current += 0.005

      // Clear with fade for trail effect
      ctx.fillStyle = "rgba(10, 10, 26, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create 3 animated blob shapes with flowing gradients
      const blobs = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4, size: 200, color1: "#00d4ff", color2: "#a020f0" },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, size: 180, color1: "#a020f0", color2: "#ff0080" },
        { x: canvas.width * 0.5, y: canvas.height * 0.3, size: 150, color1: "#ff0080", color2: "#00d4ff" },
      ]

      blobs.forEach((blob, blobIndex) => {
        // Animate blob position
        const offsetX = Math.sin(timeRef.current + blobIndex * 1.5) * 50
        const offsetY = Math.cos(timeRef.current + blobIndex * 2) * 50
        const x = blob.x + offsetX
        const y = blob.y + offsetY

        // Create animated size variation
        const sizeVariation = blob.size + Math.sin(timeRef.current * 0.7 + blobIndex) * 30

        // Draw multiple circles to create organic blob shape
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2
          const radius = sizeVariation
          const circleX = x + Math.cos(angle + timeRef.current) * (radius * 0.3)
          const circleY = y + Math.sin(angle + timeRef.current * 0.8) * (radius * 0.3)
          const circleSize = radius * (0.6 + 0.4 * Math.sin(timeRef.current * 0.5 + i))

          // Create radial gradient
          const gradient = ctx.createRadialGradient(circleX, circleY, 0, circleX, circleY, circleSize)
          gradient.addColorStop(0, blob.color1 + "80")
          gradient.addColorStop(0.5, blob.color1 + "40")
          gradient.addColorStop(1, blob.color2 + "00")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(circleX, circleY, circleSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw main glow
        const mainGradient = ctx.createRadialGradient(x, y, 0, x, y, sizeVariation * 1.5)
        mainGradient.addColorStop(0, blob.color1 + "60")
        mainGradient.addColorStop(0.3, blob.color1 + "30")
        mainGradient.addColorStop(0.7, blob.color2 + "10")
        mainGradient.addColorStop(1, blob.color2 + "00")

        ctx.fillStyle = mainGradient
        ctx.beginPath()
        ctx.arc(x, y, sizeVariation * 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add animated particles that flow between blobs
      for (let i = 0; i < 30; i++) {
        const particleTime = timeRef.current + (i * 0.3)
        const progress = (particleTime % 10) / 10

        // Create path from blob 0 to blob 1 to blob 2 and back
        let px, py, color
        if (progress < 0.33) {
          const t = progress / 0.33
          px = blobs[0].x + (blobs[1].x - blobs[0].x) * t
          py = blobs[0].y + (blobs[1].y - blobs[0].y) * t
          color = blobs[0].color1
        } else if (progress < 0.66) {
          const t = (progress - 0.33) / 0.33
          px = blobs[1].x + (blobs[2].x - blobs[1].x) * t
          py = blobs[1].y + (blobs[2].y - blobs[1].y) * t
          color = blobs[1].color1
        } else {
          const t = (progress - 0.66) / 0.34
          px = blobs[2].x + (blobs[0].x - blobs[2].x) * t
          py = blobs[2].y + (blobs[0].y - blobs[2].y) * t
          color = blobs[2].color1
        }

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(px, py, 0, px, py, 8)
        particleGradient.addColorStop(0, color + "ff")
        particleGradient.addColorStop(1, color + "00")

        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
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
      style={{ background: "transparent", zIndex: 1, top: 0, left: 0 }}
    />
  )
}
