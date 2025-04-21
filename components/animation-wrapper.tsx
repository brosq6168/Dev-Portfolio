"use client"

import { Suspense } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollAnimation } from "@/components/scroll-animation"

export function AnimationWrapper() {
  return (
    <Suspense fallback={null}>
      <CustomCursor />
      <ScrollAnimation />
    </Suspense>
  )
}
