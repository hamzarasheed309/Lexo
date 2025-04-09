import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const leadMagnetId = searchParams.get("leadMagnetId")
    const period = searchParams.get("period") || "30days" // 7days, 30days, 90days, all

    // Calculate date range based on period
    const now = new Date()
    let startDate: Date | null = null

    if (period === "7days") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (period === "30days") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    } else if (period === "90days") {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    }

    // Build filter
    const filter: any = {
      userId: session.user.id,
    }

    if (leadMagnetId) {
      filter.id = leadMagnetId
    }

    // Get lead magnets with analytics
    const leadMagnets = await db.leadMagnet.findMany({
      where: filter,
      include: {
        analytics: true,
      },
    })

    // Get tracking events for time series data
    const eventsFilter: any = {
      leadMagnetId: leadMagnetId
        ? leadMagnetId
        : {
            in: leadMagnets.map((lm) => lm.id),
          },
    }

    if (startDate) {
      eventsFilter.timestamp = {
        gte: startDate,
      }
    }

    const events = await db.trackingEvent.findMany({
      where: eventsFilter,
      orderBy: {
        timestamp: "asc",
      },
    })

    // Get lead journey data
    const journeyData = await getLeadJourneyData(leadMagnetId, startDate)

    // Process events into time series data
    const timeSeriesData = processTimeSeriesData(events, period)

    // Calculate summary metrics
    const summaryMetrics = calculateSummaryMetrics(leadMagnets, events)

    return NextResponse.json({
      leadMagnets,
      timeSeriesData,
      summaryMetrics,
      journeyData,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

async function getLeadJourneyData(leadMagnetId: string | null, startDate: Date | null) {
  // Build filter for lead journey analysis
  const journeyFilter: any = {}

  if (leadMagnetId) {
    journeyFilter.leadMagnetId = leadMagnetId
  }

  if (startDate) {
    journeyFilter.convertedAt = {
      gte: startDate,
    }
  }

  // Get leads with their journey events
  const leads = await db.lead.findMany({
    where: journeyFilter,
    include: {
      leadMagnet: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      convertedAt: "desc",
    },
    take: 100, // Limit to recent 100 leads
  })

  // Get all events for these leads to reconstruct journeys
  const leadVisitorIds = leads.map((lead) => lead.visitorId)

  const journeyEvents = await db.trackingEvent.findMany({
    where: {
      visitorId: {
        in: leadVisitorIds,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  })

  // Group events by visitor ID to reconstruct journeys
  const journeysByVisitor: Record<string, any[]> = {}

  journeyEvents.forEach((event) => {
    if (!journeysByVisitor[event.visitorId]) {
      journeysByVisitor[event.visitorId] = []
    }

    journeysByVisitor[event.visitorId].push({
      event: event.event,
      leadMagnetId: event.leadMagnetId,
      timestamp: event.timestamp,
      metadata: JSON.parse(event.metadata || "{}"),
    })
  })

  // Map leads to their journeys
  const leadJourneys = leads.map((lead) => ({
    id: lead.id,
    leadMagnetName: lead.leadMagnet.name,
    convertedAt: lead.convertedAt,
    timeToConvert: lead.timeToConvert,
    journey: journeysByVisitor[lead.visitorId] || [],
  }))

  // Calculate common paths to conversion
  const conversionPaths = calculateConversionPaths(journeysByVisitor)

  return {
    leads: leadJourneys,
    conversionPaths,
  }
}

function processTimeSeriesData(events: any[], period: string) {
  // Group events by date and type
  const eventsByDate: Record<string, { views: number; conversions: number }> = {}

  events.forEach((event) => {
    const date = formatDate(event.timestamp, period)

    if (!eventsByDate[date]) {
      eventsByDate[date] = { views: 0, conversions: 0 }
    }

    if (event.event === "view") {
      eventsByDate[date].views++
    } else if (event.event === "conversion") {
      eventsByDate[date].conversions++
    }
  })

  // Convert to array format for charts
  const timeSeriesData = Object.entries(eventsByDate).map(([date, counts]) => ({
    date,
    views: counts.views,
    conversions: counts.conversions,
    conversionRate: counts.views > 0 ? (counts.conversions / counts.views) * 100 : 0,
  }))

  return timeSeriesData.sort((a, b) => a.date.localeCompare(b.date))
}

function calculateSummaryMetrics(leadMagnets: any[], events: any[]) {
  // Calculate total views and conversions
  const totalViews = events.filter((e) => e.event === "view").length
  const totalConversions = events.filter((e) => e.event === "conversion").length
  const conversionRate = totalViews > 0 ? (totalConversions / totalViews) * 100 : 0

  // Calculate performance by lead magnet type
  const performanceByType: Record<string, { views: number; conversions: number }> = {}

  leadMagnets.forEach((lm) => {
    if (!performanceByType[lm.fileType]) {
      performanceByType[lm.fileType] = { views: 0, conversions: 0 }
    }

    if (lm.analytics) {
      performanceByType[lm.fileType].views += lm.analytics.views
      performanceByType[lm.fileType].conversions += lm.analytics.conversions
    }
  })

  // Convert to array format
  const typePerformance = Object.entries(performanceByType).map(([type, counts]) => ({
    type,
    views: counts.views,
    conversions: counts.conversions,
    conversionRate: counts.views > 0 ? (counts.conversions / counts.views) * 100 : 0,
  }))

  return {
    totalViews,
    totalConversions,
    conversionRate,
    typePerformance,
  }
}

function calculateConversionPaths(journeysByVisitor: Record<string, any[]>) {
  // Extract paths from journeys
  const paths: string[] = []

  Object.values(journeysByVisitor).forEach((events) => {
    if (events.some((e) => e.event === "conversion")) {
      // Create path string representation
      const path = events.map((e) => `${e.event}:${e.metadata.page || "unknown"}`).join(" → ")

      paths.push(path)
    }
  })

  // Count occurrences of each path
  const pathCounts: Record<string, number> = {}

  paths.forEach((path) => {
    pathCounts[path] = (pathCounts[path] || 0) + 1
  })

  // Convert to array and sort by frequency
  const conversionPaths = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 paths

  return conversionPaths
}

function formatDate(date: Date, period: string) {
  const d = new Date(date)

  if (period === "7days" || period === "30days") {
    // Daily format: YYYY-MM-DD
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  } else if (period === "90days") {
    // Weekly format: YYYY-WW
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1)
    const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
    return `${d.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`
  } else {
    // Monthly format: YYYY-MM
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
  }
}
