import { ArrowUpRight, Download, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export function LeadMagnetList() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
          <div>Name</div>
          <div>Type</div>
          <div>Conversion Rate</div>
          <div>Leads</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {leadMagnets.map((leadMagnet) => (
            <div key={leadMagnet.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
              <div className="font-medium">{leadMagnet.name}</div>
              <div>{leadMagnet.type}</div>
              <div>
                <div className="flex items-center gap-2">
                  <Progress value={leadMagnet.conversionRate * 100} className="h-2" />
                  <span>{(leadMagnet.conversionRate * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div>{leadMagnet.leads}</div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const leadMagnets = [
  {
    id: "1",
    name: "Ultimate Guide to SEO",
    type: "eBook",
    conversionRate: 0.045,
    leads: 1245,
  },
  {
    id: "2",
    name: "Marketing ROI Calculator",
    type: "Tool",
    conversionRate: 0.062,
    leads: 876,
  },
  {
    id: "3",
    name: "Social Media Strategy Template",
    type: "Template",
    conversionRate: 0.038,
    leads: 654,
  },
  {
    id: "4",
    name: "Email Marketing Masterclass",
    type: "Webinar",
    conversionRate: 0.051,
    leads: 432,
  },
]
