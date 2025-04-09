"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

// Schema for lead magnet creation
const createLeadMagnetSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  fileType: z.enum(["document", "image", "video", "audio", "other"]),
  isPaid: z.boolean().default(false),
  price: z.string().optional(),
})

export async function createLeadMagnet(formData: FormData) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const fileType = formData.get("fileType") as string
    const isPaid = formData.get("isPaid") === "true"
    const price = formData.get("price") as string

    // Validate form data
    const validatedData = createLeadMagnetSchema.parse({
      name,
      description,
      fileType,
      isPaid,
      price: isPaid ? price : undefined,
    })

    // Handle file uploads
    const files = []
    const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("file-"))

    for (const [_, fileBlob] of fileEntries) {
      if (fileBlob instanceof File) {
        const filename = `${uuidv4()}-${fileBlob.name}`
        const blob = await put(filename, fileBlob, {
          access: "public",
        })

        files.push({
          id: uuidv4(),
          name: fileBlob.name,
          size: fileBlob.size,
          type: fileBlob.type,
          url: blob.url,
        })
      }
    }

    // Handle thumbnail upload
    let thumbnailUrl = null
    const thumbnailFile = formData.get("thumbnailFile") as File

    if (thumbnailFile && thumbnailFile.size > 0) {
      const filename = `thumbnail-${uuidv4()}-${thumbnailFile.name}`
      const blob = await put(filename, thumbnailFile, {
        access: "public",
      })
      thumbnailUrl = blob.url
    }

    // Create lead magnet in database
    const leadMagnet = await db.leadMagnet.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        fileType: validatedData.fileType as any,
        isPaid: validatedData.isPaid,
        price: validatedData.isPaid ? validatedData.price : null,
        thumbnailUrl,
        userId: session.user.id,
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Create file records
    if (files.length > 0) {
      await db.leadMagnetFile.createMany({
        data: files.map((file) => ({
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

    return {
      success: true,
      leadMagnet,
    }
  } catch (error) {
    console.error("Error creating lead magnet:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      }
    }

    return {
      success: false,
      error: "Failed to create lead magnet",
    }
  }
}

export async function updateLeadMagnet(id: string, formData: FormData) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Get lead magnet from database
    const existingLeadMagnet = await db.leadMagnet.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingLeadMagnet) {
      return { success: false, error: "Lead magnet not found" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const fileType = formData.get("fileType") as string
    const isPaid = formData.get("isPaid") === "true"
    const price = formData.get("price") as string

    // Update lead magnet in database
    const updatedLeadMagnet = await db.leadMagnet.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        fileType: fileType as any,
        isPaid,
        price: isPaid ? price : null,
        updatedAt: new Date(),
      },
    })

    // Revalidate related paths
    revalidatePath("/lead-magnets")
    revalidatePath(`/lead-magnets/${id}`)

    return {
      success: true,
      leadMagnet: updatedLeadMagnet,
    }
  } catch (error) {
    console.error("Error updating lead magnet:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      }
    }

    return {
      success: false,
      error: "Failed to update lead magnet",
    }
  }
}

export async function publishLeadMagnet(id: string) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Get lead magnet from database
    const existingLeadMagnet = await db.leadMagnet.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingLeadMagnet) {
      return { success: false, error: "Lead magnet not found" }
    }

    // Update lead magnet status
    const updatedLeadMagnet = await db.leadMagnet.update({
      where: {
        id,
      },
      data: {
        status: "published",
        publishedAt: new Date(),
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

    return {
      success: true,
      leadMagnet: updatedLeadMagnet,
    }
  } catch (error) {
    console.error("Error publishing lead magnet:", error)
    return {
      success: false,
      error: "Failed to publish lead magnet",
    }
  }
}

export async function deleteLeadMagnet(id: string) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Get lead magnet from database
    const existingLeadMagnet = await db.leadMagnet.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingLeadMagnet) {
      return { success: false, error: "Lead magnet not found" }
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

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting lead magnet:", error)
    return {
      success: false,
      error: "Failed to delete lead magnet",
    }
  }
}
