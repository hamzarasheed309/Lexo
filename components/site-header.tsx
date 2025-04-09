"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()

  // Only show login/signup buttons on public pages
  const isPublicPage =
    !pathname.includes("/dashboard") &&
    !pathname.includes("/lead-magnets") &&
    !pathname.includes("/analytics") &&
    !pathname.includes("/automation") &&
    !pathname.includes("/settings")

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 supports-[backdrop-filter]:bg-white/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Link href={isPublicPage ? "/" : "/dashboard"}>
            <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              Lexo
            </span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          {isPublicPage ? (
            <>
              <Link href="/features" className="text-sm font-medium transition-colors hover:text-violet-600">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-violet-600">
                Pricing
              </Link>
              <Link href="/testimonials" className="text-sm font-medium transition-colors hover:text-violet-600">
                Testimonials
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-violet-600 ${pathname === "/dashboard" ? "text-violet-600" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                href="/lead-magnets"
                className={`text-sm font-medium transition-colors hover:text-violet-600 ${pathname.includes("/lead-magnets") ? "text-violet-600" : ""}`}
              >
                Lead Magnets
              </Link>
              <Link
                href="/analytics"
                className={`text-sm font-medium transition-colors hover:text-violet-600 ${pathname === "/analytics" ? "text-violet-600" : ""}`}
              >
                Analytics
              </Link>
              <Link
                href="/automation"
                className={`text-sm font-medium transition-colors hover:text-violet-600 ${pathname === "/automation" ? "text-violet-600" : ""}`}
              >
                Automation
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isPublicPage ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hover:text-violet-600">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                >
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="hover:text-violet-600">
                Settings
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
