"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface Particle {
  id: number
  x: number
  y: number
  tx: number
  ty: number
  size: number
  color: string
  delay: number
}

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "explode" | "fade" | "done">("logo")
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate particles for burst effect
    const newParticles: Particle[] = []
    const colors = ["#A020F0", "#3B82F6", "#1E3A8A", "#7C3AED", "#60A5FA", "#ffffff"]
    for (let i = 0; i < 100; i++) {
      const angle = (Math.PI * 2 * i) / 100 + Math.random() * 0.2
      const distance = 200 + Math.random() * 500
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 3 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.4,
      })
    }
    setParticles(newParticles)

    // Phase timings: logo 2s -> explode 1s -> fade 0.6s
    const timer1 = setTimeout(() => setPhase("explode"), 2000)
    const timer2 = setTimeout(() => setPhase("fade"), 2800)
    const timer3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 3400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #0a0a1a 0%, #050508 60%, #000000 100%)",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* Ambient glow orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(160,32,240,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(100px, -50px)",
        }}
      />

      {/* Particle burst - explodes outward */}
      {(phase === "explode" || phase === "fade") && particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: `particle-burst 1.5s ${p.delay}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          } as React.CSSProperties}
        />
      ))}

      {/* Logo container - w-80 h-80 rounded-full */}
      <div
        className={`relative ${phase === "logo" ? "animate-logo-fly-in" : ""}`}
        style={{
          ...(phase === "explode" || phase === "fade"
            ? {
                animation: "logo-explode 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }
            : {}),
        }}
      >
        {/* Rounded glow container */}
        <div
          className="relative w-80 h-80 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(160,32,240,0.1) 0%, transparent 70%)",
          }}
        >
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec Logo"
            width={280}
            height={280}
            className="relative z-10"
            style={{
              filter: `
                drop-shadow(0 0 40px rgba(160, 32, 240, 0.6))
                drop-shadow(0 0 80px rgba(59, 130, 246, 0.4))
                drop-shadow(0 0 120px rgba(160, 32, 240, 0.3))
              `,
            }}
            priority
          />
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 40%, rgba(160,32,240,0.15) 60%, transparent 80%)",
            animation: "ring-pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  )
}
