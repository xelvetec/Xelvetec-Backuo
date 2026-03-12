"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Particle {
  id: number
  angle: number
  distance: number
  size: number
  color: string
  delay: number
}

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "explode" | "fade" | "done">("logo")
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles for burst effect
    const colors = ["#A020F0", "#3B82F6", "#7C3AED", "#60A5FA", "#c084fc", "#ffffff"]
    const newParticles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        angle: (Math.PI * 2 * i) / 60 + Math.random() * 0.2,
        distance: 200 + Math.random() * 350,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.1,
      })
    }
    setParticles(newParticles)

    // FAST 1.5s: logo 0.7s -> explode 0.5s -> fade 0.3s
    const t1 = setTimeout(() => setPhase("explode"), 700)
    const t2 = setTimeout(() => setPhase("fade"), 1200)
    const t3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 1500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <>
      {/* FULLSCREEN OVERLAY - NO CONTAINER/BOX */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #1a0a2e 0%, #0a0a15 40%, #000000 100%)",
          opacity: phase === "fade" ? 0 : 1,
          transition: "opacity 0.3s ease-out",
          pointerEvents: phase === "fade" ? "none" : "auto",
        }}
      >
        {/* Ambient purple glow - pure gradients, no box */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(160,32,240,0.15) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.1) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 70% 60%, rgba(124,58,237,0.08) 0%, transparent 35%)",
          }}
        />
      </div>

      {/* PARTICLES - absolute positioned, no container */}
      {(phase === "explode" || phase === "fade") && particles.map((p) => (
        <div
          key={p.id}
          className="fixed z-[10000] rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            top: "50%",
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            transform: `translate3d(0, 0, 0)`,
            animation: `particle-fly 0.6s ${p.delay}s cubic-bezier(0.2, 0, 0.3, 1) forwards`,
            "--end-x": `${Math.cos(p.angle) * p.distance}px`,
            "--end-y": `${Math.sin(p.angle) * p.distance}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* LOGO - fixed center, NO container class, NO box */}
      <div
        className="fixed z-[10001]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={phase === "logo" ? "animate-logo-fly-in" : ""}
          style={{
            ...(phase === "explode" || phase === "fade"
              ? { animation: "logo-explode 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" }
              : {}),
          }}
        >
          {/* Logo with rounded-3xl glow - NO sharp rectangle */}
          <div
            className="relative w-80 h-80 rounded-3xl flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              boxShadow: `
                0 0 80px rgba(160, 32, 240, 0.4),
                0 0 120px rgba(59, 130, 246, 0.3),
                inset 0 0 60px rgba(160, 32, 240, 0.1)
              `,
              border: "2px solid rgba(160, 32, 240, 0.3)",
            }}
          >
            <Image
              src="/images/xelvetec-logo.png"
              alt="XelveTec"
              width={280}
              height={280}
              priority
              style={{
                filter: `
                  drop-shadow(0 0 40px rgba(160, 32, 240, 0.8))
                  drop-shadow(0 0 80px rgba(59, 130, 246, 0.6))
                  drop-shadow(0 0 120px rgba(160, 32, 240, 0.4))
                `,
              }}
            />
            
            {/* Pulsing ring glow - rounded-3xl */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: "0 0 60px rgba(160, 32, 240, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)",
                animation: "ring-pulse 0.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
