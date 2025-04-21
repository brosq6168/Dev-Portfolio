"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Hide default cursor
    document.body.classList.add("custom-cursor")

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true))
        el.addEventListener("mouseout", () => setLinkHovered(false))
      })
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      addEventListeners()
      handleLinkHoverEvents()
    }

    return () => {
      if (typeof window !== "undefined") {
        removeEventListeners()
        document.body.classList.remove("custom-cursor")
      }
    }
  }, [])

  // Don't render cursor on touch devices or server-side
  if (typeof window === "undefined" || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference",
          hidden && "opacity-0",
        )}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="white"
            strokeWidth="2"
            fill={linkHovered ? "#61dafb" : "transparent"}
            className="transition-colors duration-150"
          />
          <motion.path
            d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28"
            stroke="#61dafb"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className={cn(
          "fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference",
          hidden && "opacity-0",
        )}
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          opacity: clicked ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.1,
        }}
      />
    </>
  )
}
