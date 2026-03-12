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
  const [phase, setPhase] = useState<"logo" | "explode" | "done">("logo")
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = []
    const colors = ["#A020F0", "#3B82F6", "#1E3A8A", "#7C3AED", "#60A5FA", "#ffffff"]
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80
      const distance = 150 + Math.random() * 300
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      })
    }
    setParticles(newParticles)

    const timer1 = setTimeout(() => setPhase("explode"), 1800)
    const timer2 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 3200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)" }}
    >
      {/* Particle burst */}
      {phase === "explode" && particles.map((p) => (
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
            animation: `particle-burst 1.2s ${p.delay}s ease-out forwards`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          } as React.CSSProperties}
        />
      ))}

      {/* Logo */}
      <div
        className={`relative ${phase === "logo" ? "animate-logo-fly-in" : ""}`}
        style={{
          ...(phase === "explode"
            ? {
                animation: "glow-explosion 1.2s ease-out forwards",
                transform: "scale(1)",
                opacity: 1,
              }
            : {}),
        }}
      >
        <Image
          src="/images/xelvetec-logo.png"
          alt="XelveTec Logo"
          width={280}
          height={280}
          className="relative z-10 drop-shadow-2xl"
          priority
        />
        {/* Glow behind logo */}
        <div
          className="absolute inset-0 -z-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(160,32,240,0.4) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        />
      </div>

      {/* Fade out overlay */}
      {phase === "explode" && (
        <div
          className="absolute inset-0 z-50"
          style={{
            background: "#000",
            animation: "fade-in-up 0.8s 0.8s ease-in reverse forwards",
            opacity: 0,
          }}
        />
      )}
    </div>
  )
}
