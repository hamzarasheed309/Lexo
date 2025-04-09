import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { CursorSparkle } from "@/components/cursor-sparkle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lexo - Create, Optimize, and Convert",
  description:
    "The all-in-one platform for creating high-converting lead magnets with advanced analytics, audience targeting, and automation tools.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CursorSparkle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'