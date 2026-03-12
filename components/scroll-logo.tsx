"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import Image from "next/image"

interface Particle {
  id: number
  angle: number
  distance: number
  size: number
  color: string
  delay: number
  speed: number
}

export function ScrollLogo() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isExploded, setIsExploded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const shrinkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Generate particles
  const particles = useMemo(() => {
    const colors = ["#A020F0", "#3B82F6", "#7C3AED", "#60A5FA", "#ffffff", "#1E3A8A"]
    const newParticles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        angle: (Math.PI * 2 * i) / 60 + Math.random() * 0.3,
        distance: 80 + Math.random() * 180,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.15,
        speed: 0.8 + Math.random() * 0.4,
      })
    }
    return newParticles
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Progress: 0 at top, 1 at 300px scroll
      const progress = Math.min(scrollY / 300, 1)
      setScrollProgress(progress)
      
      // Trigger explosion when scrolling down past threshold
      if (progress > 0.1 && !isExploded) {
        setIsExploded(true)
        // Clear any existing timeout
        if (shrinkTimeoutRef.current) {
          clearTimeout(shrinkTimeoutRef.current)
        }
        // Shrink back after 1.2s
        shrinkTimeoutRef.current = setTimeout(() => {
          setIsExploded(false)
        }, 1200)
      }
      
      // Reset when scrolling back to top
      if (progress < 0.05) {
        setIsExploded(false)
        if (shrinkTimeoutRef.current) {
          clearTimeout(shrinkTimeoutRef.current)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (shrinkTimeoutRef.current) {
        clearTimeout(shrinkTimeoutRef.current)
      }
    }
  }, [isExploded])

  // Magnetic 3D tilt on hover
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!logoRef.current) return
    const rect = logoRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    setMousePos({ x: x * 15, y: y * -15 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
    setIsHovering(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  // Smooth easing
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  const easedProgress = easeOutExpo(scrollProgress)
  
  // Logo transforms based on scroll and explosion state
  const baseScale = 0.3
  const explodedScale = isExploded ? 1.2 : baseScale + easedProgress * 0.9
  const logoOpacity = isExploded ? 0.3 : 0.3 + easedProgress * 0.4

  // Only show when scrolled
  if (scrollProgress < 0.05 && !isExploded) return null

  return (
    <div
      ref={logoRef}
      className="fixed z-20 pointer-events-auto cursor-pointer"
      style={{
        top: "6rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "11rem",
        height: "11rem",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glassmorphism container */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden transition-all duration-700"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(0, 0, 0, 0.6)",
          boxShadow: `
            0 0 60px rgba(160, 32, 240, 0.3),
            inset 0 0 30px rgba(160, 32, 240, 0.1)
          `,
          border: "1px solid rgba(160, 32, 240, 0.5)",
          transform: `
            perspective(1000px)
            rotateX(${isHovering ? mousePos.y : 0}deg)
            rotateY(${isHovering ? mousePos.x : 0}deg)
            scale(${isExploded ? 1.1 : 1})
          `,
          transition: isHovering 
            ? "transform 0.1s ease-out" 
            : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Particles */}
        {isExploded && particles.map((p) => {
          const x = Math.cos(p.angle) * p.distance * (isExploded ? 1 : 0)
          const y = Math.sin(p.angle) * p.distance * (isExploded ? 1 : 0)
          return (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                opacity: isExploded ? 0 : 1,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                transition: `all ${0.6 * p.speed}s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}s`,
              }}
            />
          )
        })}

        {/* Logo */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${explodedScale})`,
            opacity: logoOpacity,
            transition: isExploded 
              ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
              : "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec"
            width={176}
            height={176}
            className="drop-shadow-2xl"
            style={{
              filter: `
                drop-shadow(0 0 20px rgba(160, 32, 240, 0.6))
                drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))
              `,
            }}
          />
        </div>

        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, rgba(160, 32, 240, ${isExploded ? 0.3 : 0.1}) 70%, transparent 100%)`,
            transform: `scale(${isExploded ? 1.5 : 1})`,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  )
}
