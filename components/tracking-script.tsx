"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface TrackingScriptProps {
  leadMagnetId?: string
}

export function TrackingScript({ leadMagnetId }: TrackingScriptProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Don't track if no lead magnet ID is provided
    if (!leadMagnetId) return

    // Track page view
    const trackPageView = async () => {
      try {
        await fetch("/api/tracking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "view",
            leadMagnetId,
            metadata: {
              page: pathname,
              referrer: document.referrer,
              query: Object.fromEntries(searchParams.entries()),
            },
          }),
        })
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }

    trackPageView()

    // Set up form submission tracking
    const handleFormSubmit = async (event: Event) => {
      const form = event.target as HTMLFormElement

      // Only track forms with data-track-conversion attribute
      if (!form.hasAttribute("data-track-conversion")) return

      // Get form data
      const formData = new FormData(form)
      const formDataObj: Record<string, string> = {}

      formData.forEach((value, key) => {
        formDataObj[key] = value.toString()
      })

      try {
        await fetch("/api/tracking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "conversion",
            leadMagnetId,
            metadata: {
              page: pathname,
              formData: formDataObj,
            },
          }),
        })
      } catch (error) {
        console.error("Error tracking form submission:", error)
      }
    }

    // Add event listeners to all forms
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", handleFormSubmit)
    })

    // Clean up
    return () => {
      document.querySelectorAll("form").forEach((form) => {
        form.removeEventListener("submit", handleFormSubmit)
      })
    }
  }, [leadMagnetId, pathname, searchParams])

  return null
}
