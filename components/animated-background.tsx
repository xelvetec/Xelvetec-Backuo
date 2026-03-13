"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgressRef = useRef(0)
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

    // Handle scroll for reactive animation
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = totalScroll > 0 ? window.scrollY / totalScroll : 0
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      timeRef.current += 0.016

      // Epic animated gradient background that reacts to scroll
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      const scrollIntensity = scrollProgressRef.current * 100
      gradient.addColorStop(0, `hsl(270, 100%, ${5 + scrollIntensity * 0.05}%)`)
      gradient.addColorStop(0.5, `hsl(250, 90%, ${8 + scrollIntensity * 0.08}%)`)
      gradient.addColorStop(1, `hsl(260, 100%, ${6 + scrollIntensity * 0.05}%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scrollOffset = scrollProgressRef.current * 600

      // Draw 6 massive morphing orbs that intensify with scroll
      for (let i = 0; i < 6; i++) {
        const angle = (timeRef.current * 0.25 + (i / 6) * Math.PI * 2) + scrollProgressRef.current * Math.PI * 1.5
        const baseRadius = 300 + Math.sin(timeRef.current * 0.4 + i) * 150
        const radius = baseRadius + scrollOffset * 0.3
        
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Size increases dramatically with scroll
        const baseSize = 100 + scrollProgressRef.current * 100
        const pulseFactor = Math.sin(timeRef.current * 0.8 + i * 0.5) * 0.3 + 0.9
        const size = baseSize * pulseFactor

        // Create multiple layer glow effect
        const megaGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
        megaGlow.addColorStop(0, `hsla(${280 + i * 25}, 100%, 60%, ${0.5 + scrollProgressRef.current * 0.4})`)
        megaGlow.addColorStop(0.3, `hsla(${280 + i * 25}, 100%, 50%, ${0.3 + scrollProgressRef.current * 0.2})`)
        megaGlow.addColorStop(1, `hsla(${280 + i * 25}, 100%, 30%, 0)`)

        ctx.fillStyle = megaGlow
        ctx.fillRect(x - size * 4, y - size * 4, size * 8, size * 8)

        // Mid-layer glow
        const midGlow = ctx.createRadialGradient(x, y, size * 0.5, x, y, size * 2.5)
        midGlow.addColorStop(0, `hsla(${280 + i * 25}, 100%, 65%, ${0.7 + scrollProgressRef.current * 0.3})`)
        midGlow.addColorStop(0.5, `hsla(${280 + i * 25}, 100%, 45%, ${0.4})`)
        midGlow.addColorStop(1, `hsla(${280 + i * 25}, 100%, 25%, 0)`)

        ctx.fillStyle = midGlow
        ctx.beginPath()
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Core orb with intense brightness
        const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        coreGradient.addColorStop(0, `hsl(${280 + i * 25}, 100%, 75%)`)
        coreGradient.addColorStop(0.6, `hsl(${280 + i * 25}, 100%, 45%)`)
        coreGradient.addColorStop(1, `hsl(${280 + i * 25}, 100%, 20%)`)

        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Intense rim lighting that pulses
        const rimBrightness = 0.6 + Math.sin(timeRef.current * 1.5 + i) * 0.3 + scrollProgressRef.current * 0.3
        ctx.strokeStyle = `hsla(${280 + i * 25}, 100%, 85%, ${rimBrightness})`
        ctx.lineWidth = 3 + scrollProgressRef.current * 2
        ctx.beginPath()
        ctx.arc(x, y, size + 8, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw ultra-vibrant connecting lines between orbs
      for (let i = 0; i < 6; i++) {
        const angle1 = (timeRef.current * 0.25 + (i / 6) * Math.PI * 2) + scrollProgressRef.current * Math.PI * 1.5
        const baseRadius1 = 300 + Math.sin(timeRef.current * 0.4 + i) * 150
        const radius1 = baseRadius1 + scrollOffset * 0.3
        const x1 = centerX + Math.cos(angle1) * radius1
        const y1 = centerY + Math.sin(angle1) * radius1

        const angle2 = (timeRef.current * 0.25 + ((i + 1) / 6) * Math.PI * 2) + scrollProgressRef.current * Math.PI * 1.5
        const baseRadius2 = 300 + Math.sin(timeRef.current * 0.4 + i + 1) * 150
        const radius2 = baseRadius2 + scrollOffset * 0.3
        const x2 = centerX + Math.cos(angle2) * radius2
        const y2 = centerY + Math.sin(angle2) * radius2

        const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        lineGradient.addColorStop(0, `hsla(280, 100%, 65%, ${0.4 + scrollProgressRef.current * 0.3})`)
        lineGradient.addColorStop(0.5, `hsla(300, 100%, 55%, ${0.6 + scrollProgressRef.current * 0.3})`)
        lineGradient.addColorStop(1, `hsla(280, 100%, 65%, ${0.4 + scrollProgressRef.current * 0.3})`)

        ctx.strokeStyle = lineGradient
        ctx.lineWidth = 3 + scrollProgressRef.current * 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Add 50 ultra-fast floating particles following scroll
      for (let i = 0; i < 50; i++) {
        const particleAngle = (timeRef.current * 0.5 + (i / 50) * Math.PI * 2) + scrollProgressRef.current * 3
        const particleRadius = 400 + Math.sin(timeRef.current * 0.6 + i * 0.3) * 200 + scrollOffset * 0.2
        const px = centerX + Math.cos(particleAngle) * particleRadius
        const py = centerY + Math.sin(particleAngle) * particleRadius

        const opacity = (0.5 + Math.sin(timeRef.current * 0.8 + i) * 0.4) * (0.6 + scrollProgressRef.current * 0.4)
        const particleSize = 2 + Math.sin(timeRef.current + i * 0.2) * 1.5 + scrollProgressRef.current * 1.5
        
        ctx.fillStyle = `hsla(${280 + i * 2.5}, 100%, 65%, ${opacity})`
        ctx.beginPath()
        ctx.arc(px, py, particleSize, 0, Math.PI * 2)
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
      window.removeEventListener("scroll", handleScroll)
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
