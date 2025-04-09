"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElementsProps {
  parentRef: React.RefObject<HTMLElement>
}

export function FloatingElements({ parentRef }: FloatingElementsProps) {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    if (!parentRef.current) return

    const parentWidth = parentRef.current.offsetWidth
    const parentHeight = parentRef.current.offsetHeight

    // Create random elements
    const newElements = []
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * parentWidth,
        y: Math.random() * parentHeight,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      })
    }
    setElements(newElements)
  }, [parentRef])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-white opacity-30"
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
          }}
          animate={{
            y: [element.y, element.y - 100, element.y],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  )
}
