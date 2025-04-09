"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, FileText, Home, Settings, Users, PlusCircle, CreditCard } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: NavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      <div className="py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
        <nav className="grid gap-1 px-2 py-2">
          <Link href="/dashboard" passHref legacyBehavior>
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <Home className="h-4 w-4" />
              Overview
            </Button>
          </Link>
          <Link href="/lead-magnets" passHref legacyBehavior>
            <Button
              variant={pathname === "/lead-magnets" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <FileText className="h-4 w-4" />
              Lead Magnets
            </Button>
          </Link>
          <Link href="/lead-magnets/create" passHref legacyBehavior>
            <Button
              variant={pathname === "/lead-magnets/create" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <PlusCircle className="h-4 w-4" />
              Create New
            </Button>
          </Link>
          <Link href="/analytics" passHref legacyBehavior>
            <Button
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/leads" passHref legacyBehavior>
            <Button
              variant={pathname === "/leads" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <Users className="h-4 w-4" />
              Leads
            </Button>
          </Link>
          <Link href="/automation" passHref legacyBehavior>
            <Button
              variant={pathname === "/automation" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m2 12 5.45 5.45" />
                <path d="M2 12h10" />
                <path d="m12 2v10l6.4 6.4" />
              </svg>
              Automation
            </Button>
          </Link>
        </nav>
      </div>
      <div className="py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Settings</h2>
        <nav className="grid gap-1 px-2 py-2">
          <Link href="/settings" passHref legacyBehavior>
            <Button
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <Settings className="h-4 w-4" />
              General
            </Button>
          </Link>
          <Link href="/settings/billing" passHref legacyBehavior>
            <Button
              variant={pathname === "/settings/billing" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <CreditCard className="h-4 w-4" />
              Billing
            </Button>
          </Link>
          <Link href="/settings/integrations" passHref legacyBehavior>
            <Button
              variant={pathname === "/settings/integrations" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 22v-5" />
                <path d="M9 8V2" />
                <path d="M15 8V2" />
                <path d="M18 8v4" />
                <path d="M6 8v4" />
                <path d="M12 12v5" />
                <path d="M12 2v5" />
                <path d="M6 12a6 6 0 0 0 12 0" />
              </svg>
              Integrations
            </Button>
          </Link>
          <Link href="/settings/team" passHref legacyBehavior>
            <Button
              variant={pathname === "/settings/team" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 hover:text-violet-600 hover:bg-violet-50"
            >
              <Users className="h-4 w-4" />
              Team
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  )
}
