"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

type AnimationPhase = "hidden" | "flying" | "exploded" | "shrinking" | "navbar"

export function ScrollLogo() {
  const [phase, setPhase] = useState<AnimationPhase>("hidden")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const shrinkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let scrollY = 0
    let targetPhase: AnimationPhase = "hidden"

    const updateAnimation = () => {
      scrollY = window.scrollY

      // Determine target phase based on scroll position
      if (scrollY < 50) {
        targetPhase = "hidden"
      } else if (scrollY >= 50 && scrollY < 200) {
        targetPhase = "flying"
      } else if (scrollY >= 200) {
        targetPhase = "exploded"
      }

      // Handle phase transitions
      if (targetPhase !== phase) {
        // Clear any pending shrink timeout
        if (shrinkTimeoutRef.current) {
          clearTimeout(shrinkTimeoutRef.current)
          shrinkTimeoutRef.current = null
        }

        if (targetPhase === "exploded" && phase !== "shrinking") {
          setPhase("exploded")
          // After 1s, shrink back to navbar
          shrinkTimeoutRef.current = setTimeout(() => {
            setPhase("shrinking")
            // After shrink animation, go to navbar state
            setTimeout(() => {
              setPhase("navbar")
            }, 400)
          }, 1000)
        } else if (targetPhase === "hidden") {
          setPhase("hidden")
        } else if (targetPhase === "flying" && phase === "hidden") {
          setPhase("flying")
        }
      }

      // Scroll UP detection - instant reverse
      if (scrollY < lastScrollY.current && scrollY < 100) {
        if (shrinkTimeoutRef.current) {
          clearTimeout(shrinkTimeoutRef.current)
          shrinkTimeoutRef.current = null
        }
        setPhase("hidden")
      }

      lastScrollY.current = scrollY
    }

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateAnimation)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (shrinkTimeoutRef.current) {
        clearTimeout(shrinkTimeoutRef.current)
      }
    }
  }, [phase])

  // Magnetic 3D tilt on hover
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!logoRef.current) return
    const rect = logoRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    setMousePos({ x: x * 12, y: y * -12 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
    setIsHovering(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  // Don't render if hidden
  if (phase === "hidden") return null

  // Calculate transform values based on phase
  const getTransformStyle = () => {
    const baseStyle = {
      position: "fixed" as const,
      zIndex: 30,
      pointerEvents: "auto" as const,
      willChange: "transform" as const,
    }

    switch (phase) {
      case "flying":
        return {
          ...baseStyle,
          top: "8rem",
          left: "50%",
          width: "13rem",
          height: "13rem",
          transform: `translate3d(-50%, 0, 0) scale(0.6)`,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 0.7,
        }
      case "exploded":
        return {
          ...baseStyle,
          top: "8rem",
          left: "50%",
          width: "13rem",
          height: "13rem",
          transform: `translate3d(-50%, 0, 0) scale(1.1)`,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 0.5,
        }
      case "shrinking":
        return {
          ...baseStyle,
          top: "8rem",
          left: "50%",
          width: "13rem",
          height: "13rem",
          transform: `translate3d(-50%, 0, 0) scale(0.3)`,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 0,
        }
      case "navbar":
        return {
          ...baseStyle,
          top: "0.75rem",
          left: "1rem",
          width: "2.5rem",
          height: "2.5rem",
          transform: `translate3d(0, 0, 0) scale(1)`,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 0,
        }
      default:
        return baseStyle
    }
  }

  const containerStyle = getTransformStyle()
  const isActive = phase === "flying" || phase === "exploded"

  return (
    <div
      ref={logoRef}
      className="cursor-pointer"
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glassmorphism container */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          background: "rgba(0, 0, 0, 0.4)",
          boxShadow: isActive
            ? `0 0 80px rgba(160, 32, 240, 0.4), 0 0 120px rgba(59, 130, 246, 0.2), inset 0 0 40px rgba(160, 32, 240, 0.15)`
            : `0 0 30px rgba(160, 32, 240, 0.2)`,
          border: "2px solid rgba(160, 32, 240, 0.4)",
          transform: `perspective(1000px) rotateX(${isHovering ? mousePos.y : 0}deg) rotateY(${isHovering ? mousePos.x : 0}deg)`,
          transition: isHovering
            ? "transform 0.15s ease-out, box-shadow 0.8s ease-out, border 0.8s ease-out"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease-out, border 0.8s ease-out",
          willChange: "transform",
        }}
      >
        {/* Particle burst effect */}
        {phase === "exploded" && (
          <div className="absolute inset-0">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (Math.PI * 2 * i) / 24
              const distance = 60 + Math.random() * 40
              const x = Math.cos(angle) * distance
              const y = Math.sin(angle) * distance
              const size = 3 + Math.random() * 4
              const colors = ["#A020F0", "#3B82F6", "#7C3AED", "#60A5FA"]
              const color = colors[i % colors.length]
              
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    left: "50%",
                    top: "50%",
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
                    boxShadow: `0 0 ${size * 2}px ${color}`,
                    opacity: 0.8,
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Logo */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${phase === "exploded" ? 0.85 : 0.7})`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/images/xelvetec-logo.png"
            alt="XelveTec"
            width={208}
            height={208}
            className="drop-shadow-2xl"
            style={{
              filter: `
                drop-shadow(0 0 25px rgba(160, 32, 240, 0.7))
                drop-shadow(0 0 50px rgba(59, 130, 246, 0.5))
              `,
            }}
          />
        </div>

        {/* Inner glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isActive
              ? `radial-gradient(circle at center, transparent 20%, rgba(160, 32, 240, 0.15) 50%, transparent 80%)`
              : "none",
            transform: `scale(${phase === "exploded" ? 1.2 : 1})`,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  )
}
