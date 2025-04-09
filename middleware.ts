import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

// List of public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/features",
  "/pricing",
  "/contact",
  "/demo",
  "/api/tracking",
  "/api/leads",
]

// Check if a route is public
const isPublicRoute = (path: string) => {
  return publicRoutes.some((route) => path === route || path.startsWith(`${route}/`))
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for public routes and static files
  if (
    isPublicRoute(path) ||
    path.startsWith("/_next/") ||
    path.startsWith("/api/tracking") ||
    path.startsWith("/api/leads") ||
    path.includes(".") // Static files like images, etc.
  ) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  const session = await auth()

  if (!session) {
    // Redirect to login page with return URL
    const url = new URL("/login", request.url)
    url.searchParams.set("returnUrl", path)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
