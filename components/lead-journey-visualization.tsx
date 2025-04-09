"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface LeadJourney {
  id: string
  leadMagnetName: string
  convertedAt: string
  timeToConvert: number
  journey: {
    event: string
    leadMagnetId: string
    timestamp: string
    metadata: {
      page?: string
      referrer?: string
      formData?: any
    }
  }[]
}

interface ConversionPath {
  path: string
  count: number
}

interface LeadJourneyVisualizationProps {
  leadJourneys: LeadJourney[]
  conversionPaths: ConversionPath[]
}

export function LeadJourneyVisualization({ leadJourneys, conversionPaths }: LeadJourneyVisualizationProps) {
  const [selectedJourney, setSelectedJourney] = useState<LeadJourney | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current && conversionPaths.length > 0) {
      renderSankeyDiagram()
    }
  }, [conversionPaths])

  const renderSankeyDiagram = () => {
    // This is a simplified placeholder for a real Sankey diagram
    // In a real implementation, you would use D3.js or a similar library
    const svg = svgRef.current
    if (!svg) return

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild)
    }

    // Set up dimensions
    const width = svg.clientWidth
    const height = svg.clientHeight
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create a group for the diagram
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g.setAttribute("transform", `translate(${margin.left},${margin.top})`)
    svg.appendChild(g)

    // Add a title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text")
    title.textContent = "Lead Conversion Paths"
    title.setAttribute("x", (innerWidth / 2).toString())
    title.setAttribute("y", "0")
    title.setAttribute("text-anchor", "middle")
    title.setAttribute("font-weight", "bold")
    g.appendChild(title)

    // Add a placeholder for the diagram
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", "0")
    rect.setAttribute("y", "20")
    rect.setAttribute("width", innerWidth.toString())
    rect.setAttribute("height", (innerHeight - 20).toString())
    rect.setAttribute("fill", "#f3f4f6")
    rect.setAttribute("rx", "8")
    g.appendChild(rect)

    // Add a placeholder text
    const placeholderText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    placeholderText.textContent = "Sankey diagram would be rendered here using D3.js"
    placeholderText.setAttribute("x", (innerWidth / 2).toString())
    placeholderText.setAttribute("y", (innerHeight / 2).toString())
    placeholderText.setAttribute("text-anchor", "middle")
    placeholderText.setAttribute("fill", "#6b7280")
    g.appendChild(placeholderText)
  }

  return (
    <Tabs defaultValue="journeys">
      <TabsList>
        <TabsTrigger value="journeys">Individual Journeys</TabsTrigger>
        <TabsTrigger value="paths">Common Paths</TabsTrigger>
      </TabsList>

      <TabsContent value="journeys" className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Conversions</CardTitle>
                <CardDescription>Select a lead to view their journey</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto">
                <div className="space-y-2">
                  {leadJourneys.map((journey) => (
                    <div
                      key={journey.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedJourney?.id === journey.id
                          ? "bg-primary/10 border-l-4 border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedJourney(journey)}
                    >
                      <div className="font-medium">{journey.leadMagnetName}</div>
                      <div className="text-sm text-muted-foreground">
                        Converted {formatDistanceToNow(new Date(journey.convertedAt), { addSuffix: true })}
                      </div>
                      <div className="text-sm">Time to convert: {journey.timeToConvert.toFixed(1)} minutes</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lead Journey</CardTitle>
                <CardDescription>
                  {selectedJourney
                    ? `Journey for lead converted on ${new Date(selectedJourney.convertedAt).toLocaleString()}`
                    : "Select a lead to view their journey"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedJourney ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedJourney.leadMagnetName}</div>
                        <div className="text-sm text-muted-foreground">
                          Converted in {selectedJourney.timeToConvert.toFixed(1)} minutes
                        </div>
                      </div>
                      <Badge variant="outline">{selectedJourney.journey.length} touchpoints</Badge>
                    </div>

                    <div className="relative pl-8 border-l-2 border-muted space-y-6">
                      {selectedJourney.journey.map((event, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-[25px] p-1 rounded-full bg-background border-2 border-muted">
                            {event.event === "view" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-blue-500"
                              >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : event.event === "conversion" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-green-500"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                              </svg>
                            )}
                          </div>

                          <div className="bg-muted/40 p-3 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium capitalize">{event.event}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </div>
                            </div>

                            <div className="mt-2 text-sm">
                              {event.metadata.page && (
                                <div>
                                  <span className="font-medium">Page:</span> {event.metadata.page}
                                </div>
                              )}
                              {event.metadata.referrer && (
                                <div>
                                  <span className="font-medium">Referrer:</span> {event.metadata.referrer}
                                </div>
                              )}
                              {event.metadata.formData && (
                                <div>
                                  <span className="font-medium">Form Data:</span>{" "}
                                  {Object.entries(event.metadata.formData)
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(", ")}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    Select a lead to view their journey
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="paths" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Common Conversion Paths</CardTitle>
            <CardDescription>Visualizing the most common paths to conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <svg ref={svgRef} width="100%" height="100%" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Conversion Paths</CardTitle>
            <CardDescription>The most common journeys that lead to conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionPaths.map((path, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{path.path}</div>
                    <div className="text-sm text-muted-foreground">
                      {path.count} {path.count === 1 ? "conversion" : "conversions"}
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(path.count / conversionPaths[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
