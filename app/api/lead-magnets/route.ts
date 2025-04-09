import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Schema for lead magnet creation
const createLeadMagnetSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  fileType: z.enum(["document", "image", "video", "audio", "other"]),
  isPaid: z.boolean().default(false),
  price: z.string().optional(),
  files: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.number(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  thumbnailUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate request body
    const validatedData = createLeadMagnetSchema.parse(body)

    // Create lead magnet in database
    const leadMagnet = await db.leadMagnet.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        fileType: validatedData.fileType,
        isPaid: validatedData.isPaid,
        price: validatedData.isPaid ? validatedData.price : null,
        thumbnailUrl: validatedData.thumbnailUrl,
        userId: session.user.id,
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Create file records
    if (validatedData.files.length > 0) {
      await db.leadMagnetFile.createMany({
        data: validatedData.files.map((file) => ({
          leadMagnetId: leadMagnet.id,
          name: file.name,
          size: file.size,
          type: file.type,
          url: file.url,
        })),
      })
    }

    // Revalidate related paths
    revalidatePath("/lead-magnets")
    revalidatePath(`/lead-magnets/${leadMagnet.id}`)

    return NextResponse.json(
      {
        success: true,
        leadMagnet,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating lead magnet:", error)

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
        error: "Failed to create lead magnet",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"

    // Build filter
    const filter: any = {
      userId: session.user.id,
    }

    if (status && status !== "all") {
      filter.status = status
    }

    if (type && type !== "all") {
      filter.fileType = type
    }

    // Get lead magnets from database
    const leadMagnets = await db.leadMagnet.findMany({
      where: filter,
      orderBy: {
        [sort]: order,
      },
      include: {
        files: true,
        analytics: {
          select: {
            views: true,
            conversions: true,
            conversionRate: true,
          },
        },
      },
    })

    return NextResponse.json({ leadMagnets })
  } catch (error) {
    console.error("Error fetching lead magnets:", error)
    return NextResponse.json({ error: "Failed to fetch lead magnets" }, { status: 500 })
  }
}
