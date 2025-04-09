import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Schema for lead submission
const leadSchema = z.object({
  leadMagnetId: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request body
    const validatedData = leadSchema.parse(body)

    // Get or create visitor ID from cookies
    const cookieStore = cookies()
    let visitorId = cookieStore.get("visitor_id")?.value

    if (!visitorId) {
      visitorId = uuidv4()
      cookieStore.set("visitor_id", visitorId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
        sameSite: "lax",
      })
    }

    // Create lead record
    const lead = await db.lead.create({
      data: {
        leadMagnetId: validatedData.leadMagnetId,
        visitorId,
        convertedAt: new Date(),
        timeToConvert: 0, // This will be updated by the tracking event
        metadata: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          company: validatedData.company,
        }),
      },
    })

    // Get lead magnet details
    const leadMagnet = await db.leadMagnet.findUnique({
      where: {
        id: validatedData.leadMagnetId,
      },
    })

    // In a real application, you would:
    // 1. Send an email with the lead magnet
    // 2. Add the lead to your CRM
    // 3. Trigger any automation workflows

    return NextResponse.json({
      success: true,
      lead,
      downloadUrl: leadMagnet?.files?.[0]?.url || null,
    })
  } catch (error) {
    console.error("Error creating lead:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to create lead",
      },
      { status: 500 },
    )
  }
}
