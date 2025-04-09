import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get lead magnet from database
    const existingLeadMagnet = await db.leadMagnet.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingLeadMagnet) {
      return NextResponse.json({ error: "Lead magnet not found" }, { status: 404 })
    }

    // Parse request body
    const body = await request.json()
    const { scheduledDate } = body

    // Update lead magnet status
    const updatedLeadMagnet = await db.leadMagnet.update({
      where: {
        id,
      },
      data: {
        status: "published",
        publishedAt: scheduledDate ? new Date(scheduledDate) : new Date(),
        updatedAt: new Date(),
      },
    })

    // Create initial analytics record if it doesn't exist
    const existingAnalytics = await db.leadMagnetAnalytics.findUnique({
      where: {
        leadMagnetId: id,
      },
    })

    if (!existingAnalytics) {
      await db.leadMagnetAnalytics.create({
        data: {
          leadMagnetId: id,
          views: 0,
          conversions: 0,
          conversionRate: 0,
          avgTimeToConvert: 0,
        },
      })
    }

    // Revalidate related paths
    revalidatePath("/lead-magnets")
    revalidatePath(`/lead-magnets/${id}`)

    return NextResponse.json({
      success: true,
      leadMagnet: updatedLeadMagnet,
    })
  } catch (error) {
    console.error("Error publishing lead magnet:", error)
    return NextResponse.json(
      {
        error: "Failed to publish lead magnet",
      },
      { status: 500 },
    )
  }
}
