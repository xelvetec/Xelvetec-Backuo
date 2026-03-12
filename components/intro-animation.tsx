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
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80 + Math.random() * 0.3
      const distance = 150 + Math.random() * 400
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 2 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.15,
      })
    }
    setParticles(newParticles)

    // FAST 1.5s total: logo 0.8s -> explode 0.4s -> fade 0.3s
    const timer1 = setTimeout(() => setPhase("explode"), 800)
    const timer2 = setTimeout(() => setPhase("fade"), 1200)
    const timer3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 1500)

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
        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* Ambient glow orbs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(160,32,240,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div 
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(80px, -40px)",
        }}
      />

      {/* Particle burst */}
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
            animation: `particle-burst 0.8s ${p.delay}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          } as React.CSSProperties}
        />
      ))}

      {/* Logo container - w-72 h-72 rounded-xl */}
      <div
        className={`relative ${phase === "logo" ? "animate-logo-fly-in" : ""}`}
        style={{
          ...(phase === "explode" || phase === "fade"
            ? {
                animation: "logo-explode 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }
            : {}),
        }}
      >
        {/* Rounded-xl glow container */}
        <div
          className="relative w-72 h-72 rounded-xl flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle, rgba(160,32,240,0.08) 0%, transparent 80%)",
          }}
        >
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec Logo"
            width={260}
            height={260}
            className="relative z-10"
            style={{
              filter: `
                drop-shadow(0 0 30px rgba(160, 32, 240, 0.7))
                drop-shadow(0 0 60px rgba(59, 130, 246, 0.5))
                drop-shadow(0 0 100px rgba(160, 32, 240, 0.4))
              `,
            }}
            priority
          />
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "radial-gradient(circle, transparent 30%, rgba(160,32,240,0.2) 50%, transparent 70%)",
            animation: "ring-pulse 1s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  )
}
