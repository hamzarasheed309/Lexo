// This is a simplified authentication client
// In a real application, you would use NextAuth.js or Clerk

import { cookies } from "next/headers"
import { kv } from "@vercel/kv"

// Mock user for development
const MOCK_USER = {
  id: "user_123",
  name: "John Doe",
  email: "john.doe@example.com",
}

export async function auth() {
  // Check if we're in development mode
  if (process.env.NODE_ENV === "development") {
    return {
      user: MOCK_USER,
    }
  }

  // Get session token from cookies
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (!sessionToken) {
    return null
  }

  // Get user from session
  const userId = await kv.get(`session:${sessionToken}`)

  if (!userId) {
    return null
  }

  // Get user data
  const userStr = await kv.get(`user:${userId}`)

  if (!userStr) {
    return null
  }

  const user = JSON.parse(userStr as string)

  return {
    user,
  }
}

// This is a simplified login function for demonstration
export async function login(email: string, password: string) {
  // In a real application, you would validate credentials
  // For now, we'll just create a session for the mock user

  const sessionToken = Math.random().toString(36).substring(2, 15)

  // Store session
  await kv.set(`session:${sessionToken}`, MOCK_USER.id, { ex: 60 * 60 * 24 * 7 }) // 1 week

  // Set cookie
  cookies().set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "lax",
  })

  return {
    user: MOCK_USER,
  }
}

export async function logout() {
  // Get session token from cookies
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (sessionToken) {
    // Delete session
    await kv.del(`session:${sessionToken}`)

    // Delete cookie
    cookies().delete("session_token")
  }

  return true
}
