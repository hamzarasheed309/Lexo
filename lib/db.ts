// This is a production-ready database client using Vercel KV
// In a real application, you would use Prisma, Drizzle, or another ORM
import { kv } from "@vercel/kv"

// Helper function to generate IDs
const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

export const db = {
  leadMagnet: {
    create: async (data: any) => {
      const id = generateId("lm")
      const leadMagnet = { id, ...data.data }
      await kv.set(`leadMagnet:${id}`, JSON.stringify(leadMagnet))

      // Add to user's lead magnets list
      await kv.sadd(`user:${data.data.userId}:leadMagnets`, id)

      return leadMagnet
    },
    findUnique: async (query: any) => {
      const id = query.where.id
      const leadMagnetStr = await kv.get(`leadMagnet:${id}`)

      if (!leadMagnetStr) return null

      const leadMagnet = JSON.parse(leadMagnetStr as string)

      // Check user ID if provided
      if (query.where.userId && leadMagnet.userId !== query.where.userId) {
        return null
      }

      // Get files
      const filesStr = await kv.get(`leadMagnet:${id}:files`)
      const files = filesStr ? JSON.parse(filesStr as string) : []

      // Get analytics
      const analyticsStr = await kv.get(`leadMagnet:${id}:analytics`)
      const analytics = analyticsStr ? JSON.parse(analyticsStr as string) : null

      return {
        ...leadMagnet,
        files,
        analytics,
      }
    },
    findMany: async (query: any) => {
      const userId = query.where?.userId

      if (!userId) {
        return []
      }

      // Get user's lead magnets
      const leadMagnetIds = await kv.smembers(`user:${userId}:leadMagnets`)

      if (!leadMagnetIds || leadMagnetIds.length === 0) {
        return []
      }

      // Get lead magnets
      const leadMagnets = []

      for (const id of leadMagnetIds) {
        const leadMagnetStr = await kv.get(`leadMagnet:${id}`)

        if (leadMagnetStr) {
          const leadMagnet = JSON.parse(leadMagnetStr as string)

          // Apply filters
          if (query.where?.status && leadMagnet.status !== query.where.status) {
            continue
          }

          if (query.where?.fileType && leadMagnet.fileType !== query.where.fileType) {
            continue
          }

          // Get files
          const filesStr = await kv.get(`leadMagnet:${id}:files`)
          const files = filesStr ? JSON.parse(filesStr as string) : []

          // Get analytics
          const analyticsStr = await kv.get(`leadMagnet:${id}:analytics`)
          const analytics = analyticsStr ? JSON.parse(analyticsStr as string) : null

          leadMagnets.push({
            ...leadMagnet,
            files,
            analytics,
          })
        }
      }

      // Apply sorting
      if (query.orderBy) {
        const [field, order] = Object.entries(query.orderBy)[0]
        leadMagnets.sort((a: any, b: any) => {
          if (order === "asc") {
            return a[field] > b[field] ? 1 : -1
          } else {
            return a[field] < b[field] ? 1 : -1
          }
        })
      }

      return leadMagnets
    },
    update: async (query: any) => {
      const id = query.where.id
      const leadMagnetStr = await kv.get(`leadMagnet:${id}`)

      if (!leadMagnetStr) {
        throw new Error("Lead magnet not found")
      }

      const leadMagnet = JSON.parse(leadMagnetStr as string)
      const updatedLeadMagnet = { ...leadMagnet, ...query.data, id }

      await kv.set(`leadMagnet:${id}`, JSON.stringify(updatedLeadMagnet))

      return updatedLeadMagnet
    },
    delete: async (query: any) => {
      const id = query.where.id
      const leadMagnetStr = await kv.get(`leadMagnet:${id}`)

      if (!leadMagnetStr) {
        throw new Error("Lead magnet not found")
      }

      const leadMagnet = JSON.parse(leadMagnetStr as string)

      // Delete lead magnet
      await kv.del(`leadMagnet:${id}`)

      // Remove from user's lead magnets list
      await kv.srem(`user:${leadMagnet.userId}:leadMagnets`, id)

      // Delete files
      await kv.del(`leadMagnet:${id}:files`)

      // Delete analytics
      await kv.del(`leadMagnet:${id}:analytics`)

      return { id }
    },
  },
  leadMagnetFile: {
    createMany: async (data: any) => {
      const leadMagnetId = data.data[0]?.leadMagnetId

      if (!leadMagnetId) {
        throw new Error("Lead magnet ID is required")
      }

      await kv.set(`leadMagnet:${leadMagnetId}:files`, JSON.stringify(data.data))

      return { count: data.data.length }
    },
    deleteMany: async (query: any) => {
      const leadMagnetId = query.where.leadMagnetId

      if (!leadMagnetId) {
        throw new Error("Lead magnet ID is required")
      }

      await kv.del(`leadMagnet:${leadMagnetId}:files`)

      return { count: 1 }
    },
  },
  leadMagnetAnalytics: {
    findUnique: async (query: any) => {
      const leadMagnetId = query.where.leadMagnetId

      if (!leadMagnetId) {
        return null
      }

      const analyticsStr = await kv.get(`leadMagnet:${leadMagnetId}:analytics`)

      if (!analyticsStr) {
        return null
      }

      return JSON.parse(analyticsStr as string)
    },
    create: async (data: any) => {
      const leadMagnetId = data.data.leadMagnetId

      if (!leadMagnetId) {
        throw new Error("Lead magnet ID is required")
      }

      await kv.set(`leadMagnet:${leadMagnetId}:analytics`, JSON.stringify(data.data))

      return data.data
    },
    update: async (query: any) => {
      const leadMagnetId = query.where.leadMagnetId

      if (!leadMagnetId) {
        throw new Error("Lead magnet ID is required")
      }

      const analyticsStr = await kv.get(`leadMagnet:${leadMagnetId}:analytics`)
      const analytics = analyticsStr ? JSON.parse(analyticsStr as string) : {}
      const updatedAnalytics = { ...analytics, ...query.data }

      await kv.set(`leadMagnet:${leadMagnetId}:analytics`, JSON.stringify(updatedAnalytics))

      return updatedAnalytics
    },
    deleteMany: async (query: any) => {
      const leadMagnetId = query.where.leadMagnetId

      if (!leadMagnetId) {
        throw new Error("Lead magnet ID is required")
      }

      await kv.del(`leadMagnet:${leadMagnetId}:analytics`)

      return { count: 1 }
    },
  },
  trackingEvent: {
    create: async (data: any) => {
      const id = generateId("event")
      const event = { id, ...data.data }

      // Store event
      await kv.set(`event:${id}`, JSON.stringify(event))

      // Add to lead magnet events list
      await kv.sadd(`leadMagnet:${data.data.leadMagnetId}:events`, id)

      // Add to visitor events list
      await kv.sadd(`visitor:${data.data.visitorId}:events`, id)

      return event
    },
    findMany: async (query: any) => {
      const leadMagnetId = query.where?.leadMagnetId
      const visitorId = query.where?.visitorId

      let eventIds: string[] = []

      if (leadMagnetId && typeof leadMagnetId === "string") {
        // Get events for a specific lead magnet
        eventIds = (await kv.smembers(`leadMagnet:${leadMagnetId}:events`)) as string[]
      } else if (leadMagnetId && leadMagnetId.in) {
        // Get events for multiple lead magnets
        const allEventIds: string[] = []

        for (const id of leadMagnetId.in) {
          const ids = (await kv.smembers(`leadMagnet:${id}:events`)) as string[]
          allEventIds.push(...ids)
        }

        eventIds = allEventIds
      } else if (visitorId) {
        // Get events for a specific visitor
        eventIds = (await kv.smembers(`visitor:${visitorId}:events`)) as string[]
      }

      if (!eventIds || eventIds.length === 0) {
        return []
      }

      // Get events
      const events = []

      for (const id of eventIds) {
        const eventStr = await kv.get(`event:${id}`)

        if (eventStr) {
          const event = JSON.parse(eventStr as string)

          // Apply filters
          if (query.where?.event && event.event !== query.where.event) {
            continue
          }

          if (query.where?.timestamp?.gte) {
            const timestamp = new Date(event.timestamp)
            const gte = new Date(query.where.timestamp.gte)

            if (timestamp < gte) {
              continue
            }
          }

          events.push(event)
        }
      }

      // Apply sorting
      if (query.orderBy) {
        const field = Object.keys(query.orderBy)[0]
        const order = query.orderBy[field]

        events.sort((a, b) => {
          if (order === "asc") {
            return new Date(a[field]).getTime() - new Date(b[field]).getTime()
          } else {
            return new Date(b[field]).getTime() - new Date(a[field]).getTime()
          }
        })
      }

      return events
    },
    findFirst: async (query: any) => {
      const events = await db.trackingEvent.findMany({
        ...query,
        orderBy: { timestamp: "asc" },
      })

      return events[0] || null
    },
  },
  lead: {
    create: async (data: any) => {
      const id = generateId("lead")
      const lead = { id, ...data.data }

      // Store lead
      await kv.set(`lead:${id}`, JSON.stringify(lead))

      // Add to lead magnet leads list
      await kv.sadd(`leadMagnet:${data.data.leadMagnetId}:leads`, id)

      // Add to visitor leads list
      await kv.sadd(`visitor:${data.data.visitorId}:leads`, id)

      return lead
    },
    findMany: async (query: any) => {
      const leadMagnetId = query.where?.leadMagnetId

      let leadIds: string[] = []

      if (leadMagnetId) {
        // Get leads for a specific lead magnet
        leadIds = (await kv.smembers(`leadMagnet:${leadMagnetId}:leads`)) as string[]
      }

      if (!leadIds || leadIds.length === 0) {
        return []
      }

      // Get leads
      const leads = []

      for (const id of leadIds) {
        const leadStr = await kv.get(`lead:${id}`)

        if (leadStr) {
          const lead = JSON.parse(leadStr as string)

          // Apply filters
          if (query.where?.convertedAt?.gte) {
            const convertedAt = new Date(lead.convertedAt)
            const gte = new Date(query.where.convertedAt.gte)

            if (convertedAt < gte) {
              continue
            }
          }

          // Get lead magnet
          const leadMagnetStr = await kv.get(`leadMagnet:${lead.leadMagnetId}`)
          const leadMagnet = leadMagnetStr ? JSON.parse(leadMagnetStr as string) : { name: "Unknown" }

          leads.push({
            ...lead,
            leadMagnet: {
              name: leadMagnet.name,
            },
          })
        }
      }

      // Apply sorting
      if (query.orderBy) {
        const field = Object.keys(query.orderBy)[0]
        const order = query.orderBy[field]

        leads.sort((a, b) => {
          if (order === "asc") {
            return new Date(a[field]).getTime() - new Date(b[field]).getTime()
          } else {
            return new Date(b[field]).getTime() - new Date(a[field]).getTime()
          }
        })
      }

      // Apply limit
      if (query.take) {
        return leads.slice(0, query.take)
      }

      return leads
    },
  },
}
