"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgressRef = useRef(0)
  const timeRef = useRef(0)
  const animationIdRef = useRef<number>()
  const fragmentsRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    angle: number
    angularVel: number
    size: number
    life: number
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

    // Handle scroll
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = totalScroll > 0 ? window.scrollY / totalScroll : 0
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      timeRef.current += 0.016

      // Aggressive dark background with red/yellow tints at scroll
      const scrollIntensity = scrollProgressRef.current
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, `hsl(${scrollIntensity * 20}, 100%, ${2 + scrollIntensity * 3}%)`)
      bgGradient.addColorStop(0.5, `hsl(0, 100%, ${1 + scrollIntensity * 2}%)`)
      bgGradient.addColorStop(1, `hsl(${scrollIntensity * 30}, 100%, ${2 + scrollIntensity * 2}%)`)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Generate shattered crystal fragments that explode outward
      if (Math.random() < 0.3 + scrollIntensity * 0.4) {
        for (let i = 0; i < 3 + scrollIntensity * 5; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 4 + Math.random() * 6 + scrollIntensity * 3
          fragmentsRef.current.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            angle: Math.random() * Math.PI * 2,
            angularVel: (Math.random() - 0.5) * 0.3,
            size: 8 + Math.random() * 16 + scrollIntensity * 8,
            life: 1,
          })
        }
      }

      // Update and draw fragments
      for (let i = fragmentsRef.current.length - 1; i >= 0; i--) {
        const frag = fragmentsRef.current[i]
        frag.x += frag.vx
        frag.y += frag.vy
        frag.angle += frag.angularVel
        frag.vx *= 0.98
        frag.vy *= 0.98
        frag.life -= 0.02

        if (frag.life <= 0) {
          fragmentsRef.current.splice(i, 1)
          continue
        }

        // Draw rotating crystal shard with electric glow
        ctx.save()
        ctx.translate(frag.x, frag.y)
        ctx.rotate(frag.angle)

        // Electric glow around fragment
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, frag.size * 1.5)
        glowGradient.addColorStop(0, `hsla(${timeRef.current * 50}, 100%, 60%, ${frag.life * 0.6})`)
        glowGradient.addColorStop(1, `hsla(0, 100%, 40%, 0)`)
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(0, 0, frag.size * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Crystal shard geometry
        ctx.fillStyle = `hsla(${60 + scrollIntensity * 20}, 100%, ${50 + frag.life * 30}%, ${frag.life * 0.8})`
        ctx.strokeStyle = `hsla(0, 100%, 70%, ${frag.life * 0.9})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-frag.size * 0.5, -frag.size * 0.3)
        ctx.lineTo(frag.size * 0.5, -frag.size * 0.2)
        ctx.lineTo(frag.size * 0.3, frag.size * 0.5)
        ctx.lineTo(-frag.size * 0.4, frag.size * 0.4)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        ctx.restore()
      }

      // Draw aggressive electric lightning bolts
      const boltCount = 4 + Math.floor(scrollIntensity * 8)
      for (let i = 0; i < boltCount; i++) {
        const startAngle = (timeRef.current * 0.3 + (i / boltCount) * Math.PI * 2) + Math.sin(timeRef.current * 0.5 + i) * 0.3
        const boltRadius = 200 + Math.sin(timeRef.current * 0.4 + i * 0.5) * 150 + scrollIntensity * 200
        const boltX = centerX + Math.cos(startAngle) * boltRadius
        const boltY = centerY + Math.sin(startAngle) * boltRadius

        const endAngle = startAngle + Math.PI
        const endX = centerX + Math.cos(endAngle) * (boltRadius * 0.5)
        const endY = centerY + Math.sin(endAngle) * (boltRadius * 0.5)

        // Draw jagged lightning bolt
        const points = []
        points.push({ x: boltX, y: boltY })
        for (let j = 0; j < 5; j++) {
          const t = (j + 1) / 6
          const baseX = boltX + (endX - boltX) * t
          const baseY = boltY + (endY - boltY) * t
          const jag = (Math.random() - 0.5) * 40 * (1 + scrollIntensity)
          const jagAngle = Math.atan2(endY - boltY, endX - boltX) + Math.PI / 2
          points.push({
            x: baseX + Math.cos(jagAngle) * jag,
            y: baseY + Math.sin(jagAngle) * jag,
          })
        }
        points.push({ x: endX, y: endY })

        // Electric glow outer
        ctx.strokeStyle = `hsla(${200 + scrollIntensity * 100}, 100%, 50%, ${0.3 + scrollIntensity * 0.3})`
        ctx.lineWidth = 8 + scrollIntensity * 4
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()

        // Electric glow middle
        ctx.strokeStyle = `hsla(${220 + scrollIntensity * 80}, 100%, 65%, ${0.6 + scrollIntensity * 0.3})`
        ctx.lineWidth = 4 + scrollIntensity * 2
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()

        // Core bright white
        ctx.strokeStyle = `hsla(0, 100%, 95%, ${0.8 + scrollIntensity * 0.2})`
        ctx.lineWidth = 1.5 + scrollIntensity * 0.5
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()
      }

      // Draw chaotic particle storm at high scroll
      const stormIntensity = Math.max(0, scrollIntensity - 0.3) * 2
      for (let i = 0; i < 50 + stormIntensity * 100; i++) {
        const angle = (timeRef.current * 1 + (i / 100) * Math.PI * 2) + Math.sin(timeRef.current * 0.8 + i * 0.1) * 0.8
        const radius = 300 + Math.sin(timeRef.current * 0.6 + i * 0.05) * 200 + stormIntensity * 150
        const px = centerX + Math.cos(angle) * radius
        const py = centerY + Math.sin(angle) * radius

        const opacity = (0.4 + Math.sin(timeRef.current * 2 + i * 0.2) * 0.3) * stormIntensity * 1.5
        const particleSize = 1.5 + Math.sin(timeRef.current + i * 0.15) * 1

        ctx.fillStyle = `hsla(${i * 3.6}, 100%, 60%, ${opacity})`
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
