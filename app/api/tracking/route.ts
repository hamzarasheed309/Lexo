import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { event, leadMagnetId, metadata = {} } = body

    if (!event || !leadMagnetId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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

    // Record the event
    const trackingEvent = await db.trackingEvent.create({
      data: {
        event,
        leadMagnetId,
        visitorId,
        metadata: JSON.stringify(metadata),
        timestamp: new Date(),
      },
    })

    // Update analytics based on event type
    if (event === "view") {
      await updateViewAnalytics(leadMagnetId)
    } else if (event === "conversion") {
      await updateConversionAnalytics(leadMagnetId, visitorId)
    }

    return NextResponse.json({
      success: true,
      trackingEvent,
    })
  } catch (error) {
    console.error("Error tracking event:", error)
    return NextResponse.json(
      {
        error: "Failed to track event",
      },
      { status: 500 },
    )
  }
}

async function updateViewAnalytics(leadMagnetId: string) {
  // Get current analytics
  const analytics = await db.leadMagnetAnalytics.findUnique({
    where: {
      leadMagnetId,
    },
  })

  if (analytics) {
    // Update views count
    await db.leadMagnetAnalytics.update({
      where: {
        leadMagnetId,
      },
      data: {
        views: analytics.views + 1,
        conversionRate: analytics.conversions / (analytics.views + 1),
      },
    })
  } else {
    // Create new analytics record
    await db.leadMagnetAnalytics.create({
      data: {
        leadMagnetId,
        views: 1,
        conversions: 0,
        conversionRate: 0,
        avgTimeToConvert: 0,
      },
    })
  }
}

async function updateConversionAnalytics(leadMagnetId: string, visitorId: string) {
  // Get current analytics
  const analytics = await db.leadMagnetAnalytics.findUnique({
    where: {
      leadMagnetId,
    },
  })

  // Find the first view event for this visitor and lead magnet
  const viewEvent = await db.trackingEvent.findFirst({
    where: {
      leadMagnetId,
      visitorId,
      event: "view",
    },
    orderBy: {
      timestamp: "asc",
    },
  })

  // Calculate time to convert if view event exists
  let timeToConvert = 0
  if (viewEvent) {
    const now = new Date()
    timeToConvert = (now.getTime() - new Date(viewEvent.timestamp).getTime()) / 1000 / 60 // in minutes
  }

  if (analytics) {
    // Update conversion metrics
    const newConversions = analytics.conversions + 1
    const newAvgTimeToConvert = viewEvent
      ? (analytics.avgTimeToConvert * analytics.conversions + timeToConvert) / newConversions
      : analytics.avgTimeToConvert

    await db.leadMagnetAnalytics.update({
      where: {
        leadMagnetId,
      },
      data: {
        conversions: newConversions,
        conversionRate: analytics.views > 0 ? newConversions / analytics.views : 0,
        avgTimeToConvert: newAvgTimeToConvert,
      },
    })
  } else {
    // Create new analytics record
    await db.leadMagnetAnalytics.create({
      data: {
        leadMagnetId,
        views: 0,
        conversions: 1,
        conversionRate: 0,
        avgTimeToConvert: timeToConvert,
      },
    })
  }

  // Create lead record
  await db.lead.create({
    data: {
      leadMagnetId,
      visitorId,
      convertedAt: new Date(),
      timeToConvert: timeToConvert,
    },
  })
}
