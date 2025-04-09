import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function AnalyticsTable() {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Lead Magnet
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Visitors
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Conversions
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Conversion Rate
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Avg. Time to Convert
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 p-0">
            Quality Score
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="divide-y">
        {leadMagnets.map((leadMagnet) => (
          <div key={leadMagnet.id} className="grid grid-cols-6 gap-4 p-4 text-sm">
            <div className="font-medium">{leadMagnet.name}</div>
            <div>{leadMagnet.visitors.toLocaleString()}</div>
            <div>{leadMagnet.conversions.toLocaleString()}</div>
            <div>
              <div className="flex items-center gap-2">
                <Progress value={leadMagnet.conversionRate * 100} className="h-2" />
                <span>{(leadMagnet.conversionRate * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div>{leadMagnet.avgTimeToConvert}</div>
            <div>
              <div className="flex items-center gap-2">
                <Progress value={leadMagnet.qualityScore * 10} className="h-2" />
                <span>{leadMagnet.qualityScore}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const leadMagnets = [
  {
    id: "1",
    name: "Ultimate Guide to SEO",
    visitors: 5432,
    conversions: 245,
    conversionRate: 0.045,
    avgTimeToConvert: "1.2 days",
    qualityScore: 8.7,
  },
  {
    id: "2",
    name: "Marketing ROI Calculator",
    visitors: 3210,
    conversions: 199,
    conversionRate: 0.062,
    avgTimeToConvert: "0.8 days",
    qualityScore: 9.2,
  },
  {
    id: "3",
    name: "Social Media Strategy Template",
    visitors: 2876,
    conversions: 109,
    conversionRate: 0.038,
    avgTimeToConvert: "2.1 days",
    qualityScore: 7.8,
  },
  {
    id: "4",
    name: "Email Marketing Masterclass",
    visitors: 1987,
    conversions: 101,
    conversionRate: 0.051,
    avgTimeToConvert: "1.5 days",
    qualityScore: 8.3,
  },
  {
    id: "5",
    name: "Content Creation Toolkit",
    visitors: 1543,
    conversions: 87,
    conversionRate: 0.056,
    avgTimeToConvert: "1.7 days",
    qualityScore: 8.1,
  },
]
