"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorSparkle() {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Generate sparkles
  const sparkles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const distance = 30 + Math.random() * 20
    const delay = i * 0.05
    const duration = 0.5 + Math.random() * 0.5
    const size = 4 + Math.random() * 6
    const hue = (i * 45) % 360 // Different color for each sparkle

    return { angle, distance, delay, duration, size, hue }
  })

  useEffect(() => {
    setMounted(true)

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: sparkle.size,
            height: sparkle.size,
            background: `hsl(${sparkle.hue}, 100%, 70%)`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size / 2}px hsl(${sparkle.hue}, 100%, 70%)`,
          }}
          animate={{
            x: [0, Math.cos(sparkle.angle) * sparkle.distance],
            y: [0, Math.sin(sparkle.angle) * sparkle.distance],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: sparkle.delay,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </div>
  )
}
