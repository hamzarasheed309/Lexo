"use client"

import { useEffect, useRef } from "react"

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resizeObserver = new ResizeObserver((entries) => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      draw()
    })

    resizeObserver.observe(document.body)

    // Define gradient colors
    const colors = [
      { r: 139, g: 92, b: 246 }, // violet-500
      { r: 168, g: 85, b: 247 }, // purple-500
      { r: 217, g: 70, b: 239 }, // fuchsia-500
      { r: 236, g: 72, b: 153 }, // pink-500
      { r: 99, g: 102, b: 241 }, // indigo-500
    ]

    // Create gradient points
    const points = []
    for (let i = 0; i < 5; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: colors[i % colors.length],
      })
    }

    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Move points
      points.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1
      })

      // Create gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5,
      )

      // Add color stops
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")

      points.forEach((point, i) => {
        const { r, g, b } = point.color
        const stop = (i + 1) / (points.length + 1)
        gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, 0.15)`)
      })

      gradient.addColorStop(1, "rgba(255, 255, 255, 0.8)")

      // Fill canvas with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    // Animation loop
    let animationId: number
    function animate() {
      draw()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{ opacity: 0.8 }} />
}
