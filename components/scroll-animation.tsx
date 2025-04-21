"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Hide animation when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(window.scrollY)
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Don't render on touch devices or server-side
  if (typeof window === "undefined" || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Pokeball-inspired scroll indicator */}
        <div className="w-12 h-12 relative">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white"
            animate={{
              boxShadow: [
                "0 0 0 rgba(97, 218, 251, 0)",
                "0 0 20px rgba(97, 218, 251, 0.8)",
                "0 0 0 rgba(97, 218, 251, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[4px] bg-white" />
          </div>
          <motion.div
            className="absolute w-4 h-4 bg-primary rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* Scroll progress indicator */}
        <div className="h-32 w-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-primary rounded-full"
            style={{
              height: `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
