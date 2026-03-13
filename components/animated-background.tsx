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

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const animate = () => {
      timeRef.current += 0.012

      // Ultra-dark animated gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      const hue1 = (timeRef.current * 10) % 360
      const hue2 = (timeRef.current * 15 + 120) % 360
      bgGradient.addColorStop(0, `hsl(${hue1}, 100%, 3%)`)
      bgGradient.addColorStop(0.5, `hsl(${hue2}, 95%, 5%)`)
      bgGradient.addColorStop(1, `hsl(${hue1 + 180}, 100%, 4%)`)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw 8 ultra-massive morphing glass blobs with insane glows
      for (let i = 0; i < 8; i++) {
        const angle = (timeRef.current * 0.15 + (i / 8) * Math.PI * 2)
        const waveOffset = Math.sin(timeRef.current * 0.3 + i * 0.7) * 200
        const radius = 500 + waveOffset
        
        const blobX = centerX + Math.cos(angle) * radius
        const blobY = centerY + Math.sin(angle) * radius
        const blobSize = 150 + Math.sin(timeRef.current * 0.4 + i * 0.5) * 80

        const blobHue = (timeRef.current * 20 + i * 45) % 360

        // Ultra-mega glow layer 1 - insanely bright and large
        const megaGlow1 = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobSize * 6)
        megaGlow1.addColorStop(0, `hsla(${blobHue}, 100%, 70%, 0.6)`)
        megaGlow1.addColorStop(0.2, `hsla(${blobHue + 60}, 100%, 55%, 0.3)`)
        megaGlow1.addColorStop(0.5, `hsla(${blobHue + 120}, 100%, 40%, 0.1)`)
        megaGlow1.addColorStop(1, `hsla(${blobHue}, 100%, 20%, 0)`)
        ctx.fillStyle = megaGlow1
        ctx.beginPath()
        ctx.arc(blobX, blobY, blobSize * 6, 0, Math.PI * 2)
        ctx.fill()

        // Ultra-mega glow layer 2 - multiple glows stacked
        const megaGlow2 = ctx.createRadialGradient(blobX, blobY, blobSize * 0.5, blobX, blobY, blobSize * 4)
        megaGlow2.addColorStop(0, `hsla(${blobHue + 120}, 100%, 65%, 0.7)`)
        megaGlow2.addColorStop(0.3, `hsla(${blobHue}, 100%, 50%, 0.4)`)
        megaGlow2.addColorStop(0.7, `hsla(${blobHue - 60}, 100%, 35%, 0.1)`)
        megaGlow2.addColorStop(1, `hsla(${blobHue}, 100%, 20%, 0)`)
        ctx.fillStyle = megaGlow2
        ctx.beginPath()
        ctx.arc(blobX, blobY, blobSize * 4, 0, Math.PI * 2)
        ctx.fill()

        // Mid glow - ultra bright core
        const midGlow = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobSize * 2.5)
        midGlow.addColorStop(0, `hsla(${blobHue}, 100%, 75%, 0.8)`)
        midGlow.addColorStop(0.4, `hsla(${blobHue - 60}, 100%, 55%, 0.5)`)
        midGlow.addColorStop(1, `hsla(${blobHue}, 100%, 25%, 0)`)
        ctx.fillStyle = midGlow
        ctx.beginPath()
        ctx.arc(blobX, blobY, blobSize * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Core blob with glass effect
        const coreGradient = ctx.createRadialGradient(blobX - blobSize * 0.3, blobY - blobSize * 0.3, 0, blobX, blobY, blobSize)
        coreGradient.addColorStop(0, `hsla(${blobHue}, 100%, 85%, 0.9)`)
        coreGradient.addColorStop(0.5, `hsla(${blobHue}, 100%, 55%, 0.7)`)
        coreGradient.addColorStop(1, `hsla(${blobHue}, 100%, 25%, 0.3)`)
        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(blobX, blobY, blobSize, 0, Math.PI * 2)
        ctx.fill()

        // Ultra-vibrant rim light
        const rimPulse = Math.sin(timeRef.current * 2 + i * 0.3) * 0.3 + 0.7
        ctx.strokeStyle = `hsla(${blobHue + 180}, 100%, 75%, ${rimPulse * 0.8})`
        ctx.lineWidth = 4 + rimPulse * 2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.arc(blobX, blobY, blobSize + 15, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw ultra-vibrant connecting beam lines
      for (let i = 0; i < 8; i++) {
        const angle1 = (timeRef.current * 0.15 + (i / 8) * Math.PI * 2)
        const waveOffset1 = Math.sin(timeRef.current * 0.3 + i * 0.7) * 200
        const radius1 = 500 + waveOffset1
        const blobX1 = centerX + Math.cos(angle1) * radius1
        const blobY1 = centerY + Math.sin(angle1) * radius1

        const angle2 = (timeRef.current * 0.15 + ((i + 1) / 8) * Math.PI * 2)
        const waveOffset2 = Math.sin(timeRef.current * 0.3 + (i + 1) * 0.7) * 200
        const radius2 = 500 + waveOffset2
        const blobX2 = centerX + Math.cos(angle2) * radius2
        const blobY2 = centerY + Math.sin(angle2) * radius2

        const hue1 = (timeRef.current * 20 + i * 45) % 360
        const hue2 = (timeRef.current * 20 + (i + 1) * 45) % 360

        const beamGradient = ctx.createLinearGradient(blobX1, blobY1, blobX2, blobY2)
        beamGradient.addColorStop(0, `hsla(${hue1}, 100%, 60%, 0.5)`)
        beamGradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 100%, 70%, 0.7)`)
        beamGradient.addColorStop(1, `hsla(${hue2}, 100%, 60%, 0.5)`)

        // Draw glow around beam
        ctx.shadowColor = `hsl(${(hue1 + hue2) / 2}, 100%, 50%)`
        ctx.shadowBlur = 30
        ctx.strokeStyle = beamGradient
        ctx.lineWidth = 5
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(blobX1, blobY1)
        ctx.lineTo(blobX2, blobY2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw 100+ ultra-fast flowing particles in streams
      for (let i = 0; i < 100; i++) {
        const particleAngle = (timeRef.current * 0.8 + (i / 100) * Math.PI * 2) + Math.sin(timeRef.current * 0.4 + i * 0.1) * 0.5
        const particleRadius = 600 + Math.sin(timeRef.current * 0.5 + i * 0.05) * 300
        const px = centerX + Math.cos(particleAngle) * particleRadius
        const py = centerY + Math.sin(particleAngle) * particleRadius

        const particleHue = (timeRef.current * 30 + i * 3.6) % 360
        const particleOpacity = (0.6 + Math.sin(timeRef.current + i * 0.1) * 0.3) * 0.8
        const particleSize = 3 + Math.sin(timeRef.current * 0.6 + i * 0.15) * 2

        // Particle with soft glow
        const particleGlow = ctx.createRadialGradient(px, py, 0, px, py, particleSize * 3)
        particleGlow.addColorStop(0, `hsla(${particleHue}, 100%, 65%, ${particleOpacity})`)
        particleGlow.addColorStop(1, `hsla(${particleHue}, 100%, 45%, 0)`)
        ctx.fillStyle = particleGlow
        ctx.beginPath()
        ctx.arc(px, py, particleSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Particle core
        ctx.fillStyle = `hsla(${particleHue}, 100%, 80%, ${particleOpacity})`
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
