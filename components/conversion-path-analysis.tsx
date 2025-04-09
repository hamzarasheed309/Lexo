"use client"

import { useEffect, useRef } from "react"

export function ConversionPathAnalysis() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // This is a placeholder for a real visualization library
      // In a real implementation, you would use a library like D3.js or a Sankey diagram
      const container = containerRef.current
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-[400px] text-center">
          <div class="text-lg font-medium mb-4">Conversion Path Visualization</div>
          <div class="w-full max-w-3xl h-[300px] bg-muted rounded-lg flex items-center justify-center">
            <div class="text-muted-foreground">
              Conversion path visualization would be rendered here using a library like D3.js
            </div>
          </div>
        </div>
      `
    }
  }, [])

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="w-full"></div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Top Entry Points</h3>
          <div className="rounded-md border">
            <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium">
              <div>Source</div>
              <div>Visitors</div>
              <div>Conversion Rate</div>
            </div>
            <div className="divide-y">
              {entryPoints.map((point, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 text-sm">
                  <div>{point.source}</div>
                  <div>{point.visitors}</div>
                  <div>{point.conversionRate}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Top Conversion Paths</h3>
          <div className="rounded-md border">
            <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium">
              <div>Path</div>
              <div>Conversions</div>
              <div>Avg. Time</div>
            </div>
            <div className="divide-y">
              {conversionPaths.map((path, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 text-sm">
                  <div>{path.path}</div>
                  <div>{path.conversions}</div>
                  <div>{path.avgTime}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const entryPoints = [
  {
    source: "Google Search",
    visitors: 1245,
    conversionRate: 4.2,
  },
  {
    source: "Direct",
    visitors: 876,
    conversionRate: 3.8,
  },
  {
    source: "Social Media",
    visitors: 654,
    conversionRate: 2.9,
  },
  {
    source: "Email Campaign",
    visitors: 432,
    conversionRate: 5.1,
  },
  {
    source: "Referral",
    visitors: 321,
    conversionRate: 4.7,
  },
]

const conversionPaths = [
  {
    path: "Blog → eBook → Email",
    conversions: 187,
    avgTime: "2.3 days",
  },
  {
    path: "Landing Page → Webinar",
    conversions: 143,
    avgTime: "1.5 days",
  },
  {
    path: "Social → Quiz → Email",
    conversions: 112,
    avgTime: "3.1 days",
  },
  {
    path: "PPC → Landing Page",
    conversions: 98,
    avgTime: "0.8 days",
  },
  {
    path: "Email → Checklist",
    conversions: 76,
    avgTime: "1.2 days",
  },
]
