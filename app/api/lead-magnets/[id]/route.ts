import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Schema for lead magnet update
const updateLeadMagnetSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }).optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).optional(),
  fileType: z.enum(["document", "image", "video", "audio", "other"]).optional(),
  isPaid: z.boolean().optional(),
  price: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  files: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number(),
        type: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get lead magnet from database
    const leadMagnet = await db.leadMagnet.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        files: true,
        analytics: true,
      },
    })

    if (!leadMagnet) {
      return NextResponse.json({ error: "Lead magnet not found" }, { status: 404 })
    }

    return NextResponse.json({ leadMagnet })
  } catch (error) {
    console.error("Error fetching lead magnet:", error)
    return NextResponse.json({ error: "Failed to fetch lead magnet" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Validate request body
    const validatedData = updateLeadMagnetSchema.parse(body)

    // Update lead magnet in database
    const updatedLeadMagnet = await db.leadMagnet.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        fileType: validatedData.fileType,
        isPaid: validatedData.isPaid,
        price: validatedData.isPaid ? validatedData.price : null,
        thumbnailUrl: validatedData.thumbnailUrl,
        status: validatedData.status,
        updatedAt: new Date(),
      },
    })

    // Update files if provided
    if (validatedData.files) {
      // Delete existing files
      await db.leadMagnetFile.deleteMany({
        where: {
          leadMagnetId: id,
        },
      })

      // Create new files
      await db.leadMagnetFile.createMany({
        data: validatedData.files.map((file) => ({
          leadMagnetId: id,
          name: file.name,
          size: file.size,
          type: file.type,
          url: file.url,
        })),
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
    console.error("Error updating lead magnet:", error)

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
        error: "Failed to update lead magnet",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Delete lead magnet files
    await db.leadMagnetFile.deleteMany({
      where: {
        leadMagnetId: id,
      },
    })

    // Delete lead magnet analytics
    await db.leadMagnetAnalytics.deleteMany({
      where: {
        leadMagnetId: id,
      },
    })

    // Delete lead magnet
    await db.leadMagnet.delete({
      where: {
        id,
      },
    })

    // Revalidate related paths
    revalidatePath("/lead-magnets")

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Error deleting lead magnet:", error)
    return NextResponse.json(
      {
        error: "Failed to delete lead magnet",
      },
      { status: 500 },
    )
  }
}
