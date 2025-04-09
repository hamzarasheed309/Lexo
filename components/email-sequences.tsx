import { Edit, MoreHorizontal, Trash } from "lucide-react"

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

export function EmailSequences() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
          <div>Name</div>
          <div>Emails</div>
          <div>Open Rate</div>
          <div>Click Rate</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {sequences.map((sequence) => (
            <div key={sequence.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
              <div className="font-medium">{sequence.name}</div>
              <div>{sequence.emails}</div>
              <div>
                <div className="flex items-center gap-2">
                  <Progress value={sequence.openRate} className="h-2" />
                  <span>{sequence.openRate}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Progress value={sequence.clickRate} className="h-2" />
                  <span>{sequence.clickRate}%</span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Export</span>
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

const sequences = [
  {
    id: "1",
    name: "Welcome Sequence",
    emails: 5,
    openRate: 42,
    clickRate: 12,
  },
  {
    id: "2",
    name: "Product Onboarding",
    emails: 7,
    openRate: 38,
    clickRate: 9,
  },
  {
    id: "3",
    name: "Re-engagement Campaign",
    emails: 3,
    openRate: 28,
    clickRate: 6,
  },
  {
    id: "4",
    name: "Lead Nurturing",
    emails: 6,
    openRate: 35,
    clickRate: 8,
  },
  {
    id: "5",
    name: "Promotional Campaign",
    emails: 4,
    openRate: 32,
    clickRate: 11,
  },
]
