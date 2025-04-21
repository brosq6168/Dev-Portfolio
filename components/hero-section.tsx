"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { initHeroCanvas } from "@/lib/webgl-hero"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initHeroCanvas(canvasRef.current)
      return cleanup
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      <Navbar />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" aria-hidden="true" />

      <div id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-4xl text-center">
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span>Frontend</span> <span className="text-primary">Developer</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building cutting-edge web experiences with the latest technologies. Specializing in React, Next.js, and
            interactive visualizations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="btn-luminous group" aria-label="View my projects">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="btn-luminous-secondary" aria-label="Download my resume">
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full neon-border"
              aria-label="Visit my GitHub profile"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full neon-border"
              aria-label="Visit my LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full neon-border"
              aria-label="Visit my Twitter profile"
            >
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  )
}
