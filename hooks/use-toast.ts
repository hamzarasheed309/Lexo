"use client"

// This is a simplified version of the toast hook
// In a real implementation, you would use a proper toast library like react-hot-toast or sonner

import { useState } from "react"

type ToastType = "default" | "destructive" | "success"

type ToastProps = {
  title: string
  description?: string
  variant?: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, props])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0))
    }, 3000)

    return id
  }

  return { toast, toasts }
}
