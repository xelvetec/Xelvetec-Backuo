"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false, // Better mobile performance
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Listen for anchor clicks to use lenis.scrollTo
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null
      if (anchor) {
        e.preventDefault()
        const id = anchor.getAttribute("href")
        if (id) {
          lenis.scrollTo(id, { offset: -80, duration: 1.2 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
